const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
	console.log('Here');
	res.send('Hi');
});

app.listen(3000);
