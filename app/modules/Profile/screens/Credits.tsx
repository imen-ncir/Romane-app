import React from 'react';
import {StyleSheet, View, Text, Linking, TouchableOpacity} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {HeaderTitle, MoneyTag, TopBar} from '../../../components/ui';
import {useRecoilProfile} from '../../../contexts/atoms';
import {theme} from '../../../shared/styles/theme';
import {Option} from './components';
import {Colors, RouteNames} from '../../../constants';
import {ConfirmService} from '../../../shared/services';
import {getIcon} from '../../../assets/icons';

export const Credits = ({navigation}: any) => {
  const {profile} = useRecoilProfile();
  const {credits} = profile;

  const handlePressAddCredits = () => {
    navigation.push(RouteNames.CreditsAdd);
  };

  const handlePressTransfert = () => {
    navigation.push(RouteNames.CreditsTransfert);
  };

  const handlePressStripe = async () => {
    const confirm = await ConfirmService.show(
      'Vous allez être redirigé vers le site internet de Stripe',
      'Oui',
      'Non',
      {
        title: 'En savoir plus ?',
        isDangerouns: false,
      },
    );
    if (confirm) Linking.openURL('https://stripe.com/fr');
  };

  return (
    <View style={[layouts.container]}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Achats et Ventes'} style={{marginBottom: 10}} />
        {/* <View style={[layouts.row, {justifyContent: 'flex-start'}]}>
          <MoneyTag
            value={credits}
            style={styles.credits}
            textStyle={styles.credits}
          />
          <Text style={[theme.h4, styles.subtitle]}>Montant disponible</Text>
        </View> */}
      </Header>
      <View style={[layouts.content, styles.content]}>
        <View style={[layouts.row]}>
          <Option
            title="Cartes"
            style={styles.card}
            icon="card"
            description="Ajouter un moyen de paiement"
            onPress={handlePressAddCredits}
          />
          <Option
            title="Ventes"
            style={styles.card}
            icon="money"
            description="Consulter ton compte vendeur"
            onPress={handlePressTransfert}
          />
        </View>
        <View style={[styles.stripe]}>
          <View style={[layouts.row]}>
            <Text style={[theme.h2, {color: Colors.darkGray}]}>
              Sécurisé avec{' '}
            </Text>
            {getIcon('stripe', 64, Colors.darkGray)}
          </View>
          <TouchableOpacity onPress={() => handlePressStripe()}>
            <Text style={[theme.h4, {color: Colors.darkGray}]}>
              En savoir plus
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stripe: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: '100%',
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
  },
  subtitle: {
    marginHorizontal: 10,
    flexWrap: 'wrap',
    maxWidth: 100,
  },
  credits: {
    paddingHorizontal: 15,
    fontSize: 32,
  },
  content: {
    alignItems: 'flex-start',
    paddingBottom: 80,
    justifyContent: 'space-between',
  },
  help: {
    textAlign: 'left',
    marginBottom: 20,
  },
});
