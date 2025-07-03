import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 cursor-pointer group"
        >
            {/* Company Info */}
            <div className="mb-2">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-[#6A38C2] transition">
                    {job?.company?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job?.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">{job?.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-700">
                    {job?.position} Positions
                </Badge>
                <Badge className="bg-orange-50 text-orange-600 dark:bg-orange-900 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-700">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-700">
                    ₹ {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
