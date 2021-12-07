import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header, Section} from '../../../components/ui/layouts';
import {typos} from '../../../shared/styles/typos';
import {ERROR_GENERIC, ModalNames} from '../../../constants';
import {TwoColumnPackList} from '../../../components/ui/elements/lists/TwoColumnPackList';
import {ContentLoader, TopBar} from '../../../components/ui';
import {ProfileHeader} from '../../Shop/screens/components';
import {ToastService} from '../../../shared/services';
import {PackDTO, ShopApi} from '../../Shop/services';
import {BaseScreenProps} from '../../../shared/core/Screen';
import {MemberDTO, SocialApi} from '../api';

export const MemberProfile = ({navigation, route}: BaseScreenProps) => {
  const id = route.params.id;

  const [profile, setProfile] = useState<MemberDTO>();
  const [packs, setPacks] = useState<PackDTO[]>([]);

  useEffect(() => {
    if (!id) navigation.goBack();
    async function loadProfile() {
      let response: any = await SocialApi.getMemberProfile(id);
      if (response.isRight()) {
        setProfile(response.value.getValue());
      } else {
        ToastService.showToast(
          ERROR_GENERIC,
          'error',
          response.value.toString(),
        );
        navigation.goBack();
      }
      response = await ShopApi.getLearnerPacks(id);
      if (response.isRight()) setPacks(response.value.getValue());
    }
    loadProfile();
  }, []);

  const handlePressPack = async (packId: string) => {
    navigation.navigate(ModalNames.PackDetails, {id: packId});
  };

  if (!profile) return <ContentLoader />;

  const {bio} = profile;

  return (
    <View style={[layouts.container]}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <ProfileHeader profile={profile} />
      </Header>
      <View style={layouts.content}>
        <Section title="Bio">
          <Text style={[typos.paragraph]}>{bio}</Text>
        </Section>
        <Section title="Mes packs en vente">
          <TwoColumnPackList
            style={styles.packs}
            packs={packs}
            onPressItem={handlePressPack}
          />
        </Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  packs: {
    paddingBottom: 300,
    minHeight: '100%',
  },
});
