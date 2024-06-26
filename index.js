const express = require("express");
const morgan = require('morgan');
const multer = require('multer');
const corsMiddleware = require("./middleware/cors_middleware");
const upload = multer({ dest: 'C:/usman/hall-management-backend-api-server/images' });
const test = require("./routes/test.js");
const createErrorHttp = require("http-errors");
const bodyParser = require("body-parser");
const mongooseConnection = require("./db/mongodb.js");
require('dotenv').config();

const routes = require("./routes");
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3001;

app.use(morgan('dev'));

app.use(corsMiddleware);
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'C:/usman/hall-management-backend-api-server/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});


mongooseConnection.on('open', () => {
    console.log('MongoDB connected');

  
    app.use("/api", routes);
    app.use("/", test);

   

    app.use((req, res, next) => {
        next(createErrorHttp.NotFound());
    });

    app.use((err, req, res, next) => {
        err.status = err.status || 500;
        res.status(err.status).send(err.status, 'Something broke!')
        // res.status(500).send('Something broke!');
    });


    // Other code related to Express setup, routes, and starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

});