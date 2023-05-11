import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { accessChatRoom } from "./access-chat-room.mjs";
import { getCurrentUserID, response } from "chatbot-helpers";
import { getResponse } from "./openai.mjs";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
	try {
		// Get user ID
		const userId = getCurrentUserID(event.requestContext);

		// Get and validate data
		const body = event.body ? JSON.parse(event.body) : {};
		const roomId = body.room;
		const prompt = body.prompt;

		if (!prompt) {
			return response(400, {
				message: "Prompt is required",
			});
		}

		const chatRoom = await accessChatRoom(roomId, userId);
		if (chatRoom === null) {
			return response(400, {
				message: "Chat room not found",
			});
		}

		// Get response from OpenAI API
		const res = await getResponse(prompt);
		if (res.error) {
			throw new Error(res.error.message);
		}

		// Save response to database
		const content = res.choices[0].text.trim();
		chatRoom.Chat.push({
			ID: uuidv4(),
			Prompt: prompt,
			Response: content,
			Rating: -1,
			Feedback: "",
			CreatedAt: new Date().toISOString(),
		});

		const record = await dynamodb
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

		return response(
			200,
			record.Attributes.Chat[record.Attributes.Chat.length - 1]
		);
	} catch (error) {
		return response(500, {
			message: "Server Error",
			error: error,
		});
	}
};
