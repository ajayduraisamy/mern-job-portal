import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) formData.append('file', input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Signup failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) navigate('/');
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f4f0ff] to-white dark:from-gray-900 dark:to-black">
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto flex items-center justify-center">

            
                <form
                    onSubmit={submitHandler}
                    className="w-full md:w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-xl transition"
                >
                    <h1 className="text-2xl font-bold text-center text-[#6A38C2] mb-6">
                        Create an Account
                    </h1>

                    {/* Full Name */}
                    <div className="my-3">
                        <Label className="text-sm">Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="hover:ring-2 hover:ring-[#6A38C2] focus:border-[#6A38C2]"
                        />
                    </div>

                    {/* Email */}
                    <div className="my-3">
                        <Label className="text-sm">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email address"
                            className="hover:ring-2 hover:ring-[#6A38C2] focus:border-[#6A38C2]"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="my-3">
                        <Label className="text-sm">Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                            className="hover:ring-2 hover:ring-[#6A38C2] focus:border-[#6A38C2]"
                        />
                    </div>

                    {/* Password */}
                    <div className="my-3">
                        <Label className="text-sm">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="hover:ring-2 hover:ring-[#6A38C2] focus:border-[#6A38C2]"
                        />
                    </div>

                    {/* Role and File Upload */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
                        <RadioGroup className="flex gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className="cursor-pointer">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center gap-2">
                            <Label className="text-sm">Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer file:cursor-pointer file:bg-[#6A38C2] file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        {loading ? (
                            <Button className="w-full bg-[#6A38C2] hover:bg-[#542aa3]">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full bg-[#6A38C2] hover:bg-[#542aa3] transition"
                            >
                                Signup
                            </Button>
                        )}
                    </div>

                    <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#6A38C2] font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
