import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import bookRouter from './routes/bookRoutes.js';

const app = express();
const port = 5000;
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));


app.get('/', (req,res)=>
    res.send("Hello World")
)
app.use('/api/books',bookRouter)


app.listen(port, ()=>console.log("listening on port", port))