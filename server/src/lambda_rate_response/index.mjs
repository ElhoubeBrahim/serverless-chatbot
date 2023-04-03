import AWS from "aws-sdk";
import { accessChatRoom } from "./access-chat-room.mjs";
import { getCurrentUserID } from "chatbot-helpers";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get and validate data
		const body = event.body ? JSON.parse(event.body) : {};
		const roomId = body.room;
		const responseId = body.response;
		const feedback = body.feedback;
		const rating = body.rating;

		if (
			!roomId ||
			!responseId ||
			!feedback ||
			!rating ||
			rating < 0 ||
			rating > 5
		) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Missing required data",
				}),
			};
		}

		const chatRoom = await accessChatRoom(roomId, userId);
		if (chatRoom === null) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Chat room not found",
				}),
			};
		}

		// Find the target response index & save the rating
		const i = chatRoom.Chat.findIndex((item) => item.ID === responseId);
		if (i === -1) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Message not found",
				}),
			};
		}
		chatRoom.Chat[i].Rating = rating;
		chatRoom.Chat[i].Feedback = feedback;

		// Save the chat room
		await dynamodb
			.update({
				TableName: process.env.CHAT_ROOMS_TABLE,
				Key: {
					ID: roomId,
				},
				UpdateExpression: "set Chat = :chat, UpdatedAt = :updatedAt",
				ExpressionAttributeValues: {
					":chat": chatRoom.Chat,
					":updatedAt": new Date().toISOString(),
				},
				ReturnValues: "ALL_NEW",
			})
			.promise();

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Success",
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
