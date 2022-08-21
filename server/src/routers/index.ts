import express from 'express';
import {
	getMarketNews,
	getCompanyNews,
	getCompanyProfile
} from '../controllers/finnhub';
import { signIn, signUp, getTickers } from '../controllers/supabase';

const router = express.Router();

router.route('/').get((_req, res) => {
	res.send(`<h2>Hello world<h2/>`);
});

router.get('/tickers', getTickers);

router.get('/companyProfiles', getCompanyProfile);
router.get('/getCompanyNews', getCompanyNews);
router.get('/getMarketNews', getMarketNews);

router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;
