import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {
  AdvancedButton,
  HeaderTitle,
  OpacityButton,
  TopBar,
} from '../../../components/ui';
import {MoneyInput} from './components';
import {
  Colors,
  ERROR_GENERIC,
  RouteNames,
  WORK_IN_PROGRESS,
} from '../../../constants';
import {ConfirmService, ToastService} from '../../../shared/services';
import {CardDTO, CustomerDTO, PaymentApi} from '../../Shared/api/payment';
import CreditCard from './components/CreditCard';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '../../../shared/styles/theme';

async function getCustomer() {
  const response = await PaymentApi.getCustomerAccount();
  //console.log("errrr resss: "+JSON.stringify(response))
  if (response.isRight()) return response.value.getValue();
  return null;
}

async function getPaymentCard() {
  const response = await PaymentApi.getCard();
  if (response.isRight()) return response.value.getValue();
  return null;
}

export const AddCredits = ({navigation}: any) => {
  const [customer, setCustomer] = useState<CustomerDTO>();
  const [card, setCard] = useState<CardDTO | null>();
  const [value, setValue] = useState<number>();

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribe = navigation.addListener('focus', async () => {
      const account = await getCustomer();
      if (account && isSubscribed) {
        setCustomer(account);
        const card = await getPaymentCard();
        if (isSubscribed) setCard(card);
      }
    });
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const handlePressValidate = () => {
    ToastService.showToast(WORK_IN_PROGRESS, 'info');
  };

  const handlePressAddCard = () => {
    navigation.push(RouteNames.CardAdd, {customer});
  };

  const handlePressRemoveCard = async () => {
    if (!card) return;
    const confirm = await ConfirmService.show(
      'Supprimer ce moyen de paiement ?',
      'Supprimer',
      'Non',
      {title: 'Confirmation', isDangerouns: true},
    );
    if (confirm) {
      const response = await PaymentApi.removeCard(card.id);
      if (response.isRight()) {
        setCard(null);
      } else {
        ToastService.showToast(ERROR_GENERIC, 'error', response.value);
      }
    }
  };

  return (
    <View style={[layouts.container]}>
      <AdvancedButton
        icon="check"
        onPress={handlePressValidate}
        disabled={!value}
      />
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Moyen de paiement'} />
      </Header>
      <View style={[layouts.content]}>
        {(!customer || card === undefined) && (
          <ActivityIndicator color={Colors.purple} />
        )}
        {customer && (
          <>
            {!!card ? (
              <>
                <Text style={[theme.h4, styles.text]}>
                  Vous pouvez maintenant acheter des packs dans le Shop de
                  l'application
                </Text>
                {/* <MoneyInput
                  onChange={val => setValue(val)}
                  value={value}
                  description={'Montant à créditer sur ton compte'}
                /> */}
                <CreditCard card={card} style={styles.card} />
                <OpacityButton
                  text="Retirer la carte"
                  icon="remove"
                  color={Colors.red}
                  onPress={handlePressRemoveCard}
                  style={styles.removeBtn}
                />
              </>
            ) : (
              <>
                <Text style={[theme.h4, styles.text]}>
                  Pour créditer votre compte et faire des achats, vous devez
                  d'abord ajouter un moyen de paiement.
                </Text>
                <View style={styles.cardOutline}>
                  <OpacityButton
                    text="Ajouter une carte"
                    icon="add-circle"
                    color={Colors.purple}
                    onPress={handlePressAddCard}
                    style={styles.addBtn}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: Colors.darkGray,
  },
  cardOutline: {
    borderRadius: 12,
    minHeight: 180,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.purple,
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: 'center',
  },
  card: {
    marginVertical: 20,
  },
  removeBtn: {
    color: Colors.red,
  },
  addBtn: {
    zIndex: 1,
  },
});
