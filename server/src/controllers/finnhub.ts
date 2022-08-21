/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from 'express';
import moment from 'moment';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
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
					finnhubIndustry
				} = data;
				res.json({
					country,
					ipo,
					logoUrl: logo,
					marketCap: marketCapitalization,
					name,
					ticker,
					sector: finnhubIndustry,
					dateFetched: new Date().toISOString().slice(0, 10)
				});
				// console.log(data);
			}
		);
	} catch (error) {
		throw new Error('nah');
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
	const start_date = moment(week_ago).format('YYYY-MM-DD');
	const end_date = moment(now).format('YYYY-MM-DD');
	console.log(symbol, start_date, end_date);
	try {
		finnhubClient.companyNews(
			symbol,
			start_date,
			end_date,
			(_error: any, data: any, _response: any) => {
				// const { datetime, headline, image, source, summary, url } =
				// 	data;
				console.log('data', data);
				res.json(data);
			}
		);
	} catch (error) {
		throw new Error('nah');
	}
};

export { getCompanyNews, getCompanyProfile };
