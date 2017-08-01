'use strict';

require('babel-register');
require('dotenv').config();

const app = require('./src/app').app;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`URL shortener listening on ${PORT}`);
});