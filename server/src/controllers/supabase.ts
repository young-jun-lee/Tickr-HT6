import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";

// Create a single supabase client for interacting with your database
const supabase = createClient(
	"https://lxfafscgmmiyoglzuqyc.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZmFmc2NnbW1peW9nbHp1cXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEwMTU5OTQsImV4cCI6MTk3NjU5MTk5NH0.bBeYEtGj73EgYnieWDQ60Ciso7Cwk_8_CQVhke7x4ao"
);

function signUpWithEmail(email: string, password: string) {
	return supabase.auth.signUp({
		email: email,
		password: password,
	});
}

const getTickers = async (req: Request, res: Response) => {
	try {
		// returns a list of 20 random tickers from our static stock database
		const { data, error } = await supabase.rpc("get_tickers");
		if (error) throw error;
		res.json({ data }).send();
		res.redirect(`${process.env.clientURL}/companyProfiles`);
	} catch (err) {
		console.error(err);
	}
};

const signUp = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		console.log(email);

		const { user, session, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) throw error;

		res.status(200).send();
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
};

export { supabase, signUp, signUpWithEmail, getTickers };
