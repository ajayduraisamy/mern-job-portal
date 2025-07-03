import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create company.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
            <Navbar />
            <div className='max-w-4xl mx-auto pt-28 px-6'>
                <div className='mb-12'>
                    <h1 className='text-4xl font-extrabold text-teal-300 drop-shadow-sm mb-2'>Create Your Company</h1>
                    <p className='text-md text-blue-200'>
                        Pick a professional name for your company. You can change it later.
                    </p>
                </div>

                <div className="mb-6">
                    <Label className="text-white text-sm">Company Name</Label>
                    <Input
                        type="text"
                        className="mt-2 bg-[#1a1f2b] text-white border border-cyan-500 placeholder:text-cyan-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500"
                        placeholder="e.g., Microsoft, JobHunt"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className='flex items-center gap-3 mt-10'>
                    <Button
                        variant="outline"
                        className="border border-red-500 text-red-300 hover:bg-red-500/10 hover:text-white-500 font-semibold"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;
