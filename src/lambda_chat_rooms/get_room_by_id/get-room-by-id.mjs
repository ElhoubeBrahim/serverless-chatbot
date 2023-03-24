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
		const result = await dynamodb
			.get({
				TableName: "chatbot-chat-rooms",
				Key: {
					ID: room_id,
				},
			})
			.promise();

		// Check if chat room does not exist 
		// Or if the current user is not the owner
		if (!result.Item || result.Item.UserID !== user_id) {
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
