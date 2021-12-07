import React from 'react';
import {View} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {HeaderTitle, TopBar} from '../../../components/ui';
import {StripeProvider} from '@stripe/stripe-react-native';
import {StripeKeys} from '../../../constants/stripe';
import {AddCardForm} from './forms/AddCardForm';
import {BaseScreenProps} from '../../../shared/core/Screen';

export const AddCard = ({navigation, route}: BaseScreenProps) => {
  const customer = route.params.customer;
  const handlePressValidate = () => {
    navigation.goBack();
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
        <HeaderTitle title={'Ajouter une carte'} />
      </Header>
      <View style={[layouts.content]}>
        <StripeProvider publishableKey={StripeKeys.PUBLIC_KEY}>
          <AddCardForm customer={customer} onCompleted={handlePressValidate} />
        </StripeProvider>
      </View>
    </View>
  );
};
