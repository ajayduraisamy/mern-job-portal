import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter(job =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            )
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 mt-20">
                <section className="flex gap-6">
                    {/* Filter Card */}
                    <div className="w-full md:w-1/4 bg-white shadow-md rounded-xl p-4 border border-gray-200">
                        <FilterCard />
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1 h-[80vh] overflow-y-auto pb-4">
                        {filterJobs.length <= 0 ? (
                            <div className="text-center text-gray-500 font-medium">
                                No jobs found.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterJobs.map(job => (
                                    <motion.div
                                        key={job?._id}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -40 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Jobs
