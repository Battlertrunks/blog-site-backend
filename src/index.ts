import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import blogArticleRouter from "./routes/blogArticleRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/articles", blogArticleRouter);
export const api = functions.https.onRequest(app);
