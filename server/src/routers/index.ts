/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
const router = express.Router();
const finnhub = require("finnhub");
import { ServerResponse, IncomingMessage } from "http";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY_SANDBOX;
const finnhubClient = new finnhub.DefaultApi();

router.route("/").get((_req, res) => {
	res.send(`<h2>Hello world<h2/>`);
});

router.get("/companyProfile", (req, res) => {
	const { symbol } = req.query;
	try {
		finnhubClient.companyProfile2({ symbol }, (data: any) => {
			// const logoUrl = data.logo
			console.log(data.logo);
		});

		res.json({ symbol });
	} catch (error) {
		throw new Error("nah");
	}
});

module.exports = router;
