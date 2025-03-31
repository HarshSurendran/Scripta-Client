import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Edit, Eye, EyeOff, X, ImagePlus, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article, ImageFile } from '@/types/articleTypes';
import { useSwipeable } from 'react-swipeable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { deleteArticle, getNoOfBlocks, updateArticle } from '@/services/article';
import { validateImage, validateUpdateArticle } from '@/validators/articlesValidators';
import toast from 'react-hot-toast';


interface ArticleCardProps {
  article: Article;
  fetchMyArticles: () => Promise<void>;
}

const OwnerArticleCard: React.FC<ArticleCardProps> = ({ article, fetchMyArticles }) => {
  const [articleBody, setArticleBody] = useState(article);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newImages, setNewImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editArticleData, setEditArticleData] = useState({
    title: articleBody.title,
    description: articleBody.description,
    tags: articleBody.tags.join(', '),
    imageurls: [...articleBody.imageurls],
  });
  const [blocks, setBlocks] = useState();

  useEffect(() => {
    fetchNoOfBlocks();
  }, []);

  const fetchNoOfBlocks = async () => {
    try {
      const response = await getNoOfBlocks(article._id);
      if (response.success) {
        setBlocks(response.data);
      }
    } catch (error) {
      toast.error("Error in fetching no of blocks");
    }
  };

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

  const onClose = () => {
    setIsDeleteModalOpen(false);
  }

  const handleDeleteModal = async () => {
    try {      
      const response = await deleteArticle(articleBody._id);
      if (response.success) {
        fetchMyArticles();
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
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
              className="w-full h-auto max-h-[250px] object-cover"
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
            <div  className='space-x-2'>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenEditModal}
              className=" hover:text-blue-500 hover:bg-gray-800"
            >
              <Edit size={16} />Edit
            </Button>
            <Button
              variant="destructive"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
                className=" hover:text-red-500 hover:bg-gray-800"
            >
              <Trash size={16} /> Delete
              </Button>
              </div>
          </div>
          <Dialog open={isDeleteModalOpen} onOpenChange={onClose}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this article? This action cannot be undone.</p>
              <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteModal}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
            
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
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {blocks || 0} Blocks
              </Badge>
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
        <DialogContent className="bg-gray-900 text-white border-gray-700  sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto overflow-hidden sm:overflow-y-auto">
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