import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="text-center mt-20 px-4">
            <div className="flex flex-col gap-6">
                {/* Badge */}
                <span className="mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold text-sm shadow-md">
                    🚀 No. 1 Job Hunt Website
                </span>

                {/* Title */}
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                    Search, Apply & <br />
                    Get Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6A38C2] to-[#F83002]">Dream Job</span>
                </h1>

                {/* Subtext */}
                <p className="text-gray-500 dark:text-gray-300 max-w-xl mx-auto">
                    Find the perfect role that matches your skills and passion. We connect talent with opportunity.
                </p>

                {/* Search Bar */}
                <div className="flex w-full max-w-xl mx-auto shadow-md border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#6A38C2] transition">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-5 py-3 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-none rounded-r-full bg-[#6A38C2] hover:bg-[#582fa6] transition duration-300 px-7"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
