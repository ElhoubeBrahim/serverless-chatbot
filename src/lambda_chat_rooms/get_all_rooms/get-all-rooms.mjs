import AWS from "aws-sdk";
import { getCurrentUserID } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {

	try {
		// Get user ID
		const user_id = getCurrentUserID(event.requestContext);

		// Get user chat rooms
		const result = await dynamodb
			.scan({
				TableName: "chatbot-chat-rooms",
				FilterExpression: "UserID = :user_id",
				ExpressionAttributeValues: {
					":user_id": user_id,
				},
			})
			.promise();

		return {
			statusCode: 200,
			body: JSON.stringify(result.Items),
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
