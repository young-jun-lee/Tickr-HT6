import express from "express";
import { getCompanyProfile } from "../controllers/finnhub";
import { signUp, getTickers, signIn } from "../controllers/supabase";

const router = express.Router();

router.route("/").get((_req, res) => {
	res.send(`<h2>Hello world<h2/>`);
});

router.get("/tickers", getTickers);

router.get("/companyProfiles", getCompanyProfile);

router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;
