import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const accessChatRoom = async (roomId, userId) => {
	const room = await dynamodb
		.get({
			TableName: process.env.CHAT_ROOMS_TABLE,
			Key: {
				ID: roomId,
			},
		})
		.promise();

	if (!room.Item || room.Item.UserID !== userId) return null;

	return room.Item;
};
