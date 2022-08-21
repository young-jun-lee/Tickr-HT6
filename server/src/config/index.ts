/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const index = require('../routers');

const app = express();
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', index);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
