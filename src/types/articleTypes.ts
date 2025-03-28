import { A } from "node_modules/framer-motion/dist/types.d-B50aGbjN";
import { User } from "./userTypes";

export type CreateArticle = {
    title: string;
    description: string;
    imageurls: ImageFile[];
    tags: string[];
    category: string;
    author: string;
};

export interface ImageFile extends File {
    preview: string;
}

export interface Author {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    image: string;
}


export interface Article {
    _id: string;
    title: string;
    description: string;
    imageurls: string[];
    tags: string[];
    category: string;
    author: Author;
    likes: number;
    dislikes: number;
}
  