import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ImagePlus, 
  X, 
  Upload, 
  Sparkles, 
  PenTool
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { createArticle, getAllCategories } from '@/services/user';
import { ImageFile } from '@/types/articleTypes';
import { useNavigate } from 'react-router-dom';
import { Category } from '@/types/categoryTypes';

interface AiSuggestion {
  text: string;
  confidence: number;
}

// const CATEGORIES = [
//   'Technology', 
//   'Science', 
//   'Arts', 
//   'Culture', 
//   'Sports', 
//   'Health', 
//   'Travel'
// ];

const ArticleCreation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  },[]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.success) {
        const data = response.data as Category[];
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImageFile[] = Array.from(files).map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }else{
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    console.log(tagToRemove)
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // TODO: AI Suggestion Simulation
  const generateAISuggestions = useCallback(() => {
    // Simulated AI suggestions based on current text
    const mockSuggestions: AiSuggestion[] = [
      { text: "In the rapidly evolving world of", confidence: 0.9 },
      { text: "As technology continues to transform", confidence: 0.8 },
      { text: "The future of innovation lies in", confidence: 0.7 }
    ];
    setAiSuggestions(mockSuggestions);
  }, [description]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!user._id) {
        console.log("Sorry user id is not available, please login again");
        return
      }
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", user._id);
    
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    
      images.forEach((image) => {
        formData.append(`images`, image as Blob);
      });
      console.log("Form data", formData);
    
      const response = await createArticle(formData);
      if (response.success) {
        navigate('/articles')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
          <PenTool className="mr-4 text-blue-500" /> Create Article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <Label className="text-white">Article Title</Label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              className="bg-gray-800 text-white border-gray-700 mt-1"
            />
          </div>

          {/* Description with AI Assistance */}
          <div>
            <Label className="text-white flex items-center">
              Description 
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-4 text-blue-500 hover:text-blue-400"
                    onClick={generateAISuggestions}
                  >
                    <Sparkles className="mr-2" /> AI Suggestions
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white">
                  <DialogHeader>
                    <DialogTitle>AI Writing Suggestions</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {aiSuggestions.map((suggestion, index) => (
                      <Card 
                        key={index} 
                        className="bg-gray-800 cursor-pointer hover:bg-gray-700"
                        onClick={() => {
                          setDescription(prev => prev + ' ' + suggestion.text);
                        }}
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <span>{suggestion.text}</span>
                          <Badge variant="secondary">
                            {(suggestion.confidence * 100).toFixed(0)}% Confidence
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </Label>
            <Textarea 
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your article description"
              className="min-h-[200px] bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Category Select */}
          <div>
            <Label className="text-white mb-1">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white">
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-white mb-1">Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-gray-800 text-white border-gray-700"
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={addTag}
                className=" border-gray-700"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="flex items-center"
                >
                  {tag}
                  <button>
                  <X 
                    className="ml-2 cursor-pointer" 
                    size={16} 
                    onClick={() => removeTag(tag)} 
                    />
                    </button>
                </Badge>
              ))}
            </div>
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
              {images.map((image, index) => (
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
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="mr-2" /> Publish Article
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ArticleCreation;