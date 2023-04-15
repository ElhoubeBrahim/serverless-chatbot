import AWS from "aws-sdk";
import { getCurrentUserID, response } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get room ID
		const roomId = event.pathParameters.id;

		// Get target chat room
		const room = await dynamodb
			.get({
				TableName: process.env.CHAT_ROOMS_TABLE,
				Key: {
					ID: roomId,
				},
			})
			.promise();

		// Check if chat room exists
		// and if it belongs to the current user
		if (!room || !room.Item || room.Item.UserID !== userId) {
			return response(404, {
				message: `Chat room "${roomId}" not found`,
			});
		}

		// Delete chat room
		const result = await dynamodb
			.delete({
				TableName: process.env.CHAT_ROOMS_TABLE,
				Key: {
					ID: roomId,
				},
				ReturnValues: "ALL_OLD",
			})
			.promise();

		return response(200, {
			message: `Chat room "${room.Item.Title}" deleted successfully`,
			room: result.Attributes,
		});
	} catch (error) {
		return response(500, {
			message: "Server Error",
			error: error,
		});
	}
};
