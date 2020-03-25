import express, {Application} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
import routesVI from './routes/v1';

//enable enviroment variables
dotEnv.config();

declare global{
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      sessionData: any;
    }
  }
}

//init app
const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesVI(app);

// mongo connection
const PORT: number | string = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`connected to mongodb, running on ${PORT}`);
  });
}).catch((err) => {
  console.log(`Error conection mongo  ${err} `);
});
