import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {layouts} from '../../../shared/styles';
import {Header} from '../../../components/ui/layouts';
import {ContentLoader, HeaderTitle, TopBar} from '../../../components/ui';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import {ChatApi, ConversationDTO} from '../services';
import {useAuthContext} from '../../../contexts/auth.context';
import {ConfirmService, ToastService} from '../../../shared/services';
import {Colors, ERROR_GENERIC, ModalNames} from '../../../constants';
import {ChatEmpty} from './components/ChatEmpty';
import {ChatDisabled} from './components/ChatDisabled';
import {attachMessagesListener, DataMessage} from '../services/listeners';

function convertMessage(data: DataMessage) {
  const {doc_id, sent_at, text, sent_by, username, avatar_url} = data;
  return {
    _id: doc_id.toString(),
    createdAt: (sent_at as any).toDate(),
    text,
    user: {
      _id: sent_by,
      name: username,
      avatar: avatar_url,
    },
  };
}

const customtInputToolbar = (props: InputToolbarProps) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputContainer}
      primaryStyle={styles.input}
    />
  );
};

let messageListener: any = null;
export const Chat = ({navigation, route}: any) => {
  const {uid} = useAuthContext();
  const conversation: ConversationDTO = route.params.conversation;
  const id = route.params.id || conversation.conversationId;
  if (!id && !conversation) navigation.goBack();

  const [chatRoom, setChatRoom] = useState<ConversationDTO>(conversation);
  const [messages, setMessages] = useState<IMessage[]>();
  const [enabled, setEnabled] = useState<boolean>(
    conversation?.isEnabled || true,
  );

  const addMessage = useCallback((lastMessage?: DataMessage) => {
    if (!lastMessage) setMessages([]);
    else {
      const giftedMessage = convertMessage(lastMessage);
      setMessages((previousMessages: any) =>
        GiftedChat.append(previousMessages, [giftedMessage]),
      );
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    async function loadConversation() {
      if (!conversation) {
        let response = await ChatApi.getConversation(id);
        if (response.isRight() && isSubscribed) {
          setChatRoom(response.value.getValue());
          setEnabled(response.value.getValue().isEnabled);
        }
      }
    }

    messageListener = attachMessagesListener(id, addMessage);
    loadConversation();
    return () => {
      isSubscribed = false;
      if (messageListener) {
        messageListener();
        messageListener = null;
      }
    };
  }, []);

  const handleSend = useCallback(async (messages = []) => {
    if (!enabled) return;
    const lastmessage: IMessage = messages[0];
    if (!lastmessage) return;

    const response = await ChatApi.addMessage(id, {text: lastmessage.text});
    if (response.isLeft()) {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
  }, []);

  const handleDisableChat = useCallback(async () => {
    const confirm = await ConfirmService.show(
      'Voulez-vous bloquer la conversation ? Vous ne pourrez plus discuter avec cette personne.',
    );
    if (confirm) setEnabled(false);
  }, []);

  const handleEnableChat = useCallback(() => {
    setEnabled(true);
  }, []);

  const handlePressShare = () => {
    navigation.navigate(ModalNames.Share, {targetId: chatRoom.withId});
  };

  const handlePressAvatar = (props: any) => {
    if (!!props._id) {
      navigation.push(ModalNames.MemberProfile, {id: props._id});
    }
  };

  if (!chatRoom || !messages) return <ContentLoader />;

  const {name} = chatRoom;
  return (
    <View style={layouts.container}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
          rightAction={{
            iconName: 'share',
            name: 'Partager',
            callback: () => handlePressShare(),
          }}
          moreActions={[
            {
              iconName: 'blocked',
              name: 'Bloquer',
              callback: handleDisableChat,
              isDangerous: true,
            },
          ]}
        />
        <HeaderTitle title={name || 'Chat'} />
      </Header>
      <View style={[layouts.content]}>
        {enabled ? (
          <GiftedChat
            messages={messages}
            onSend={messages => handleSend(messages)}
            onPressAvatar={handlePressAvatar}
            disableComposer={!enabled}
            dateFormat={'DD/MM/YYYY'}
            timeFormat={'HH:mm'}
            alwaysShowSend={false}
            renderInputToolbar={props => customtInputToolbar(props)}
            renderChatEmpty={() => <ChatEmpty />}
            textInputProps={{...styles.inputText, autoCapitatlize: 'none'}}
            user={{
              _id: uid,
            }}
          />
        ) : (
          <ChatDisabled onEnable={handleEnableChat} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16,
    color: Colors.purple,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputContainer: {
    borderTopWidth: 0,
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    alignItems: 'center',
    borderColor: Colors.purple,
    borderWidth: 0.5,
    borderRadius: 18,
    minHeight: 48,
  },
});
