import AWS from "aws-sdk";
import { getCurrentUserID } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const user_id = getCurrentUserID(event.requestContext);

		// Get room ID
		const room_id = event.pathParameters.id;

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

		// Update chat room
		const result = await dynamodb
			.update({
				TableName: "chatbot-chat-rooms",
				Key: {
					ID: room_id,
				},
				UpdateExpression: "set Title = :title, UpdatedAt = :updatedAt",
				ExpressionAttributeValues: {
					":title": title,
					":updatedAt": new Date().toISOString(),
				},
				ReturnValues: "ALL_NEW",
			})
			.promise();

		if (!result) {
			throw new Error(`Failed to update room "${title}"`);
		}

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Chat room "${title}" updated successfully`,
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
