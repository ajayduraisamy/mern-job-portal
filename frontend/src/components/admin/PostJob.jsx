import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200">
            <Navbar />
            <div className="flex justify-center items-start pt-28 px-4">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
                    <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                         Post a New Job
                    </h1>
                    <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Title', name: 'title' },
                            { label: 'Description', name: 'description' },
                            { label: 'Requirements', name: 'requirements' },
                            { label: 'Salary', name: 'salary' },
                            { label: 'Location', name: 'location' },
                            { label: 'Job Type', name: 'jobType' },
                            { label: 'Experience Level', name: 'experience' },
                            { label: 'No. of Positions', name: 'position', type: 'number' },
                        ].map((field, i) => (
                            <div key={i}>
                                <Label className="text-sm font-medium text-gray-700">{field.label}</Label>
                                <Input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    className="mt-1 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400 transition rounded-lg shadow-sm"
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div>
                                <Label className="text-sm font-medium text-gray-700">Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="mt-1 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm">
                                        <SelectValue placeholder="Choose a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </form>

                    {loading ? (
                        <Button className="w-full mt-8 bg-indigo-600 text-white hover:bg-indigo-700">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Posting...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            onClick={submitHandler}
                            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        >
                            Post New Job
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-center text-sm text-red-600 mt-4 font-semibold">
                            ⚠️ Please register a company first before posting jobs.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostJob;
