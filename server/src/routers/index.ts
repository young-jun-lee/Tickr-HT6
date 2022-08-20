import express from 'express';
const router = express.Router();
const finnhub = require('finnhub');
import { supabase, signUp } from './supabase';

<<<<<<< HEAD
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
=======
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;
>>>>>>> 68dc349af3abae342b5afdf3c4dfce77e04b5926
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
		throw new Error('nah');
	}
});

router.post('/signUp', async (req, res) => {
	res.status(200);
	try {
		const { email, password } = req.body;

		const { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		console.log(user, session, error);

		res.status(200);
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;
