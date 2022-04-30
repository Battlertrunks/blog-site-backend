import { ObjectId } from "bson";
import express from "express";
import { getClient } from "../db";
import Article from "../models/Article";

const blogArticleRouter = express.Router();

// When there is a server error when accessing the data
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// Accessing the whole list of articles.
blogArticleRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Article>("articles")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// Accessing just one of the articles via _id
blogArticleRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(id) });

    res.status(200);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

// Creating a new article
blogArticleRouter.post("/", async (req, res) => {
  try {
    const newBlog: Article = req.body;
    const client = await getClient();
    client.db().collection<Article>("articles").insertOne(newBlog);

    res.status(201);
    res.json(newBlog);
  } catch (err) {
    errorResponse(err, res);
  }
});

// Updating an article via the _id
blogArticleRouter.put("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const updatedBlog: Article = req.body;
    const client = await getClient();

    const result = await client
      .db()
      .collection<Article>("articles")
      .replaceOne({ _id: new ObjectId(id) }, updatedBlog);

    if (result.modifiedCount) {
      res.status(200);
      res.json(updatedBlog);
    } else {
      res.status(404);
      res.send(`This article does not exist of ID: ${id}`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// Deleting an article via _id
blogArticleRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();

    const result = await client
      .db()
      .collection<Article>("articles")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send(`This article does not exist of ID: ${id}`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default blogArticleRouter;
