import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {app, layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {
  AdvancedButton,
  ColorDot,
  ContentLoader,
  HeaderTitle,
  PrimaryButton,
  TopBar,
} from '../../../components/ui';
import {ToastService} from '../../../shared/services';
import {
  Colors,
  ModalNames,
  RouteNames,
  WORK_IN_PROGRESS,
} from '../../../constants';
import {Text} from 'react-native';
import {theme} from '../../../shared/styles/theme';
import {BalanceDTO, PaymentApi, VendorDTO} from '../../Shared/api/payment';
import {ActivityIndicator} from 'react-native-paper';
import {getIcon} from '../../../assets/icons';

async function getVendor() {
  const response = await PaymentApi.getVendorAccount();
  if (response.isRight()) return response.value.getValue();
  return null;
}

async function getLink(accountId: string) {
  const response = await PaymentApi.getAccountLink(accountId);
  if (response.isRight()) return response.value.getValue();
  return 'null';
}

async function getBalance(accountId: string) {
  const response = await PaymentApi.getVendorBalance(accountId);
  if (response.isRight()) return response.value.getValue();
  return null;
}

export const Transfert = ({navigation}: any) => {
  const [balance, setBalance] = useState<BalanceDTO>();
  const [vendor, setVendor] = useState<VendorDTO>();
  const [accountLink, setAccountLink] = useState<string>();

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribe = navigation.addListener('focus', async () => {
      const account = await getVendor();
      if (account && isSubscribed) {
        setVendor(account);
        const link = await getLink(account.vendorId);
        if (link && isSubscribed) setAccountLink(link);
        if (account.status === 'setup' || account.status === 'completed') {
          const balance = await getBalance(account.vendorId);
          if (balance && isSubscribed) setBalance(balance);
        }
      }
    });
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const handlePressStripe = () => {
    navigation.navigate(ModalNames.VendorWebPage, {link: accountLink});
  };

  function renderStatus() {
    if (!vendor || !vendor.status) return null;
    const isCompleted = vendor.status === 'completed';
    const isSetup = vendor.status === 'setup';

    const textColor = isCompleted
      ? Colors.green
      : isSetup
      ? Colors.orange
      : Colors.red;
    const text = isCompleted
      ? 'Activé'
      : isSetup
      ? 'Identification requise'
      : 'Création';

    const chargeColor = isSetup || isCompleted ? Colors.green : Colors.red;
    const payoutColor = isCompleted ? Colors.green : Colors.red;
    return (
      <View
        style={[
          app.softShadows,
          styles.status,
          {borderLeftWidth: 3, borderLeftColor: textColor},
        ]}>
        <View style={[layouts.row]}>
          <Text style={[theme.h4, {color: Colors.darkGray}]}>Status</Text>
          <Text style={[theme.h4, {color: textColor}]}>{text}</Text>
        </View>
        <View style={[layouts.row, {marginTop: 20}]}>
          <View style={layouts.row}>
            <Text style={theme.paragraph}>Dépôts</Text>
            <ColorDot color={chargeColor} size={10} style={{marginLeft: 10}} />
          </View>
          <View style={layouts.row}>
            <Text style={theme.paragraph}>Transferts</Text>
            <ColorDot color={payoutColor} size={10} style={{marginLeft: 10}} />
          </View>
        </View>
      </View>
    );
  }

  if (!vendor) return <ContentLoader />;

  const isSetupCompleted =
    !!vendor && (vendor.status === 'setup' || vendor.status === 'completed');

  return (
    <View style={[layouts.container]}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Compte vendeur'} />
      </Header>
      <View style={[layouts.content]}>
        <View style={styles.title}>
          {getIcon('stripe', 50, Colors.darkGray)}
          <Text style={[theme.h2, {color: Colors.darkGray}]}> Connect</Text>
        </View>
        {renderStatus()}
        {!isSetupCompleted ? (
          <>
            <Text style={[theme.h4, styles.text]}>
              Pour pouvoir vendre vos paquets de carte sur le shop, vous devez
              d'abord créer un espace vendeur et renseigner vos informations
              légales avec Stripe Connect
            </Text>
            <PrimaryButton
              text={
                isSetupCompleted
                  ? 'Compléter les informations'
                  : 'Créer le compte'
              }
              onPress={handlePressStripe}
              style={styles.createBtn}
            />
          </>
        ) : (
          <>
            {balance ? (
              <View style={[app.softShadows, styles.balance]}>
                <Text style={[theme.h3, {marginBottom: 20}]}>
                  Compte de dépots
                </Text>
                <View style={[layouts.row]}>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={[
                        theme.h1,
                        {textAlign: 'center'},
                      ]}>{`${balance.current} €`}</Text>
                    <Text style={[theme.h4, {textAlign: 'center'}]}>
                      En cours
                    </Text>
                  </View>
                  <View style={{flex: 0.5}}>
                    <Text
                      style={[
                        theme.h1,
                        {textAlign: 'center'},
                      ]}>{`${balance.pending} €`}</Text>
                    <Text style={[theme.h4, {textAlign: 'center'}]}>
                      En attente
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <ActivityIndicator color={Colors.purple} />
            )}
            <AdvancedButton icon="stripe" onPress={handlePressStripe} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance: {
    backgroundColor: Colors.purple,
    width: '100%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignContent: 'center',
  },
  status: {
    backgroundColor: Colors.white,
    padding: 20,
    marginVertical: 20,
  },
  text: {
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: Colors.darkGray,
  },
  createBtn: {},
});
