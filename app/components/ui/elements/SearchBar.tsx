import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {layouts} from '../../../shared/styles';
import {theme} from '../../../shared/styles/theme';
import {useDebounce} from '../../hooks';

interface SearchBarProps {
  onSearch: (value: string) => Promise<any>;
  onReset?: () => void;
  placeholder?: string;
  style?: any;
  loading?: boolean;
}

export const SearchBar = ({
  onSearch,
  onReset,
  placeholder = 'Rechercher...',
  loading,
  style,
  ...props
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, 1000);

  useEffect(() => {
    if (!loading && debouncedSearchTerm) onSearch(debouncedSearchTerm);
    return () => {};
  }, [debouncedSearchTerm]);

  const handleReset = () => {
    setSearchText('');
    if (onReset) onReset();
  };

  return (
    <View style={[layouts.row, styles.container, style]} {...props}>
      <TextInput
        style={[theme.h4, styles.input]}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        value={searchText}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={text => setSearchText(text)}
      />
      {!!searchText ? (
        <TouchableOpacity style={[styles.icon]} onPress={handleReset}>
          {getIcon('close', 24, Colors.purple, false)}
        </TouchableOpacity>
      ) : (
        getIcon('search', 24, Colors.purple, false, styles.icon)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: Colors.white,
    borderRadius: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  icon: {
    paddingRight: 10,
  },
});
