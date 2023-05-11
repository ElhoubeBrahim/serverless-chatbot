import ChatMessage from "./ChatMessage";

interface ChatRoom {
    ID: string;
    UserID: string;
    Title: string;
    Chat: ChatMessage[];
    CreatedAt: string;
    UpdatedAt: string;
}

export default ChatRoom;