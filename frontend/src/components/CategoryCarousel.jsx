import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer", "Mobile App Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "UI/UX Designer", "Product Manager", "Sales and Marketing"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="my-24">
            <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Explore by <span className="text-[#6A38C2]">Categories</span>
            </h2>

            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-3 py-4">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full px-6 py-3 text-sm font-medium transition duration-300 ease-in-out
                           bg-gradient-to-tr from-[#6A38C2] to-[#F83002] text-white hover:brightness-110 shadow-lg hover:scale-105"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hover:scale-105" />
                <CarouselNext className="hover:scale-105" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
