import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='min-h-screen bg-purple-200 border border-purple-300 shadow-xl rounded-2xl p-8 transition-all hover:shadow-2xl'>
            <Navbar />

            {/* Profile Card */}
            <div className='max-w-4xl mx-auto mt-24 bg-white border border-purple-300 shadow-xl rounded-2xl p-8 transition-all hover:shadow-2xl'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-24 w-24 ring-2 ring-black">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || `https://ui-avatars.com/api/?name=${user.fullname}`}
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className='text-2xl font-bold text-black'>{user?.fullname}</h1>
                            <p className='text-md font-semibold text-black'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right border border-black" variant="outline">
                        <Pen />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className='mt-6 text-purple-900 font-semibold space-y-2'>
                    <div className='flex items-center gap-3'>
                        <Mail className='text-black' />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact className='text-black' />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='mt-8 bg-indigo-100 rounded-xl p-4'>
                    <h2 className='text-lg font-bold text-indigo-900 mb-2'>Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {
                            Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0
                                ? user.profile.skills.map((item, index) => (
                                    <Badge key={index} className="bg-indigo-300 hover:bg-indigo-400 text-indigo-900 font-semibold cursor-pointer">
                                        {item}
                                    </Badge>
                                ))
                                : <span className="text-gray-700">NA</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className='mt-6 bg-blue-100 rounded-xl p-4'>
                    <Label className="text-md font-bold text-blue-900 ">Resume</Label>
                    <a
                        target="_blank"
                        href={`http://localhost:3000${user?.profile?.resume}`}
                        className="block text-blue-700 font-semibold hover:underline mt-1"
                    >
                        Download Resume
                    </a>
                </div>
            </div>

            {/* Applied Jobs Card */}
            <div className='max-w-4xl mx-auto bg-green-100 hover:bg-green-200 text-green-900 border border-green-300 rounded-2xl p-8 mt-8 shadow-md'>
                <h1 className='text-xl font-bold mb-4 text-center'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
