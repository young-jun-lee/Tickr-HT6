import express from 'express';
const router = express.Router();
const finnhub = require('finnhub');
import { signIn, signUp } from './supabase';

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();

router.route('/').get((_req, res) => {
	res.send(`<h2>Hello world<h2/>`);
});

router.get('/companyProfile', (req, res) => {
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
});

router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;
