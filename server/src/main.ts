import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/route';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://try-red-eta.vercel.app",
  "https://try-r22pmp68y-cristobals.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use('/api', route);

app.listen(port,()=> console.log(`Server is running on port ${port}`));
