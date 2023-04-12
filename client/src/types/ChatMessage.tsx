interface ChatMessage {
  ID: string;
  Prompt: string;
  Response: string | null;
  Loading: boolean;
  CreatedAt: string;
}

export default ChatMessage;
