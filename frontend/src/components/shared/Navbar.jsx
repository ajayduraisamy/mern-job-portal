import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#111827] border-b border-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between text-white">
                <Link to='/'>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Online Job<span className="text-orange-500"> Portal</span>
                    </h1>
                </Link>

                <nav className="flex items-center gap-10">
                    <ul className="flex gap-6 text-sm font-medium">
                        {user ? (
                            user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className="hover:text-orange-500 transition-colors">Companies</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className="hover:text-orange-500 transition-colors">Jobs</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className="hover:text-orange-500 transition-colors">Jobs</Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className="hover:text-orange-500 transition-colors">Browse</Link>
                                    </li>
                                </>
                            )
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="hover:text-orange-500 transition-colors">Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="hover:text-orange-500 transition-colors">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border border-gray-600 hover:ring-2 hover:ring-orange-500 transition-all">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${user.fullname}`}
                                        alt="profile"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-[#1f2937] border-gray-700 text-white">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${user.fullname}`}
                                            alt="profile"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-4">
                                    {user.role === 'student' && (
                                        <Link to="/profile">
                                            <Button variant="link" className="text-sm text-white hover:text-orange-500 flex items-center gap-2">
                                                <User2 className="w-4 h-4" />
                                                View Profile
                                            </Button>
                                        </Link>
                                    )}
                                    <Button onClick={logoutHandler} variant="link" className="text-sm text-white hover:text-orange-500 flex items-center gap-2 mt-1">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
