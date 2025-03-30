// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ThumbsUp, ThumbsDown, Ban, ChevronLeft, ChevronRight, Edit, Eye, EyeOff } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Article } from '@/types/articleTypes';
// import { useSwipeable } from 'react-swipeable';
// import { alterUserAction } from '@/services/article';
// import { RootState } from '@/redux/store/store';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// interface ArticleCardProps {
//   article: Article;
//   isOwner?: boolean;
// }

// const MyArticleCard: React.FC<ArticleCardProps> = ({ article, isOwner = false }) => {
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.user);
//   const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(
//     article.likedBy.includes(user._id as string)
//       ? 'like'
//       : article.dislikedBy.includes(user._id as string)
//         ? 'dislike'
//         : null
//   );
//   const [articleBody, setArticleBody] = useState(article);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [expandedDescription, setExpandedDescription] = useState(false);
  
//   // Determine if description is long and needs truncation
//   const isLongDescription = articleBody.description.length > 150;
//   const truncatedDescription = isLongDescription
//     ? articleBody.description.substring(0, 150) + '...'
//     : articleBody.description;

//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % article.imageurls.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + article.imageurls.length) % article.imageurls.length);
  
//   const handlers = useSwipeable({
//     onSwipedLeft: nextImage,
//     onSwipedRight: prevImage,
//   });
  
//   const handleUserAction = async (buttonClicked: "like button" | "dislike button") => {
//     let action : "like" | "dislike" | null;
//     if (buttonClicked === "like button") {
//       if (userAction === "like") {
//         action = null;
//       } else {
//         action = "like";
//       }
//     } else {
//       if (userAction === "dislike") {
//         action = null;
//       } else {
//         action = "dislike";
//       }
//     }
    
//     let alterObj = {};

//     if (userAction == null && action == 'like') {
//       alterObj = { likes: 1 };
//     } else if (userAction == null && action == 'dislike') {
//       alterObj = { dislikes: 1 };
//     } else if (userAction == 'like' && action == 'dislike') {
//       alterObj = { likes: -1, dislikes: 1 };
//     } else if (userAction == 'dislike' && action == 'like') {
//       alterObj = { likes:  1, dislikes: -1 };
//     } else if (userAction == 'like' && action == null) {
//       alterObj = { likes: -1 };
//     } else if (userAction == 'dislike' && action == null) {
//       alterObj = { dislikes: -1 };
//     }

//     try {
//       const response = await alterUserAction(articleBody._id, alterObj);
//       if (response.success) {
//         setUserAction(action);
//         setArticleBody((prev) => ({
//           ...prev,
//           likes: response.data.likes,
//           dislikes: response.data.dislikes,
//           likedBy: response.data.likedBy,
//           dislikedBy: response.data.dislikedBy
//         }));
//       }
//     } catch (error) {
//       console.log("Problem updating useraction");
//     }
//   };

//   const handleEditArticle = () => {
//     navigate(`/edit-article/${articleBody._id}`);
//   };

//   const toggleDescription = () => {
//     setExpandedDescription(!expandedDescription);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-6"
//     >
//       {articleBody.imageurls.length > 0 && (
//         <div {...handlers} className="relative w-full h-64 overflow-hidden flex items-center">
//           {articleBody.imageurls.length > 1 && (
//             <button
//               onClick={prevImage}
//               className="absolute left-2 bg-black/50 p-2 rounded-full text-white z-10"
//             >
//               <ChevronLeft size={20} />
//             </button>
//           )}
//           <motion.img
//             key={articleBody.imageurls[currentImageIndex]}
//             src={articleBody.imageurls[currentImageIndex]}
//             alt={articleBody.title}
//             className="w-full h-64 object-cover"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           />
//           {articleBody.imageurls.length > 1 && (
//             <button
//               onClick={nextImage}
//               className="absolute right-2 bg-black/50 p-2 rounded-full text-white z-10"
//             >
//               <ChevronRight size={20} />
//             </button>
//           )}
          
//           {/* Image counter indicator */}
//           {articleBody.imageurls.length > 1 && (
//             <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 px-2 py-1 rounded-full text-white text-xs">
//               {currentImageIndex + 1} / {articleBody.imageurls.length}
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center space-x-3">
//             <Avatar>
//               <AvatarImage src={articleBody.author.image} />
//               <AvatarFallback>{articleBody.author.shortName}</AvatarFallback>
//             </Avatar>
//             <div>
//               <h3 className="text-white font-bold">{articleBody.author.firstName + ' ' + articleBody.author.lastName}</h3>
//               <Badge variant="secondary">{articleBody.category}</Badge>
//             </div>
//           </div>
          
//           {/* Edit button for article owner */}
//           {isOwner && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleEditArticle}
//               className="text-blue-400 hover:text-blue-500 hover:bg-gray-800"
//             >
//               <Edit size={16} className="mr-2" /> Edit
//             </Button>
//           )}
//         </div>
          
//         <h2 className="text-xl font-bold text-white mb-2">{articleBody.title}</h2>
        
//         {/* Description with Read More option */}
//         <div className="text-gray-300 mb-4">
//           <p>{expandedDescription ? articleBody.description : truncatedDescription}</p>
//           {isLongDescription && (
//             <Button
//               variant="link"
//               size="sm"
//               onClick={toggleDescription}
//               className="text-blue-400 hover:text-blue-500 p-0 mt-1 h-auto"
//             >
//               {expandedDescription ? (
//                 <><EyeOff size={14} className="mr-1" /> Show Less</>
//               ) : (
//                 <><Eye size={14} className="mr-1" /> Read More</>
//               )}
//             </Button>
//           )}
//         </div>
          
//         <div className="flex flex-wrap gap-2 mb-4">
//           {articleBody.tags.map(tag => (
//             <Badge key={tag} variant="outline" className="text-white">{tag}</Badge>
//           ))}
//         </div>
          
//         <div className="flex flex-wrap justify-between items-center gap-y-2">
//           <div className="flex flex-wrap gap-2">
//             <Button
//               variant='secondary'
//               size="sm"
//               onClick={() => handleUserAction("like button")}
//               className={`flex items-center space-x-2 ${userAction === 'like' ? 'bg-green-500 text-white' : ''}`}
//             >
//               <ThumbsUp size={16} />
//               <span>{articleBody.likes}</span>
//             </Button>
              
//             <Button
//               variant={userAction === 'dislike' ? 'destructive' : 'outline'}
//               size="sm"
//               onClick={() => handleUserAction("dislike button")}
//               className="flex items-center space-x-2"
//             >
//               <ThumbsDown size={16} />
//               <span>{articleBody.dislikes}</span>
//             </Button>
              
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-red-500 hover:text-red-700"
//             >
//               <Ban size={16} className="mr-2" /> Block
//             </Button>
//           </div>
          
//           {/* Stats badge for article owner */}
//           {/* {isOwner && (
//             <div className="flex items-center space-x-2">
//               <Badge variant="outline" className="bg-gray-800 text-gray-300">
//                 Views: {articleBody.views || 0}
//               </Badge>
//               <Badge variant="outline" className="bg-gray-800 text-gray-300">
//                 Blocks: {articleBody.blocks || 0}
//               </Badge>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </motion.div>
//   );
// };
  
// export default MyArticleCard;



import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Edit, Eye, EyeOff, X, ImagePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article, ImageFile } from '@/types/articleTypes';
import { useSwipeable } from 'react-swipeable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateArticle } from '@/services/article';
import { validateImage, validateUpdateArticle } from '@/validators/articlesValidators';


interface ArticleCardProps {
  article: Article;
}

const OwnerArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [articleBody, setArticleBody] = useState(article);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newImages, setNewImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  // Edit form state
  const [editArticleData, setEditArticleData] = useState({
    title: articleBody.title,
    description: articleBody.description,
    tags: articleBody.tags.join(', '),
    imageurls: [...articleBody.imageurls],
  });
  

  //image input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(prevErrors => ({ ...prevErrors, images: '', imageurls: '' }));
      const files = event.target.files;
      if (files) {
        const newImages: ImageFile[] = Array.from(files).map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        setNewImages(prev => [...prev, ...newImages]);
      }
  };
  const removeImage = (index: number) => {
    setErrors(prevErrors => ({ ...prevErrors, imageurls: '' }));
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Determine if description is long and needs truncation
  const isLongDescription = articleBody.description.length > 150;
  const truncatedDescription = isLongDescription 
    ? articleBody.description.substring(0, 150) + '...' 
    : articleBody.description;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % articleBody.imageurls.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + articleBody.imageurls.length) % articleBody.imageurls.length);
  
  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
  });
  
  const toggleDescription = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // Reset form data when closing without saving
    setEditArticleData({
      title: articleBody.title,
      description: articleBody.description,
      tags: articleBody.tags.join(', '),
      imageurls: [...articleBody.imageurls],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditArticleData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }))
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setErrors(prevErrors => ({ ...prevErrors, imageurls: '' }));
    setEditArticleData(prev => ({
      ...prev,
      imageurls: prev.imageurls.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const updatedArticle = {
        title: editArticleData.title,
        description: editArticleData.description,
        tags: editArticleData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        imageurls: editArticleData.imageurls
      };

      const validateStatus = validateUpdateArticle(updatedArticle);

      if (!validateStatus.success) {
        const errors = validateStatus.error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        },{} as Record<string, string>);        
        setErrors(errors);
        return
      };

      if (newImages.length > 0) {
        const validateImageStatus = validateImage(newImages);
        console.log(validateImageStatus, "This is validateImage status")
        if (!validateImageStatus.success) {
          setErrors(prevErrors => ({ ...prevErrors, imageurls: validateImageStatus.error.issues[0].message }));
          return
        }
      };

      if (newImages.length == 0 && updatedArticle.imageurls.length == 0) {
        setErrors(prevErrors => ({
          ...prevErrors,
          imageurls: 'At least one image is required'
        }));
        console.log("ENtered")
        return
      };

      const formData = new FormData();
      formData.append("title", validateStatus.data.title);
      formData.append("description", validateStatus.data.description);
      updatedArticle.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
      formData.append("imageurls", validateStatus.data.imageurls.join(','));
      if(newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append(`images`, image as Blob);
        });
      };;
      const response = await updateArticle(articleBody._id, formData);
      if (response.success) {
        setArticleBody((prev) => {
          return { ...response.data, author: { ...prev.author },  }
        });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to update article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-6"
      >
        {articleBody.imageurls.length > 0 ? (
          <div {...handlers} className="relative w-full h-64 overflow-hidden flex items-center">
            {articleBody.imageurls.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-2 bg-black/50 p-2 rounded-full text-white z-10"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <motion.img
              key={articleBody.imageurls[currentImageIndex]}
              src={articleBody.imageurls[currentImageIndex]}
              alt={articleBody.title}
              className="w-full h-64 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {articleBody.imageurls.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 bg-black/50 p-2 rounded-full text-white z-10"
              >
                <ChevronRight size={20} />
              </button>
            )}
            
            {/* Image counter indicator */}
            {articleBody.imageurls.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 px-2 py-1 rounded-full text-white text-xs">
                {currentImageIndex + 1} / {articleBody.imageurls.length}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <p className="text-gray-400">No images for this article</p>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={articleBody.author.image} />
                <AvatarFallback>{articleBody.author.shortName}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-bold">{articleBody.author.firstName + ' ' + articleBody.author.lastName}</h3>
                <Badge variant="secondary">{articleBody.category}</Badge>
              </div>
            </div>
            
            {/* Edit button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenEditModal}
              className="text-blue-400 hover:text-blue-500 hover:bg-gray-800"
            >
              <Edit size={16} className="mr-2" /> Edit
            </Button>
          </div>
            
          <h2 className="text-xl font-bold text-white mb-2">{articleBody.title}</h2>
          
          {/* Description with Read More option */}
          <div className="text-gray-300 mb-4">
            <p>{expandedDescription ? articleBody.description : truncatedDescription}</p>
            {isLongDescription && (
              <Button
                variant="link"
                size="sm"
                onClick={toggleDescription}
                className="text-blue-400 hover:text-blue-500 p-0 mt-1 h-auto"
              >
                {expandedDescription ? (
                  <><EyeOff size={14} className="mr-1" /> Show Less</>
                ) : (
                  <><Eye size={14} className="mr-1" /> Read More</>
                )}
              </Button>
            )}
          </div>
            
          <div className="flex flex-wrap gap-2 mb-4">
            {articleBody.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-white">{tag}</Badge>
            ))}
          </div>
            
          <div className="flex flex-wrap justify-between items-center gap-y-2">
            {/* Stats badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {articleBody.likes} Likes
              </Badge>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {articleBody.dislikes} Dislikes
              </Badge>
              {/*              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {articleBody.blocks || 0} Blocks
              </Badge> */}
            </div>
            
            {/* Publication date */}
            <div className="text-gray-400 text-sm">
              Published: {new Date(Date.now()).toLocaleDateString()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-4xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Edit Article</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                name="title"
                value={editArticleData.title}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editArticleData.description}
                onChange={handleInputChange}
                rows={5}
                className="bg-gray-800 border-gray-700 text-white resize-y"
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags" className="text-white">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={editArticleData.tags}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="tech, news, tutorial"
              />
              {errors.tags && <p className="text-red-500">{errors.tags}</p>}
            </div>
            
            {/* <div className="grid gap-2">
              <Label className="text-white">Images</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {editArticleData.imageurls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Article image ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-2">
                <Input 
                  id="newImageUrl" 
                  type='file'
                  name="newImageUrl" 
                  value={editArticleData.newImageUrl} 
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white flex-1"
                  placeholder="Enter image URL"
                />
                <Button 
                  type="button" 
                  onClick={handleAddImage}
                  disabled={!editArticleData.newImageUrl}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div> */}

            {/* Image Upload */}
            <div>
              <Label className="text-white mb-1">Upload Images</Label>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                className="border-2 border-dashed border-gray-700 p-6 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex justify-center mb-4">
                  <ImagePlus className="text-gray-500" size={48} />
                </div>
                <p className="text-gray-400">Click to upload images or drag and drop</p>
              </div>
            
              {/* Image Preview */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {editArticleData.imageurls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Article image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                {/* Display newly uploaded images */}
                {newImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <img
                      src={image.preview}
                      alt={`Upload ${index}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              {errors.imageurls && <p className="text-red-500">{errors.imageurls}</p>}
            </div>







          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEditModal} className="text-black border-gray-600 hover:bg-gray-800 hover:text-white">
              Cancel
            </Button>
            <Button disabled={loading} onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
  
export default OwnerArticleCard;