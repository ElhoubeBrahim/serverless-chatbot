import AWS from "aws-sdk";
import { getCurrentUserID, response } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {

	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get user chat rooms
		const result = await dynamodb
			.scan({
				TableName: process.env.CHAT_ROOMS_TABLE,
				FilterExpression: "UserID = :user_id",
				ExpressionAttributeValues: {
					":user_id": userId,
				},
			})
			.promise();

		// Return chat rooms
		return response(200, result.Items)
	} catch (error) {
		return response(500, {
			message: "Server Error",
			error: error,
		});
	}
};
