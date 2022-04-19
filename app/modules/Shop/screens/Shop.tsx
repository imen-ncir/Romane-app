import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {layouts} from '../../../shared/styles';
import {Header, Section} from '../../../components/ui/layouts';
import {AdvancedButton, HeaderTitle, IconButton, MoneyTag} from '../../../components/ui';
import {ToastService} from '../../../shared/services';
import {ERROR_GENERIC, ModalNames, RouteNames, WORK_IN_PROGRESS} from '../../../constants';

import {BaseScreenProps} from '../../../shared/core/Screen';
import {PackList} from '../../../components/ui/elements/lists/PackList';
import {theme} from '../../../shared/styles/theme';
import {PackDTO, ShopApi} from '../services';
import {ActivityIndicator} from 'react-native-paper';
import {useRecoilProfile} from '../../../contexts/atoms';
import {PackCategories, PackLevels} from '../../../constants/app';
import {IFilter, PackFilterBar} from './components';

const filters = [
  {
    label: 'Catégories',
    value: 'category',
    values: [
      {value: PackCategories.French, label: 'Français'},
      {value: PackCategories.Geography, label: 'Géographie'},
      {value: PackCategories.History, label: 'Histoire'},
      {value: PackCategories.Maths, label: 'Mathématiques'},
      {value: PackCategories.Nature, label: 'SVT'},
    ],
  },
  {
    label: 'Niveaux',
    value: 'level',
    values: [
      {value: PackLevels.Premiere, label: 'Première'},
      {value: PackLevels.Seconde, label: 'Seconde'},
      {value: PackLevels.Terminale, label: 'Terminale'},
      {value: PackLevels.Superieure, label: 'Supérieure'},
    ],
  },
  {
    label: 'Prix',
    value: 'price',
  },
] as IFilter[];

interface FilterValue {
  category?: string;
  value?: string;
}

let isSubscribed: boolean = false;
export const Shop = ({navigation}: BaseScreenProps) => {
  const [packs, setPacks] = useState<PackDTO[]>([]);
  const {profile} = useRecoilProfile();
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterValue>();
  const [filteredPacks, setFiltersPack] = useState<PackDTO[]>([]);

  async function loadPacks() {
    setLoading(true);
    const response = await ShopApi.getAllPacks();
    if (response.isRight() && isSubscribed) {
      const data = response.value.getValue() as PackDTO[];
      setPacks(data);
    } else {
      setPacks([]);
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
    setLoading(false);
  }
  useEffect(() => {
    isSubscribed = true;
    const unsubscribe = navigation.addListener('focus', () => {
      loadPacks();
    });
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!!filter && !!filter.category && !!filter.value) {
      const {category, value} = filter;
      const result = packs.filter((p: PackDTO) => p[category] === value);
      setFiltersPack(result);
    } else {
      setFiltersPack(packs);
    }
  }, [filter, packs]);

  const handleClickAdd = async () => {
   // navigation.push(ModalNames.Sell);
  };

  const handleFilterChange = (category?: string, value?: string) => {
    setFilter({category, value});
  };

  const handlePressPack = (packId: string) => {
    if (!packId) return;
    navigation.push(ModalNames.PackDetails, {id: packId});
  };

  const handlePressSearch = () => {
    navigation.push(ModalNames.Search);
  };

  return (
    <View style={layouts.container}>
      <AdvancedButton icon="add" onPress={handleClickAdd} />
      <Header style={{paddingBottom: 0}}>
        <View style={[layouts.row]}>
          <HeaderTitle title="Shop" style={[{flex: 1}]} />
          <MoneyTag value={profile.credits} />
        </View>
        <PackFilterBar
          onFilter={handleFilterChange}
          onPressSearch={handlePressSearch}
          style={styles.searchBar}
          filters={filters}
        />
      </Header>
      <View style={[layouts.content]}>
        {/* <ScrollView
          contentContainerStyle={[styles.scrollView]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={false}> 
          {/* <Section title="Pour vous">
            <Text style={[theme.paragraph]}>{WORK_IN_PROGRESS}</Text>
          </Section>
          <Section title="Meilleures ventes">
            <Text style={[theme.paragraph]}>{WORK_IN_PROGRESS}</Text>
          </Section> */}
          {/* <Section title="Nouveautés">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <PackList packs={filteredPacks} onPress={handlePressPack} />
            )}
          </Section> */}
          {loading ? (
              <ActivityIndicator />
            ) : (
              <PackList packs={filteredPacks} onPress={handlePressPack} />
            )}
        {/* </ScrollView> */} 

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 80,
  },
  searchBar: {},
  card: {
    width: 140,
    marginRight: 10,
  },
});
