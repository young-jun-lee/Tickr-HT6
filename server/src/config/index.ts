/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
const app = express();
const finnhub = require("finnhub");
require("dotenv").config();

const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Express is listening at http://localhost:${port}`);
	console.log(process.env.API_KEY);
	const api_key = finnhub.ApiClient.instance.authentications["api_key"];
	api_key.apiKey = process.env.API_KEY;
	const finnhubClient = new finnhub.DefaultApi();
	finnhubClient.companyProfile2(
		{ symbol: "AAPL" },
		(error, data, response) => {
			console.log(data);
		}
	);
});
