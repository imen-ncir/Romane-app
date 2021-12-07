import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {Header, Section} from '../../../../components/ui/layouts';
import {layouts} from '../../../../shared/styles';
import {
  ChapterItem,
  HeaderTitle,
  SearchBar,
  SubjectHorizontalList,
  TopBar,
} from '../../../../components/ui';
import {BaseScreenProps} from '../../../../shared/core/Screen';
import {GlobalSearchResultsDTO, SearchApi} from '../../../Shared/api/search';
import {Colors, ERROR_GENERIC, RouteNames} from '../../../../constants';
import {ToastService} from '../../../../shared/services';
import {theme} from '../../../../shared/styles/theme';
import {Text} from 'react-native';
import {FlashcardPreview} from '../chapter/components';

const initState = {
  subjects: [],
  chapters: [],
  flashcards: [],
} as GlobalSearchResultsDTO;

export const Search = ({navigation}: BaseScreenProps) => {
  const [searchResult, setSearchResult] = useState<GlobalSearchResultsDTO>(
    initState,
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async (searchText: string) => {
    setIsSearching(true);
    const response = await SearchApi.searchGlobal(searchText);
    if (response.isRight()) {
      const result = response.value.getValue();
      setSearchResult(result);
    } else {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value);
    }
    setIsSearching(false);
  };

  const handleResetSearch = () => {
    setSearchResult(initState);
    setIsSearching(false);
  };

  const handlePressSubject = (id: string) => {
    navigation.push(RouteNames.SubjectDetails, {id});
  };

  const handlePressChapter = (id: string) => {
    navigation.push(RouteNames.ChapterDetails, {id});
  };

  const handlePressFlashcard = (id: string) => {
    navigation.push(RouteNames.FlashcardUpdate, {id});
  };

  const {subjects, chapters, flashcards} = searchResult;

  return (
    <View style={[layouts.container]}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Recherche'} />
        <SearchBar
          onSearch={handleSearch}
          onReset={handleResetSearch}
          placeholder={'Rechercher...'}
          style={styles.searchBar}
          loading={isSearching}
        />
      </Header>
      {isSearching ? (
        <ActivityIndicator />
      ) : (
        <View style={[styles.content]}>
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={false}>
            <Section title="Mes matières">
              <SubjectHorizontalList
                subjects={subjects}
                onPress={handlePressSubject}
              />
            </Section>
            <Section title="Mes chapitres">
              {chapters && chapters.length > 0 ? (
                chapters.map(c => (
                  <ChapterItem
                    key={c.id}
                    item={c}
                    onPress={() => handlePressChapter(c.id)}
                  />
                ))
              ) : (
                <Text style={[theme.text, {color: Colors.dark}]}>
                  Aucun chapitre
                </Text>
              )}
            </Section>
            <Section title="Mes cartes">
              {flashcards && flashcards.length > 0 ? (
                flashcards.map(f => (
                  <FlashcardPreview
                    item={f}
                    key={f.id}
                    onPressFlashcard={() => handlePressFlashcard(f.id)}
                  />
                ))
              ) : (
                <Text style={[theme.text, {color: Colors.dark}]}>
                  Aucun chapitre
                </Text>
              )}
            </Section>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    paddingBottom: 80,
  },
});
