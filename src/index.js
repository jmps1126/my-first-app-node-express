const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');

//enable enviroment variables
dotEnv.config();

//system routes
const routesVI = require('./routes/v1');

//init app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesVI(app);

// mongo connection
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    const port = process.env.PORT || 4000;

    app.listen(port , () => {
        console.log('connected to mongodb, running on ' + port);
    });

}).catch((err) => {
    console.log(`Error conection mongo  ${err} `);
});
