/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
import axios from "axios";
const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;

const finnhubClient = new finnhub.DefaultApi();

const getCompanyProfile = async (symbol: string) => {
	try {
		return await axios
			.get(
				`https://finnhub.io/api/v1/stock/profile2?token=${process.env.API_KEY}&symbol=${symbol}`
			)
			.then((response) => {
				const {
					country,
					ipo,
					logo,
					marketCapitalization,
					name,
					ticker,
					finnhubIndustry,
				} = response.data;
				return {
					country,
					ipo,
					logoUrl: logo,
					marketCap: marketCapitalization,
					name,
					ticker,
					sector: finnhubIndustry,
					dateFetched: new Date().toISOString().slice(0, 10),
				};
			});
	} catch (err) {
		console.error(err);
	}
};

export { getCompanyProfile };
