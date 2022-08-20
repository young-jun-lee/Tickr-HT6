import express from 'express';
const router = express.Router();
const finnhub = require('finnhub');
import { supabase, signUp } from './supabase';

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

router.route('/').get((_req, res) => {
	res.send(`<h2>Hello world<h2/>`);
});

router.get('/companyProfile', (req, res) => {
	const { symbol } = req.query;
	try {
		finnhubClient.companyProfile2(
			{ symbol: symbol },
			(error, data, response) => {
				console.log(data);
			}
		);

		res.json({ symbol });
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
