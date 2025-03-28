import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { alterInterestedCategories, getAllCategories } from '@/services/user';
import { useDispatch } from 'react-redux';
import { addInterestCategories } from '@/redux/slice/userSlice';
import { Category } from '@/types/categoryTypes';

const CategorySelectionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {    
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if(response.success) {
        const data = response.data as Category[];
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map(cat => cat.id));
    }
  };
  
  const handleSubmit = async () => {
    try {
      const response = await alterInterestedCategories(selectedCategories);
      if (response.status === 204) {
        dispatch(addInterestCategories({ interestedCategories: selectedCategories }));
        setIsOpen(false);
      } else {
        console.log("Error in category selection");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseButtonClick = () => {
    console.log("CLicked close button")
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => { handleCloseButtonClick() }} modal={true}>
      <DialogContent
        className="max-w-md w-full p-6 bg-white dark:bg-black border border-black dark:border-white"
      >
                  
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black dark:text-white text-center">
            Hey! Welcome to Scripta
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300 mb-4">
            Please let us know your interests, choose the categories that excite you most
          </DialogDescription>
        </DialogHeader>
  
        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-6 overflow-y-scroll overflow-x-hidden  max-h-96"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <label
                className={`
                    flex items-center space-x-2 p-3 rounded-lg cursor-pointer 
                    transition-colors duration-200
                    ${selectedCategories.includes(category.name)
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'}
                  `}
              >
                <Checkbox
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryToggle(category.name)}
                  className="border-white dark:border-black"
                />
                <span className="font-medium">{category.name}</span>
              </label>
            </motion.div>
          ))}
        </motion.div>
  
        {/* Select All and Submit Actions */}
        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            onClick={handleSelectAll}
            className="w-full border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {selectedCategories.length === categories.length
              ? 'Deselect All'
              : 'Select All'}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0}
            className="w-full bg-black text-white dark:bg-white dark:text-black 
                         hover:bg-gray-800 dark:hover:bg-gray-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue ({selectedCategories.length}/{categories.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
  
  export default CategorySelectionModal;
  