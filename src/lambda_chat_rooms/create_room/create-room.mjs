import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUserID } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get & validate room title
		const title = event.body ? JSON.parse(event.body).title : null;
		if (!title) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Title is required",
				}),
			};
		}

		// Create chat room
		const roomId = uuidv4();
		const roomData = {
			ID: roomId,
			UserID: userId,
			Title: title,
			Chat: [],
			CreatedAt: new Date().toISOString(),
			UpdatedAt: new Date().toISOString(),
		};
		const result = await dynamodb
			.put({
				TableName: process.env.CHAT_ROOMS_TABLE,
				Item: roomData,
			})
			.promise();

		if (!result) {
			throw new Error(`Failed to create room "${title}"`);
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Chat room "${title}" created successfully`,
				room: roomData,
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
