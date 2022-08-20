/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;

const finnhubClient = new finnhub.DefaultApi();

const getCompanyProfile = (req: Request, res: Response) => {
	const { symbol } = req.query;
	try {
		finnhubClient.companyProfile2(
			{ symbol },
			(_error: any, data: any, _response: any) => {
				const {
					country,
					ipo,
					logo,
					marketCapitalization,
					name,
					ticker,
					finnhubIndustry,
				} = data;
				res.json({
					country,
					ipo,
					logoUrl: logo,
					marketCap: marketCapitalization,
					name,
					ticker,
					sector: finnhubIndustry,
					dateFetched: new Date().toISOString().slice(0, 10),
				});
				// console.log(data);
			}
		);
	} catch (error) {
		throw new Error("nah");
	}
};

export { getCompanyProfile };
