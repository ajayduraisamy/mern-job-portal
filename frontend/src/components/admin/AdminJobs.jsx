import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { Plus } from 'lucide-react';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#dbeafe] text-gray-800">
      <Navbar />
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5 mt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <Input
              className="w-full md:w-96 bg-white border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-md rounded-xl px-4 py-2 text-sm"
              placeholder="🔍 Filter by job title, company..."
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              onClick={() => navigate('/admin/jobs/create')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Job</span>
            </Button>
          </div>

          <div className="mx-auto max-w-5xl bg-gradient-to-br from-indigo-400 via-blue-400 via-purple-400 to-pink-300 rounded-2xl shadow-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2 justify-center">
              📋 Job Listings
            </h2>
            <AdminJobsTable />
          </div>

        </div>
      </section>
    </div>
  );
};

export default AdminJobs;
