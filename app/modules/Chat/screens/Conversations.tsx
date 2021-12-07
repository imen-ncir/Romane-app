import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {
  ContentLoader,
  HeaderTitle,
  IconButton,
  TopBar,
} from '../../../components/ui';
import {ChatApi, ConversationDTO} from '../services';
import {ToastService} from '../../../shared/services';
import {ERROR_GENERIC, ModalNames, RouteNames} from '../../../constants';
import {ConversationList} from './components/ConversationList';
import {sortBy} from '../../../shared/utils';

let isSubscribed: boolean = false;
export const Conversations = ({navigation}: any) => {
  const [conversations, setConversations] = useState<ConversationDTO[]>();
  async function loadConversations() {
    const response = await ChatApi.getConversations();
    if (response.isRight() && isSubscribed) {
      const data = response.value.getValue();
      const sorted = sortBy(data, 'lastMessageReceivedDate', 'desc');
      setConversations(sorted);
    } else {
      setConversations([]);
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
  }
  useEffect(() => {
    isSubscribed = true;
    const unsubscribe = navigation.addListener('focus', () => {
      loadConversations();
    });
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const handlePressSearchMember = () => {
    navigation.push(ModalNames.SearchMember, {callback: handlePressMember});
  };

  const handlePressMember = async (memberId: string) => {
    const response = await ChatApi.createConversation(memberId);
    if (response.isRight()) {
      loadConversations();
      const conversation = response.value.getValue();
      navigation.push(RouteNames.Chat, {conversation: conversation});
    } else {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
  };

  const handlePressConversation = async (conversationId: string) => {
    navigation.push(RouteNames.Chat, {id: conversationId});
  };

  if (!conversations) return <ContentLoader />;

  return (
    <View style={layouts.container}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <View style={[layouts.row]}>
          <HeaderTitle title="Conversations" />
          <IconButton icon="person-add" onPress={handlePressSearchMember} />
        </View>
      </Header>
      <View style={[styles.content]}>
        <ConversationList
          conversations={conversations}
          onPress={handlePressConversation}
          style={styles.conversations}
        />
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
