import React from 'react';
import { motion } from 'framer-motion';

const ArticleCardSkeleton : React.FC= () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-6"
    >
      {/* Image skeleton */}
      <div className="relative w-full h-64 overflow-hidden">
        <div className="w-full h-64 bg-gray-800 animate-pulse" />
      </div>

      <div className="p-6">
        {/* Author and category skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {/* Avatar skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
            <div>
              {/* Author name skeleton */}
              <div className="h-4 w-32 bg-gray-800 animate-pulse rounded mb-2" />
              {/* Category badge skeleton */}
              <div className="h-5 w-20 bg-gray-800 animate-pulse rounded" />
            </div>
          </div>
        </div>
          
        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-gray-800 animate-pulse rounded mb-4" />
        
        {/* Description skeleton - multiple lines */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-800 animate-pulse rounded w-full" />
          <div className="h-4 bg-gray-800 animate-pulse rounded w-11/12" />
          <div className="h-4 bg-gray-800 animate-pulse rounded w-4/5" />
        </div>
          
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-800 animate-pulse rounded" />
          <div className="h-6 w-20 bg-gray-800 animate-pulse rounded" />
          <div className="h-6 w-24 bg-gray-800 animate-pulse rounded" />
        </div>
          
        {/* Action buttons skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Like button skeleton */}
            <div className="h-8 w-16 bg-gray-800 animate-pulse rounded" />
            
            {/* Dislike button skeleton */}
            <div className="h-8 w-16 bg-gray-800 animate-pulse rounded" />
            
            {/* Block button skeleton */}
            <div className="h-8 w-20 bg-gray-800 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCardSkeleton;