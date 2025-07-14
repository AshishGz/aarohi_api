import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import routes from './routes/index.js';
import { genericErrorHandler } from './platforms/middlewares/error.handler.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use('/v1', routes);

app.use(genericErrorHandler);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});