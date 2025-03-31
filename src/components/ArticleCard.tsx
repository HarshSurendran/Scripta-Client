import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Ban, ChevronLeft, ChevronRight, EyeOff, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from '@/types/articleTypes';
import { useSwipeable } from 'react-swipeable';
import { alterUserAction, blockArticle } from '@/services/article';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import toast from 'react-hot-toast';

const blockReasons = [
  "Inappropriate content",
  "Misinformation",
  "Not relevant to my interests",
  "Spam",
  "Hate speech",
  "Other"
];

const ArticleCard: React.FC<{ article: Article, setIsBlocked: (value :boolean) => void }> = ({ article, setIsBlocked }) => {
  const user = useSelector((state: RootState) => state.user);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(article.likedBy.includes(user._id as string) ? 'like' : article.dislikedBy.includes(user._id as string) ? 'dislike' : null);
  const [articleBody, setArticleBody] = useState(article);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState<string>(blockReasons[0]);
  const [otherReason, setOtherReason] = useState<string>("");

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % article.imageurls.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + article.imageurls.length) % article.imageurls.length);
  
  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
  });

  const isLongDescription = articleBody.description.length > 150;
  const truncatedDescription = isLongDescription 
    ? articleBody.description.substring(0, 150) + '...' 
    : articleBody.description;
  
    const toggleDescription = () => {
      setExpandedDescription(!expandedDescription);
    };
  
  const handleUserAction = async (buttonClicked: "like button" | "dislike button") => {
    let action : "like" | "dislike" | null;
    if (buttonClicked === "like button") {
      if (userAction === "like") {
        action = null;
      } else {
        action = "like";
      }
    } else {
      if (userAction === "dislike") {
        action = null;
      } else {
        action = "dislike";
      }
    }
    
    let alterObj = {};

    if (userAction == null && action == 'like') {
      alterObj = { likes: 1 };
    } else if (userAction == null && action == 'dislike') {
      alterObj = { dislikes: 1 };
    } else if (userAction == 'like' && action == 'dislike') {
      alterObj = { likes: -1, dislikes: 1 };
    } else if (userAction == 'dislike' && action == 'like') {
      alterObj = { likes:  1, dislikes: -1 };
    } else if (userAction == 'like' && action == null) {
      alterObj = { likes: -1 };
    } else if (userAction == 'dislike' && action == null) {
      alterObj = { dislikes: -1 };
    }

    try {
      const response = await alterUserAction(articleBody._id,alterObj);
      if (response.success) {
        setUserAction(action);
        setArticleBody((prev) => ({...prev, likes: response.data.likes, dislikes: response.data.dislikes, likedBy: response.data.likedBy, dislikedBy: response.data.dislikedBy}));
      }
    } catch (error) {
      toast.error("Failed to update user action");
    }
  }
  
  const handleBlockArticle = () => {
    setBlockDialogOpen(true);
  };

  const submitBlockRequest = async () => {
    const reasonData = blockReason === "Other" ? otherReason : blockReason;
    
    try {
      const blockData = {
        userId: user._id as string,
        articleId: articleBody._id,
        reason: reasonData,
      }

      const response = await blockArticle(blockData);
      if (response.success) {
        toast.success("Article blocked successfully");
        setIsBlocked(true);
      }
      
      setBlockDialogOpen(false);
      setBlockReason(blockReasons[0]);
      setOtherReason("");
    } catch (error) {
      toast.error("Failed to block article");
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
        {articleBody.imageurls.length > 0 && (
          <div {...handlers} className="relative w-full h-64 overflow-hidden flex items-center">
            <button onClick={prevImage} className={`absolute left-2 bg-black/50 p-2 rounded-full text-white ${articleBody.imageurls.length === 1 ? 'hidden' : ''}`}>
              <ChevronLeft size={20} />
            </button>
            <motion.img
              key={articleBody.imageurls[currentImageIndex]}
              src={articleBody.imageurls[currentImageIndex]}
              alt={articleBody.title}
              className="w-full h-64 object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <button onClick={nextImage} className={`absolute right-2 bg-black/50 p-2 rounded-full text-white ${articleBody.imageurls.length === 1 ? 'hidden' : ''}`}>
              <ChevronRight size={20} />
            </button>
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
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">{articleBody.title}</h2>
          {/* <p className="text-gray-300 mb-4">{articleBody.description}</p> */}
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
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Button
                variant='secondary'
                size="sm"
                onClick={() => handleUserAction("like button")}
                className={`flex items-center space-x-2 ${userAction === 'like' ? 'bg-green-500 text-white' : ''}`}
              >
                <ThumbsUp size={16} />
                <span>{articleBody.likes}</span>
              </Button>
              
              <Button
                variant={userAction === 'dislike' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => handleUserAction("dislike button")}
                className="flex items-center space-x-2"
              >
                <ThumbsDown size={16} />
                <span>{articleBody.dislikes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBlockArticle}
                className="text-red-500 hover:text-red-700"
              >
                <Ban size={16} className="mr-2" /> Block
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 text-white border-gray-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Block this article</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please tell us why you want to block this article. This helps us improve your feed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={blockReason} onValueChange={setBlockReason} className="space-y-3">
              {blockReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem id={reason} value={reason} className="text-white border-gray-600" />
                  <Label htmlFor={reason} className="text-white">{reason}</Label>
                </div>
              ))}
            </RadioGroup>
            
            {blockReason === "Other" && (
              <div className="mt-4">
                <Label htmlFor="otherReason" className="text-white">Please specify:</Label>
                <Textarea
                  id="otherReason"
                  placeholder="Tell us why you want to block this article..."
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="mt-2 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={submitBlockRequest}
              disabled={blockReason === "Other" && otherReason.trim() === ""}
            >
              Block Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
  
export default ArticleCard;
