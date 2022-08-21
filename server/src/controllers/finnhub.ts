/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
import axios from "axios";
import moment from "moment";
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

const getRecTrends = (req: Request, res: Response) => {
	const { symbol } = req.query;
	try {
		finnhubClient.recommendationTrends(
			symbol,
			(_error: any, data: any, _response: any) => {
				res.json(data[0]);
			}
		);
	} catch (error) {
		console.log(error);
		throw new Error("nah");
	}
};

const getHistoricalData = (req: Request, res: Response) => {
	const { symbol } = req.query;
	console.log(symbol);
	const now = Date.now();
	const weekAgo = now - 7776000;

	console.log(now);
	console.log(weekAgo);

	try {
		finnhubClient.stockCandles(
			symbol,
			"D",
			1660899599 - 11232000,
			1660899599,
			(_error: any, data: any, _response: any) => {
				console.log(data);
				res.json({ closed: data.c });
			}
		);
	} catch (error) {
		console.log(error);
		throw new Error("nah");
	}
};

const getCompanyNews = (req: Request, res: Response) => {
	const { symbol } = req.query;
	//"AAPL", "2020-01-01", "2020-05-01"
	const now = new Date();
	const week_ago = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() - 2
	);
	const start_date = moment(week_ago).format("YYYY-MM-DD");
	const end_date = moment(now).format("YYYY-MM-DD");
	console.log(symbol, start_date, end_date);
	try {
		finnhubClient.companyNews(
			symbol,
			start_date,
			end_date,
			(_error: any, data: any, _response: any) => {
				// const { datetime, headline, image, source, summary, url } =
				// 	data;
				// console.log("data", data);
				res.json(data);
			}
		);
	} catch (error) {
		throw new Error("nah");
	}
};

const getMarketNews = (req: Request, res: Response) => {
	try {
		finnhubClient.marketNews(
			"general",
			{},
			(_error: any, data: any, _response: any) => {
				console.log("data", data);
				res.json(data);
			}
		);
	} catch (error) {
		throw new Error("nah");
	}
};

export {
	getMarketNews,
	getCompanyNews,
	getCompanyProfile,
	getRecTrends,
	getHistoricalData,
};
