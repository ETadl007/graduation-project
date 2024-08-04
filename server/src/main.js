import app from "./app/index.js";
import express from "express";
import path from "path";
import rateLimit from "express-rate-limit";
import history from "express-history-api-fallback";
import { fileURLToPath } from 'url';


const limiter = rateLimit({
    interval: {
        min: 1
    },
    max: 200
});


app.use(limiter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const root = path.join(__dirname, 'uploads');
const fallbackFile = 'index.html';


app.use(history(fallbackFile, { root }));


app.use("/images", express.static(path.join(__dirname, "../uploads/images")));



export default app;