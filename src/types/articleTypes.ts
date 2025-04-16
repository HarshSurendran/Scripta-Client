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
    shortName: string;
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
    likedBy: string[];
    dislikedBy: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type CreateArticleValidate = {
    title: string;
    description: string;
    images: ImageFile[];
    tags: string[];
    category: string;
};
  