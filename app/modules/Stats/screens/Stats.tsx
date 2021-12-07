import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Colors} from '../../../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import {layouts} from '../../../shared/styles';
import {Header, Section} from '../../../components/ui/layouts';
import {
  ContentLoader,
  HalfGauge,
  HeaderTitle,
  SuccessFailureBar,
} from '../../../components/ui';
import {formatDate} from '../../../shared/utils';
import {SubjectStatsListItem} from './components';
import {GlobalStatDTO, StatsApi} from '../services';
import {ToastService} from '../../../shared/services';
import {ERROR_GENERIC} from '../../../constants';

const {width} = Dimensions.get('window');

export const Stats = ({navigation}: any) => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<GlobalStatDTO>();

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribe = navigation.addListener('focus', () => {
      // if (!loading) {
      loadData();
      // }
    });
    async function loadData() {
      // setLoading(true);
      const response = await StatsApi.getStats();
      if (isSubscribed) {
        if (response.isRight()) {
          setStats(response.value.getValue());
          console.log("-----stats ---"+ JSON.stringify(response))
        } else {
          ToastService.showToast(ERROR_GENERIC, 'error', response.value);
        }
      }
      // setLoading(false);
    }
    loadData();
    return () => {
      unsubscribe();
      isSubscribed = false;
    };
  }, []);

  if (!stats) return <ContentLoader />;

  const {
    lastTestDate,
    overallCompletion,
    overallFailure,
    overallSuccess,
    overallTotalCards,
    subjects,
  } = stats;

  return (
    <View style={layouts.container}>
      {/* <AdvancedButton icon="play" onPress={handleOnPressRunLastTest} /> */}
      <Header>
        <HeaderTitle title="Statistiques" />
        <HalfGauge
          label={'Accomplissement total'}
          value={overallCompletion}
          unit={'%'}
          style={styles.halfgauge}
          color={Colors.white}
        />
        <SuccessFailureBar
          total={overallTotalCards}
          successValue={overallSuccess}
          failureValue={overallFailure}
          style={styles.successBar}
        />
      </Header>
      <View style={[layouts.content, styles.content]}>
        <Section>
          <View style={[layouts.row]}>
            <Text style={styles.test}>{`Dernier test : ${
              lastTestDate ? formatDate(new Date(lastTestDate)) : 'N/A'
            }`}</Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            contentContainerStyle={styles.list}
            data={subjects}
            renderItem={({item, index}) => (
              <SubjectStatsListItem key={index} item={item} />
            )}
          />
        </Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    color: Colors.darkGray,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  testIcon: {},
  content: {
    paddingTop: 40,
  },
  halfgauge: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBar: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: -40,
  },
  list: {
    paddingBottom: 120,
  },
});
