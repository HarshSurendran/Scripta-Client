import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/services/auth';
import { login as loginAction } from '@/redux/slice/userSlice';
import { useDispatch } from 'react-redux';

interface LoginFormData {
  identifier: string; // can be email or phone
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: ''
  });  
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const validateForm = (): boolean => {
      const newErrors: Partial<LoginFormData> = {};
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
  
      if (!formData.identifier.trim()) {
        newErrors.identifier = "Email or phone number is required";
      } else if (
        !emailRegex.test(formData.identifier) && 
        !phoneRegex.test(formData.identifier)
      ) {
        newErrors.identifier = "Invalid email or phone number";
      }
  
      if (!formData.password) newErrors.password = "Password is required";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
  const handleSubmit = async (e: React.FormEvent) => {      
    try {
        console.log("Form data", formData);
        e.preventDefault();
        if (validateForm()) {
          const response = await login(formData.identifier, formData.password);
          if (response.success) {
            localStorage.setItem("userToken", response.data.userToken)
            dispatch(loginAction(response.data.user));
            navigate('/dashboard');
          }
          console.log("Login form is valid", formData);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-900 text-white border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-center text-4xl text-white">Scripta</CardTitle>
              <CardTitle className="text-center text-2xl text-white">Login</CardTitle>
              <CardDescription className="text-center text-gray-400">Access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="identifier" className="text-white">Email or Phone Number</Label>
                  <Input 
                    type="text" 
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    className="bg-gray-800 text-white border-gray-700 mt-1" 
                  />
                  {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier}</p>}
                </div>
  
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800 text-white border-gray-700 mt-1"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
  
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  Login
                </Button>
                        </form>
                        <p className='mt-4'>Don't have an accout? 
                            <Link to="/signup" className="text-blue-500 hover:underline"> SignUp</Link>
                        </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
};
  

  export default Login;