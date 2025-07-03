import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setAllAdminJobs } from '@/redux/jobSlice'; // Optional: if you want to refresh after delete

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter(job => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const deleteJob = async (jobId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this job?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true,
            });
            toast.success('Job deleted successfully');

            // Optional: update local state or re-fetch
            const updatedJobs = allAdminJobs.filter(job => job._id !== jobId);
            dispatch(setAllAdminJobs(updatedJobs)); // if you're managing jobs in Redux
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete job');
        }
    };

    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-xl">
            <Table className="text-sm">
                <TableCaption className="text-gray-600 py-4 font-medium">
                    A list of your recently posted jobs.
                </TableCaption>
                <TableHeader className="bg-indigo-600">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-white font-semibold">Company</TableHead>
                        <TableHead className="text-white font-semibold">Role</TableHead>
                        <TableHead className="text-white font-semibold">Posted On</TableHead>
                        <TableHead className="text-white font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs?.map(job => (
                        <TableRow
                            key={job._id}
                            className="hover:bg-indigo-50/50 transition-all duration-200 group"
                        >
                            <TableCell className="font-medium text-gray-800">
                                {job?.company?.name || 'N/A'}
                            </TableCell>
                            <TableCell className="text-indigo-600 font-medium">
                                {job?.title}
                            </TableCell>
                            <TableCell className="text-gray-600">
                                {job?.createdAt?.split('T')[0]}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-indigo-700 transition" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 bg-white border border-gray-200 rounded-xl p-2 shadow-xl space-y-1">
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-700 px-3 py-2 rounded hover:bg-indigo-50 cursor-pointer transition"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>View Applicants</span>
                                        </div>
                                        <div
                                            onClick={() => deleteJob(job._id)}
                                            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-3 py-2 rounded hover:bg-red-50 cursor-pointer transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
