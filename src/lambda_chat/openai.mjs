import https from "https";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const fetchAPI = (options, payload) => {
	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			let buffer = "";
			res.on("data", (chunk) => (buffer += chunk));
			res.on("end", () => resolve(JSON.parse(buffer)));
		});
		req.on("error", (e) => reject(e.message));
		req.write(JSON.stringify(payload));
		req.end();
	});
};

export const getResponse = async (prompt) => {
	const response = await fetchAPI(
		{
			host: "api.openai.com",
			path: "/v1/completions",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_API_KEY}`,
			},
		},
		{
			model: "text-davinci-003",
			prompt: prompt,
			max_tokens: 4090,
		}
	);

	return response;
};
