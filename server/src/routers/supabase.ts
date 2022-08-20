import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
	'https://lxfafscgmmiyoglzuqyc.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZmFmc2NnbW1peW9nbHp1cXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEwMTU5OTQsImV4cCI6MTk3NjU5MTk5NH0.bBeYEtGj73EgYnieWDQ60Ciso7Cwk_8_CQVhke7x4ao'
);

async function signUpWithEmail(email: string, password: string) {
	return await supabase.auth.signUp({
		email: email,
		password: password
	});
	// console.log(user, error);
	// return { user, error };
}

const signUp = (req, res) => {
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
};

export { supabase, signUp, signUpWithEmail };
