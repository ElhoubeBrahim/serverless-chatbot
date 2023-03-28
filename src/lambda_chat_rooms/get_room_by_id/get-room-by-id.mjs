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
		const result = await dynamodb
			.get({
				TableName: process.env.CHAT_ROOMS_TABLE,
				Key: {
					ID: roomId,
				},
			})
			.promise();

		// Check if chat room does not exist 
		// Or if the current user is not the owner
		if (!result.Item || result.Item.UserID !== userId) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: "Room not found",
				}),
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify(result.Item),
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
