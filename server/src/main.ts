import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/route';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(
    {
        credentials: true,
        origin: ["http://localhost:5173", "https://try-red-eta.vercel.app"]
    }
));
app.use(express.json());
app.use('/api', route);

app.listen(port,()=> console.log(`Server is running on port ${port}`));
