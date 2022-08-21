/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
import axios from "axios";
const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;

const finnhubClient = new finnhub.DefaultApi();

const callApi = (symbol: string) => {
	// let metrics;
	try {
		console.log(symbol);
		return finnhubClient.companyProfile2(
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
				const metrics = {
					country,
					ipo,
					logoUrl: logo,
					marketCap: marketCapitalization,
					name,
					ticker,
					sector: finnhubIndustry,
					dateFetched: new Date().toISOString().slice(0, 10),
				};
				// return metrics;
			}
		);
		// console.log(metrics);
	} catch (error) {
		console.log("ran into errror");
		throw new Error("nah");
	}
};

const getCompanyProfile = (symbols: any) => {
	const companyProfiles: any[] = [];

	symbols.forEach(async (symbol: string) => {
		try {
			await axios
				.get(
					`https://finnhub.io/api/v1/stock/profile2?token=${process.env.API_KEY}&symbol=${symbol}`
				)
				.then((response) => {
					console.log(response.data);
					const {
						country,
						ipo,
						logo,
						marketCapitalization,
						name,
						ticker,
						finnhubIndustry,
					} = response.data;
					companyProfiles.push({
						country,
						ipo,
						logoUrl: logo,
						marketCap: marketCapitalization,
						name,
						ticker,
						sector: finnhubIndustry,
						dateFetched: new Date().toISOString().slice(0, 10),
					});
				});
		} catch (err) {
			console.error(err);
		}
	});
	console.log(companyProfiles);
	// return companyProfiles;
};

export { getCompanyProfile };
