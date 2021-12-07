import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../../constants';
import {layouts} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';
import {CardDTO} from '../../../Shared/api/payment';

interface CreditCardProps {
  card: CardDTO;
  style?: any;
}

export default function CreditCard({card, style}: CreditCardProps) {
  const {brand, last4, holder, exp_month, exp_year} = card;
  return (
    <View style={[styles.card, style]}>
      <Text style={[theme.h3]}>{brand.toLocaleUpperCase()}</Text>
      <View style={[layouts.row]}>
        <Text style={[theme.h3, styles.hidden]}>••••</Text>
        <Text style={[theme.h3, styles.hidden]}>••••</Text>
        <Text style={[theme.h3, styles.hidden]}>••••</Text>
        <Text style={[theme.h4]}>{last4}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={[theme.paragraph, styles.cardTitle]}>Titulaire</Text>
          <Text style={[theme.h4, styles.cardText]}>{holder}</Text>
        </View>
        <View>
          <Text style={[theme.paragraph, styles.cardTitle]}>Expiration</Text>
          <Text style={[theme.h4, styles.cardText]}>
            {exp_month < 10 ? `0${exp_month}` : exp_month} /{' '}
            {exp_year.toString().substring(2, 4)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    color: Colors.white,
  },
  card: {
    borderRadius: 12,
    minHeight: 180,
    backgroundColor: Colors.purple,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.white,
    shadowOffset: {height: 5, width: 0},
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: 'space-between',
  },
  cardNumber: {},
  cardTitle: {
    color: Colors.white,
  },
  cardText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
