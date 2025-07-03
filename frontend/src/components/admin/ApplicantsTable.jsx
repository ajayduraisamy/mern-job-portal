import React from 'react'
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
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
            console.log(res.data);
            console.log(item);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Status update failed');
        }
    };

    return (
        <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-2xl bg-white">
            <Table className="text-sm w-full">
                <TableCaption className="text-gray-600 py-4 font-medium">
                    A list of your recently applied users
                </TableCaption>

                <TableHeader className="bg-blue-600">
                    <TableRow className="hover:bg-blue-600">
                        <TableHead className="text-white font-bold">Full Name</TableHead>
                        <TableHead className="text-white font-bold">Email</TableHead>
                        <TableHead className="text-white font-bold">Contact</TableHead>
                        <TableHead className="text-white font-bold">Resume</TableHead>
                        <TableHead className="text-white font-bold">Date</TableHead>
                        <TableHead className="text-white font-bold text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applicants?.applications?.map((item) => (
                            <TableRow
                                key={item._id}
                                className="hover:bg-orange-100 transition duration-200"
                            >
                                <TableCell className="text-gray-800 font-medium">
                                    {item?.applicant?.fullname}
                                </TableCell>
                                <TableCell className="text-gray-700">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-700">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    <a
                                        href={`http://localhost:3000${item?.applicant?.profile?.resume}`} // ✅ Backend server
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName || "Download Resume"}
                                    </a>

                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {item?.applicant?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-blue-600 transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white shadow-xl border border-gray-200 rounded-xl py-1">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className="px-3 py-2 hover:bg-orange-100 rounded cursor-pointer text-sm text-gray-700"
                                                    >
                                                        {status}
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default ApplicantsTable;
