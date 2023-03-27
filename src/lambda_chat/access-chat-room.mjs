import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const accessChatRoom = async (room_id, user_id) => {
	const room = await dynamodb
		.get({
			TableName: "chatbot-chat-rooms",
			Key: {
				ID: room_id,
			},
		})
		.promise();

	if (!room.Item || room.Item.UserID !== user_id) return null;

	return room.Item;
};
