import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  Header,
  SearchBar,
  TopBar,
  HeaderTitle,
  MemberList,
} from '../../../components/ui';
import {ERROR_GENERIC, ModalNames} from '../../../constants';
import {BaseScreenProps} from '../../../shared/core/Screen';
import {ToastService} from '../../../shared/services';
import {layouts} from '../../../shared/styles';
import {MemberDTO, SocialApi} from '../api/socials';

interface SearchMemberModalParams {
  callback: (memberId: string) => any;
}

export const SearchMemberModal = ({navigation, route}: BaseScreenProps) => {
  const params: SearchMemberModalParams = route.params;
  const {callback} = params;

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<MemberDTO[]>([]);

  const handleSearch = async (criteria: string) => {
    setIsSearching(true);
    const response = await SocialApi.searchMember(criteria);
    if (response.isRight()) {
      setSearchResult(response.value.getValue());
    } else {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value);
    }
    setIsSearching(false);
  };

  const handleResetSearch = () => {
    setIsSearching(false);
  };

  const handlePressMember = async (memberId: string) => {
    setIsSearching(false);
    navigation.goBack();
    if (callback) callback(memberId);
  };

  const handlePressAvatar = async (memberId: string) => {
    navigation.push(ModalNames.MemberProfile, {id: memberId});
  };

  return (
    <View style={layouts.container}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title="Rechercher un membre" />
        <SearchBar
          onSearch={handleSearch}
          onReset={handleResetSearch}
          placeholder={"Tapez un nom d'utilisateur..."}
          style={styles.searchBar}
          loading={isSearching}
        />
      </Header>
      <View style={[styles.content]}>
        {isSearching ? (
          <ActivityIndicator />
        ) : (
          <MemberList
            members={searchResult}
            onPressAvatar={handlePressAvatar}
            onPress={handlePressMember}
            style={styles.members}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 10,
  },
  content: {
    flex: 1,
  },
  members: {
    padding: 20,
  },
  conversations: {},
});
