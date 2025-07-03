import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied =
        singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some((application) => application.applicant === user?._id)
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='mt-10'>
            <Navbar />
        <div className='min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-10 px-4'>
            <div className='max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10'>
                {/* Header */}
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-extrabold text-gray-900'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap gap-3 mt-4'>
                            <Badge className='bg-blue-100 text-blue-700 font-semibold'>{singleJob?.position} Positions</Badge>
                            <Badge className='bg-red-100 text-red-700 font-semibold'>{singleJob?.jobType}</Badge>
                            <Badge className='bg-purple-100 text-purple-700 font-semibold'>{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg text-white font-semibold px-6 py-2 transition-all duration-300 ${isApplied
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                            }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Divider */}
                <h2 className='mt-8 border-b-2 border-gray-300 pb-2 text-lg font-semibold text-gray-800'>Job Details</h2>

                {/* Job Info */}
                <div className='mt-6 space-y-4 text-gray-700'>
                    <p><span className='font-bold'>Role:</span> <span className='pl-2'>{singleJob?.title}</span></p>
                    <p><span className='font-bold'>Location:</span> <span className='pl-2'>{singleJob?.location}</span></p>
                    <p><span className='font-bold'>Description:</span> <span className='pl-2'>{singleJob?.description}</span></p>
                    <p><span className='font-bold'>Experience:</span> <span className='pl-2'>{singleJob?.experienceLevel} yrs</span></p>
                    <p><span className='font-bold'>Salary:</span> <span className='pl-2'>{singleJob?.salary} LPA</span></p>
                    <p><span className='font-bold'>Total Applicants:</span> <span className='pl-2'>{singleJob?.applications?.length}</span></p>
                    <p><span className='font-bold'>Posted On:</span> <span className='pl-2'>{singleJob?.createdAt?.split("T")[0]}</span></p>
                </div>

                {/* Requirements */}
                {Array.isArray(singleJob?.requirements) && singleJob.requirements.length > 0 && (
                    <>
                        <h2 className='mt-10 text-lg font-semibold text-gray-800'>Requirements</h2>
                        <div className='flex flex-wrap gap-2 mt-2'>
                            {singleJob.requirements.map((req, index) => (
                                <Badge key={index} className='bg-yellow-100 text-yellow-800 font-medium'>{req.trim()}</Badge>
                            ))}
                        </div>
                    </>
                )}
            </div>
            </div>
        </div>
    );
};

export default JobDescription;
