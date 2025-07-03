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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pt-32 px-4 max-w-7xl mx-auto flex items-center justify-center">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-lg border border-gray-200 bg-white shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl"
                >
                    <h1 className="text-2xl text-center text-center font-extrabold bg-gradient-to-r from-[black] to-[orange] text-transparent bg-clip-text mb-6">
                        Login to Your Account
                    </h1>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-gray-700">Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Enter your email address"
                                className="focus:ring-2 focus:ring-[#6A38C2]"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className="focus:ring-2 focus:ring-[#F83002]"
                            />
                        </div>

                        <RadioGroup className="flex items-center gap-6 my-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Student</Label>
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
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>

                        {loading ? (
                            <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white hover:opacity-90">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white hover:scale-[1.02] transition-transform duration-300"
                            >
                                Login
                            </Button>
                        )}

                        <p className="text-sm text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-[#6A38C2] hover:underline font-medium">
                                Signup
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
