import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies(); // custom hook to fetch companies
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-indigo-100 to-blue-200 text-gray-800">
            <Navbar />

            <section className="py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    {/* Search + Button */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <Input
                            className="w-full md:w-80 bg-white shadow-md border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="🔍 Filter companies by name"
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <Button
                            onClick={() => navigate('/admin/companies/create')}
                            className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-5 py-2 rounded-md font-semibold hover:from-teal-600 hover:to-blue-600 transition"
                        >
                            ➕ New Company
                        </Button>
                    </div>

                    {/* Table Box */}
                    <div className="bg-[#0f172a] text-white border border-gray-700 rounded-xl shadow-lg p-6">
                        <CompaniesTable />
                    </div>

                </div>
            </section>
        </div>
    
    );
};

export default Companies;
