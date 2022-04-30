import { ObjectId } from "mongodb";

export default interface Article {
  _id?: ObjectId;
  image: string;
  title: string;
  shortDescription: string;
  date: string;
}
