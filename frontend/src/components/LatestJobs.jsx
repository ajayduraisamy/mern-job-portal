import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 my-20">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
                    <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
                </h1>
                <div className="w-24 h-1 bg-[#6A38C2] mx-auto mt-2 rounded-full"></div>
            </div>

            {allJobs.length <= 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                    <p className="text-2xl font-semibold text-red-500">No jobs available at the moment. Please check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestJobs;
