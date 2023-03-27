import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const accessChatRoom = async (roomId, userId) => {
	const room = await dynamodb
		.get({
			TableName: "chatbot-chat-rooms",
			Key: {
				ID: roomId,
			},
		})
		.promise();

	if (!room.Item || room.Item.UserID !== userId) return null;

	return room.Item;
};
