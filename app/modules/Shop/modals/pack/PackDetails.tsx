import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {layouts} from '../../../../shared/styles';
import {Header, Section} from '../../../../components/ui/layouts';
import {
  AdvancedButton,
  Avatar,
  ContentLoader,
  HeaderTitle,
  Indicator,
  Rating,
  SelectableChapterItem,
  TopBar,
} from '../../../../components/ui';
import {BaseScreenProps} from '../../../../shared/core/Screen';
import {theme} from '../../../../shared/styles/theme';
import {PackDetailsDTO, ShopApi} from '../../services';
import {toDownloadFormat, toMoneyFormat} from '../../../../shared/utils';
import {
  Colors,
  ERROR_GENERIC,
  ModalNames,
  REQUIREMENT,
} from '../../../../constants';
import {ConfirmService, ToastService} from '../../../../shared/services';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {useAuthContext} from '../../../../contexts/auth.context';
import {PaymentApi} from '../../../Shared/api/payment';

export const PackDetails = ({navigation, route}: BaseScreenProps) => {
  const id = route.params.id;
  const {uid} = useAuthContext();
  const [pack, setPack] = useState<PackDetailsDTO>();
  const {addSubject} = useRecoilSubjects();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let isSubscribed = true;
    async function loadData() {
      if (!id) {
        navigation.goBack();
        return;
      }
      const response = await ShopApi.getPackInfo(id);
      if (response.isRight() && isSubscribed) {
        setPack(response.value.getValue());
      }
    }
    loadData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handlePressOverview = useCallback((chapterId: string) => {
    navigation.push(ModalNames.FlashcardsOverview, {
      id: chapterId,
    });
  }, []);

  const handlePressBuy = async () => {
    if (!pack) return;
    const canBuy = pack.isFree ? true : await PaymentApi.canBuy();
    if (canBuy) {
      const confirm = await ConfirmService.show(
        'Voulez-vous acheter ce pack ?',
      );
      if (confirm) {
        setLoading(true);
        const response = await ShopApi.buyPack(id);
        setLoading(false);
        if (response.isRight()) {
          addSubject(response.value.getValue());
          ToastService.showToast(
            'Achat terminé',
            'success',
            'Vous trouverez le contenu de ce pack dans vos matières !',
          );
          navigation.goBack();
        } else {
          Alert.alert(
            'Achat non effectué',
            "Il semble y avoir un problème ce pack. Pour plus d'information, contactez le vendeur ou l'administrateur de la plateforme.",
          );
        }
      }
    } else {
      Alert.alert(
        REQUIREMENT,
        'Vous devez d`abord ajouter un moyen de paiement pour pouvoir acheter un pack !',
      );
    }
  };

  const handlePressOwner = async () => {
    if (pack && pack.ownerId) {
      navigation.push(ModalNames.MemberProfile, {id: pack.ownerId});
    }
  };

  if (!pack) return <ContentLoader />;
  const isOwner = pack.ownerId === uid;

  const {
    title,
    description,
    totalCards,
    rating,
    level,
    category,
    color,
    imageUrl,
    isFree,
    price,
    chapters,
    ownerAvatarUrl,
    ownerExperience,
    nbDownloads,
  } = pack;

  return (
    <View style={layouts.container}>
      {!isOwner && (
        <AdvancedButton
          icon={isFree ? 'download' : 'buy'}
          onPress={handlePressBuy}
          disabled={loading}
          loading={loading}
        />
      )}
      <Header
        backgroundColor={color}
        imageSource={imageUrl ? {uri: imageUrl} : undefined}>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <View style={[layouts.row, {alignItems: 'flex-end'}]}>
          <View style={{flex: 0.9}}>
            <HeaderTitle title={title} />
            <Text style={[theme.h4]}>{`${
              isFree ? 'Gratuit' : `${toMoneyFormat(price)} €`
            }`}</Text>
          </View>
          <View style={styles.owner}>
            <Text
              style={[
                theme.paragraph,
                styles.ownerText,
              ]}>{`${ownerExperience} XP`}</Text>
            <TouchableOpacity onPress={handlePressOwner}>
              <Avatar url={ownerAvatarUrl} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </Header>
      <View style={[layouts.content]}>
        <ScrollView
          contentContainerStyle={[styles.scrollView]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          <View style={[styles.infoBar]}>
            {rating && (
              <Rating
                value={rating || 0}
                big={true}
                color={Colors.darkGray}
                style={[styles.divider, styles.padded]}
              />
            )}
            <View style={[styles.level, styles.divider]}>
              <View style={styles.tag}>
                <Text style={[theme.paragraph, styles.tagText]}>{level}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={[theme.paragraph, styles.tagText]}>
                  {category}
                </Text>
              </View>
            </View>
            <Indicator
              style={[styles.divider, styles.padded]}
              value={totalCards.toString()}
              label={'cartes'}
            />
            <Indicator
              style={[styles.padded]}
              value={toDownloadFormat(nbDownloads)}
              label={'téléchargé'}
            />
          </View>
          <Section title="Descripton">
            <Text style={[theme.paragraph]}>{description}</Text>
          </Section>
          <Section title={`${chapters.length} Chapitres`} style={{flex: 1}}>
            {chapters &&
              chapters.map(c => (
                <SelectableChapterItem
                  key={c.id}
                  item={c}
                  onPressOverview={() => handlePressOverview(c.id)}
                />
              ))}
          </Section>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 80,
  },
  divider: {
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: Colors.gray,
  },
  padded: {
    paddingHorizontal: 10,
  },
  tag: {
    backgroundColor: Colors.purple,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  tagText: {
    textTransform: 'capitalize',
    color: Colors.white,
  },
  level: {
    paddingHorizontal: 10,
  },
  infoBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  ownerText: {
    color: Colors.white,
    marginBottom: 5,
  },
  owner: {
    alignItems: 'center',
  },
});
