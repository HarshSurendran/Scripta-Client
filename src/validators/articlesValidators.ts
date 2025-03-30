import { z } from "zod";


export const createArticleSchema = z.object({
    title: z.string().trim().min(1, { message: "Title is required" }),
    description: z.string().trim().min(20, { message: "Must be 20 or more characters long" }),
    category: z.string().min(1, {  message: "Categories are required" }),
    tags: z.array(z.string()).min(1, { message: "At least one tag is required" }),
    images: z.array( z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB") // Size limit
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Only JPG, PNG, and WEBP are allowed")).min(1, { message: "At least one image is required" }).refine((files) => {
        const uniqueFiles = new Set(files.map((file) => `${file.name}-${file.size}`));
        return uniqueFiles.size === files.length;
      }, "Duplicate images are not allowed")
});
  
export const validateCreateArticle = (data: any) => createArticleSchema.safeParse(data);