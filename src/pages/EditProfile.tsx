import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Edit, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProfileEditProps {
  initialData?: {
    firstName: string;
    lastName: string;
    dob: string;
    interestedCategory: string[];
  };
  onSave?: (data: any) => void;
}

const EditProfile: React.FC<ProfileEditProps> = ({ 
  initialData = {
    firstName: '',
    lastName: '',
    dob: '',
    interestedCategory: ["Technology"]
  },
  onSave 
}) => {
  const [profileData, setProfileData] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    dob: initialData.dob,
    interestedCategory: initialData.interestedCategory
  });
    


  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    onSave?.(profileData);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    setPasswordError('');
    onSave?.({ password: passwordData.newPassword });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    };
    
    const handleCategoryChange = (category: string) => {
        console.log(profileData, category)
      setProfileData(prev => ({
        ...prev,
        interestedCategory: prev.interestedCategory.includes(category)
          ? prev.interestedCategory
          : [...prev.interestedCategory, category]
      }));
    };

    const removeInterestedCategory = (category: string) => {
        setProfileData(prev => ({
            ...prev,
            interestedCategory: prev.interestedCategory.filter(c => c !== category)
        }));
    }

  const interestCategories = [
    'Technology',
    'Sports',
    'Music',
    'Movies',
    'Books',
    'Travel',
    'Food',
    'Gaming'
  ];

  return (
    <div className="min-h-screen  bg-gray-50 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl p-8"
          >
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Edit className="mr-4 text-blue-500" /> Edit Profile
        </h1>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent>
            <div className="grid  gap-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-center mb-4 text-white">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-neutral-300 mb-1">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="bg-neutral-800 border-neutral-700 text-white "
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-neutral-300 mb-1">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob" className="text-neutral-300 mb-1">
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={profileData.dob}
                      onChange={handleProfileChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                                  </div>
                                  
                  <div>
                    <Label htmlFor="interestedCategory" className="text-neutral-300 mb-1">
                      Interested Category
                    </Label>
                    <Select
                     
                      onValueChange={(value) => handleCategoryChange(value)}
                    >
                      <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-neutral-800">
                        {interestCategories.map((category) => (
                          <SelectItem 
                            key={category} 
                            value={category}
                            className="text-white hover:bg-neutral-800"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                                  
            <div className="flex flex-wrap gap-2">
              {profileData.interestedCategory.map(tag => (
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
                    onClick={() => removeInterestedCategory(tag)} 
                    />
                    </button>
                </Badge>
              ))}
            </div>
          

                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Profile
                  </Button>
                </div>
              </div>

              {/* Change Password Section */}
              <div>
                <h3 className="text-lg font-semibold text-center mb-4 text-white">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-neutral-300 mb-1">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="text-neutral-300 mb-1">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-neutral-300 mb-1">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  {passwordError && (
                    <div className="text-red-500 text-sm">
                      {passwordError}
                    </div>
                  )}
                  <Button 
                    onClick={handleChangePassword}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditProfile;