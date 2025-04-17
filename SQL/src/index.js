const express = require('express');
const { PORT , DB_SYNC} = require('./config/server-config')
const bodyparser = require('body-parser')
const app = express();
const apiroutes = require('./Routes/index')
const cors = require('cors');
app.use(cors()); // allow all origins (or configure specifically)

const prepareandstartserver = () => {
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}))
    app.use('/api',apiroutes);
    app.listen(PORT, async () => {
        console.log('server started at port 3001')
        if(DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    });
}

prepareandstartserver();