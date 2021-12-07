import React, {useEffect, useState,useCallback} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { IconButton } from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {layouts} from '../../../../shared/styles';
import {FilterTag} from './FilterTag';
//@ts-ignore
import RangeSliderRN from "rn-range-slider";



export interface IFilter {
  label: string;
  value: string;
  values?: IFilter[];
}

interface PackFilterBarProps {
  onFilter: (category?: string, value?: string) => any;
  style?: any;
  filters: IFilter[];
  onPressSearch: ()=> any ;
}

export const PackFilterBar = ({
  onFilter,
  filters,
  style,
  onPressSearch
}: PackFilterBarProps) => {
  const [filterCategory, setFilterCategory] = useState<string>();
  const [filter, setFilter] = useState<string>();
  const [values, setValues] = useState<IFilter[]>();
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(100);

  useEffect(() => {
    if (filterCategory) {
      const category = filters.find(f => f.value === filterCategory);
      if (category) setValues(category.values);
    } else {
      setValues(undefined);
    }
  }, [filterCategory]);

  const handlePressFilterCategory = (value: string) => {
    const newValue = filterCategory === value ? undefined : value;
    setFilterCategory(newValue);
    onFilter(newValue, filter);
  };

  const handlePressFilterValue = (value: string) => {
    let newValue = filter === value ? undefined : value;
    setFilter(newValue);
    onFilter(filterCategory, newValue);
  };

  const handleValueChange = useCallback((newLow, newHigh) => {
      setLow(newLow);
      setHigh(newHigh);
  },[setLow, setHigh]);

  useEffect(() => {
    setFilter(high.toString());
    onFilter(filterCategory, high.toString());
  }, [low,high]);

  return (
    <View style={[styles.container, style]}>
      <View style={[layouts.row, styles.filterCategories]}>
        {filters &&
          filters.map((f, index) => (
            f.label == "Prix" &&
            <FilterTag
              item={f}
              key={index}
              selected={filterCategory === f.value}
              onPress={handlePressFilterCategory}
            />
          ))}
           <IconButton icon="search" onPress={onPressSearch} />
      </View>
      {values && values.length > 0 ? (
        <View style={[layouts.row, styles.filterValues]}>
          {values.map((f, index) => (
            <FilterTag
              item={f}
              key={index}
              selected={filter === f.value}
              onPress={handlePressFilterValue}
            />
          ))}
        </View>
      ):
      filterCategory == "price" &&
      <>
      <View style={styles.view} >
        <View>
          <Text style={styles.priceText}>
            {low}€
          </Text>
        </View>
        <View>
          <Text style={styles.priceText}>
            {high}€
          </Text>
        </View>
      </View>
      <RangeSliderRN
        min={0}
        max={100}
        step={1}
        floatingLabel
        renderRail={() => <View style={styles.railView} />}
        renderRailSelected={() => <View style={styles.railSelectedView} />}
        renderThumb={()=> <View style={styles.thumbView} />}
        onValueChanged={handleValueChange}
      />
      </>
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  filterCategories: {
    // marginBottom: 10,
  },
  filterValues: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  values: {},
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(10,10,10, 0.2)',
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: Colors.white,
    fontSize: 16,
  },
  view:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  selectedFilter: {
    backgroundColor: Colors.white,
  },
  selectedText: {
    color: Colors.purple,
    fontWeight: 'bold',
  },
  railView:{
    flex: 1,
    height: 5,
    borderRadius: 2,
    backgroundColor: 'rgba(10,10,10, 0.2)'
    
  },
  railSelectedView:{
    height: 5,
    backgroundColor: Colors.white,
    borderRadius: 2
  },
  thumbView:{
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 6
  },
  priceText:{
    fontSize: 16,
    color: Colors.white,
  }
});
