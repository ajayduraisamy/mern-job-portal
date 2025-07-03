import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCaption, TableCell,
    TableHead, TableHeader, TableRow
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCompany } from '@/redux/companySlice';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filtered = companies?.filter(company =>
            !searchCompanyByText || company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        );
        setFilteredCompanies(filtered || []);
    }, [companies, searchCompanyByText]);

    const handleDelete = async (companyId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/v1/company/delete/${companyId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const contentType = res.headers.get('content-type');
            const data = contentType?.includes('application/json') ? await res.json() : null;

            if (!res.ok) {
                alert(`Failed to delete: ${data?.message || res.statusText}`);
                return;
            }

            setFilteredCompanies(prev => prev.filter(c => c._id !== companyId));
            dispatch(removeCompany(companyId));
            alert('Company deleted successfully');
        } catch (err) {
            alert('Error deleting company: ' + err.message);
        }
    };

    return (
        <div className="overflow-x-auto bg-[#0f172a] text-white rounded-xl p-4 shadow-xl border border-indigo-700">
            <Table className="text-white">
                <TableCaption className="text-base text-indigo-300 py-4 font-medium">
                    ⚡ Explore recently registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800">
                        <TableHead className="text-white uppercase px-4 py-3 tracking-wider">Logo</TableHead>
                        <TableHead className="text-white uppercase px-4 py-3 tracking-wider">Company</TableHead>
                        <TableHead className="text-white uppercase px-4 py-3 tracking-wider">Date</TableHead>
                        <TableHead className="text-white uppercase px-4 py-3 tracking-wider text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredCompanies?.map(company => (
                        <TableRow
                            key={company._id}
                            className="hover:bg-indigo-800/20 transition duration-200"
                        >
                            <TableCell className="py-3 px-4">
                                <Avatar className="w-14 h-13 ring-2 ring-indigo-400 shadow-md">
                                    <AvatarImage src={`http://localhost:3000${company.logo}`} />
                                </Avatar>
                            </TableCell>

                            <TableCell className="py-3 px-4 font-bold text-white-600">
                                {company.name}
                            </TableCell>

                            <TableCell className="py-3 px-4 font-bold text-white-600">
                                {company.createdAt?.split("T")[0]}
                            </TableCell>

                            <TableCell className="py-3 px-4 text-right">
                                <Popover>
                                    <PopoverTrigger className="hover:text-pink-400">
                                        <MoreHorizontal className="w-5 h-5 text-indigo-400 hover:text-purple-300 transition" />
                                    </PopoverTrigger>

                                    <PopoverContent className="w-44 bg-[#1e1b4b] border border-indigo-700 text-white rounded-md shadow-md p-2 space-y-2">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 px-2 py-1 hover:bg-indigo-600/40 rounded-md cursor-pointer"
                                        >
                                            <Edit2 className="w-4 h-4 text-indigo-300" />
                                            <span className="text-sm">Edit</span>
                                        </div>

                                        <div
                                            onClick={() => handleDelete(company._id)}
                                            className="flex items-center gap-2 px-2 py-1 hover:bg-red-600/30 rounded-md cursor-pointer text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="text-sm">Delete</span>
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

export default CompaniesTable;
