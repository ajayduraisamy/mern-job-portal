import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const [loading, setLoading] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null
        });
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f9e4c2] via-[#f0f4ff] to-[#e0f7fa] text-gray-800">
            <Navbar />
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-6 mt-10">
                    <form
                        onSubmit={submitHandler}
                        className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <Button
                                onClick={() => navigate("/admin/companies")}
                                type="button"
                                variant="ghost"
                                className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-600 rounded-xl px-4 py-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm">Back</span>
                            </Button>

                            <div className="w-full text-center">
                                <h1 className="text-2xl font-bold text-indigo-600">
                                    ✏️ Edit Company Info
                                </h1>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label className="text-sm text-gray-700">Company Name</Label>
                                <Input
                                    className="mt-2 bg-white border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl shadow-sm"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div>
                                <Label className="text-sm text-gray-700">Description</Label>
                                <Input
                                    className="mt-2 bg-gray-50 border border-gray-300 focus:ring-purple-500 focus:border-purple-500 rounded-xl"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div>
                                <Label className="text-sm text-gray-700">Website</Label>
                                <Input
                                    className="mt-2 bg-white border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div>
                                <Label className="text-sm text-gray-700">Location</Label>
                                <Input
                                    className="mt-2 bg-gray-50 border border-gray-300 focus:ring-teal-500 focus:border-teal-500 rounded-xl"
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <Label className="text-sm text-gray-700">Upload Company Logo</Label>
                            <Input
                                className="mt-2 bg-white border border-gray-300 file:text-indigo-600 rounded-xl"
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>

                        {loading ? (
                            <Button
                                disabled
                                className="w-full mt-10 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl"
                            >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full mt-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                            >
                                Update Company
                            </Button>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CompanySetup;
