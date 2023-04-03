import AWS from "aws-sdk";
import { getCurrentUserID } from "chatbot-helpers";

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
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: `Chat room "${roomId}" not found`,
				}),
			};
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

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Chat room deleted successfully`,
				room: result.Attributes,
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Server Error",
				error: error,
			}),
		};
	}
};
