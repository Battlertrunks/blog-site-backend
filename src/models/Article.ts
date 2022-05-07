import { ObjectId } from "mongodb";

export default interface Article {
  _id?: ObjectId;
  image?: string | undefined;
  title: string;
  shortDescription: string;
  date: string;
  img_alt: string;
  bodyText: string;
}
