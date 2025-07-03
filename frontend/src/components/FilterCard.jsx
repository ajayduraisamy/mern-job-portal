import { setSearchedQuery } from '@/redux/jobSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Chennai", "Hyderabad", "Pune", "Mumbai", "Kolkata", "Ahmedabad", "Lucknow", "Indore"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Mobile App Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "UI/UX Designer", "Product Manager", "Sales and Marketing"]
    },

]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard