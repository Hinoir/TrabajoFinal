const express = require('express');
const app = express();
require('./database');

app.use(express.json());

app.use('/api',require('./routes/router'));

app.listen(3000);
console.log("server on port , "+4000);