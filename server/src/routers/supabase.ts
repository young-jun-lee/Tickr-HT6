import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

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

const getTickers = async (req, res) => {
	try {
		const { data, error } = await supabase.rpc("get_tickers");
		if (error) throw error;
		console.log(data);
		res.json({ data }).send();
	} catch (err) {
		console.error(err);
	}
};

const signUp = async (req, res) => {
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
