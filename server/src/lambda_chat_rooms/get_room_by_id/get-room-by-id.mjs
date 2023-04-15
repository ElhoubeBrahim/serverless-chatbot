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
			return response(404, {
				message: `Chat room "${roomId}" not found`,
			});
		}

		return response(200, result.Item);
	} catch (error) {
		return response(500, {
			message: "Server Error",
			error: error,
		});
	}
};
