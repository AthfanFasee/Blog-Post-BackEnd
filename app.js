import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import xss from 'xss-clean';
import 'express-async-errors';
import rateLimiter from 'express-rate-limit';
import 'dotenv/config';
import BlogRouter from './routes/posts.js';
import AuthRouter from './routes/auth.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connect from './db/connect.js';



const app = express();
app.use(express.json());

//Extra security pacakages

//setproxy thing inge varum ( deleting for now to test)


app.use(cors());
app.use(helmet());
app.use(xss());



//Routes
app.use('/api/v1/posts', BlogRouter);
app.use('/api/v1/auth', AuthRouter);


//Error Handler
app.use(errorHandlerMiddleware)

//NotFound 
app.use(notFound);

//Setting up Server
const port = process.env.PORT || 4000;
const start = async () => {
  await connect(process.env.MONGO_URI);
  app.listen(port, console.log('Server Upp'));
}
start()
