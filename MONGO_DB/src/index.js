const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const connect = require('./config/database');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
const {PORT} = require('./config/server-config');
const apiroutes = require('./routes/index')
const cors = require('cors');
app.use(cors());
app.use('/api', apiroutes);
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
    console.log('mongodb connected');
})