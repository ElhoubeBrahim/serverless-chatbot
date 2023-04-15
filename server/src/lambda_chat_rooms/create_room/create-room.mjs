import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUserID, response } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get & validate room title
		const title = event.body ? JSON.parse(event.body).title : null;
		if (!title) {
			return response(400, {
				message: "Title is required",
			});
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

		return response(200, {
			message: `Chat room "${title}" created successfully`,
			room: roomData,
		});
	} catch (error) {
		return response(500, {
			message: "Server Error",
			error: error,
		});
	}
};
