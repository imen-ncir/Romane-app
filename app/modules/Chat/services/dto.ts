export interface ConversationDTO {
  conversationId: string;
  name: string;
  createdAt: Date;
  lastMessageReceivedDate?: Date;
  lastMessage?: string;
  pictureUrl?: string;
  isEnabled: boolean;
  withId: string;
}

export interface MessageDTO {
  messageId: string;
  content: string;
  sentAt: Date;
  sentBy: string;
  sentByName: string;
  avatarUrl?: string;
}
