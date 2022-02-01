import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import xss from 'xss-clean';
import 'express-async-errors'
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import BlogRouter from './routes/blogs.js';
import notFound from './middleware/not-found.js';




const app = express();
app.use(express.json());

//Extra security pacakages
app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  }));

app.use(cors());
app.use(helmet());
app.use(xss());



//Routes
app.use('/api/v1/blogs', BlogRouter)


//NotFound 
app.use(notFound)

//Setting up Server
const port = process.env.PORT || 4000
app.listen(port, console.log('Server Upp'));