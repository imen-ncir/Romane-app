import React, {useState} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

import {PaymentMethods} from '@stripe/stripe-react-native';
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';
import {CustomerDTO, PaymentApi} from '../../../Shared/api/payment';
import {AdvancedButton} from '../../../../components/ui';
import {ToastService} from '../../../../shared/services';
import {Colors, ERROR_GENERIC} from '../../../../constants';

interface AddCardFormProps {
  customer: CustomerDTO;
  onCompleted: any;
}

export function AddCardForm({customer, onCompleted}: AddCardFormProps) {
  const [card, setCard] = useState<CardFieldInput.Details | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardHolder, setCardHolder] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const {createPaymentMethod} = useStripe();
  const {email, cards} = customer;

  // const checkDuplicate = (fingerprint: string) => {
  //   /*
  //      Get the saved cards with API. check the fingerprint of saved cards matches with the card user saved now. If matches, delete the new card. The fingerprint of the card will not come in the payment method creation, it will be added after the attachment only.
  //    */
  //   let fil_cards = cards.map((e: any) => e.card.fingerprint === fingerprint);
  //   // if fill_cards[0]===true
  //   if (fil_cards[0]) {
  //     //delete the card
  //     Alert.alert(
  //       'Duplicate Card',
  //       'You have a saved card with this number. Please add different card.',
  //     );
  //   } else {
  //     // Do other activities
  //   }
  // };

  const handleSubmit = async () => {
    setLoading(true);
    const billingDetails: PaymentMethods.BillingDetails = {
      email: email,
      name: cardHolder,
    };

    try {
      const {paymentMethod, error} = await createPaymentMethod({
        type: 'Card',
        billingDetails: billingDetails,
      });
      console.log("---- paymentMethod",paymentMethod)
      if (error) {
        setErrorMsg(error.message);
      } else {
        if (paymentMethod) {
          const result = await PaymentApi.addCard(paymentMethod.id);
          console.log("---- result",result)
          if (result.isRight()) {
            ToastService.showToast('Carte ajoutée avec succès', 'success');
            onCompleted();
          } else {
            ToastService.showToast(
              ERROR_GENERIC,
              'error',
              result.value.toString(),
            );
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setCard(null);
      setLoading(false);
    }
  };

  return (
    <>
      <TextInput
        onChangeText={text => setCardHolder(text)}
        placeholder={'Nom du titulaire'}
        placeholderTextColor={Colors.gray}
        style={styles.cardHolder}
      />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
          // postalCode: '69009',
        }}
        // cardStyle={{
        //   backgroundColor: Colors.white,
        //   borderWidth: 1,
        //   borderColor: Colors.purple,
        //   textColor: Colors.darkGray,
        // }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          setCard(cardDetails);
        }}
      />
      <Text style={styles.error}>{errorMsg || ''}</Text>
      <AdvancedButton
        icon="check"
        onPress={handleSubmit}
        loading={loading}
        disabled={
          loading ||
          !(card && card.complete && !!cardHolder && cardHolder.length > 3)
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  cardHolder: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.purple,
    height: 50,
    color: Colors.darkGray,
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
  },
  error: {
    color: Colors.red,
    marginVertical: 10,
  },
});
