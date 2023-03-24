import AWS from "aws-sdk";
import { getCurrentUserID } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const user_id = getCurrentUserID(event.requestContext);

		// Get room ID
		const room_id = event.pathParameters.id;

		// Get target chat room
		const room = await dynamodb
			.get({
				TableName: "chatbot-chat-rooms",
				Key: {
					ID: room_id,
				},
			})
			.promise();

		// Check if chat room exists
		// and if it belongs to the current user
		if (!room || !room.Item || room.Item.UserID !== user_id) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: `Chat room "${room_id}" not found`,
				}),
			};
		}

		// Delete chat room
		const result = await dynamodb
			.delete({
				TableName: "chatbot-chat-rooms",
				Key: {
					ID: room_id,
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
