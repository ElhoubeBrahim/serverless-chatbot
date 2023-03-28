import AWS from "aws-sdk";
import { getCurrentUserID } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get room ID
		const roomId = event.pathParameters.id;

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

		// Update chat room
		const result = await dynamodb
			.update({
				TableName: process.env.CHAT_ROOMS_TABLE,
				Key: {
					ID: roomId,
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
