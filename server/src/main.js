import app from "./app/index.js";
import express from "express";
import path from "path";
import history from "express-history-api-fallback";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, 'views');
const fallbackFile = 'error.html';


app.use(history(fallbackFile, { root }));

app.use("/images", express.static(path.join(__dirname, "../uploads/images")));

export default app;