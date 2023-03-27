import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { accessChatRoom } from "./access-chat-room.mjs";
import { getCurrentUserID } from "chatbot-helpers";
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
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Prompt is required",
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

		// Get response from OpenAI API
		const response = await getResponse(prompt);
		if (response.error) {
			throw new Error(response.error.message);
		}

		// Save response to database
		const content = response.choices[0].text.trim();
		chatRoom.Chat.push({
			ID: uuidv4(),
			Prompt: prompt,
			Response: content,
			Rating: -1,
			Feedback: "",
			CreatedAt: new Date().toISOString(),
		});

		await dynamodb
			.update({
				TableName: "chatbot-chat-rooms",
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
				prompt,
				response: content,
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
