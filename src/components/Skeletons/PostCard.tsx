import React from "react";

// Sekeleton loader for Poast card
const PostCard: React.FC = () => {
    return (
        <div className="mb-2 relative bg-gray-100 border border-gray-300 rounded-lg overflow-hidden animate-pulse">
            <div className="flex items-center justify-between m-4">
                <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover antialiased leading-relaxed bg-gray-300 " />
                    <section className="ml-2">
                        <div className="block antialiased leading-relaxed bg-gray-300 rounded-full h-3 w-20" />
                        <div className="mt-1 block antialiased leading-relaxed bg-gray-300 rounded-full h-2 w-14" />
                    </section>
                </div>
            </div>
            <div className="w-64 h-3 sm:w-64 sm:h-3 md:w-64 md:h-3 my-4 mx-2 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
            <section className='flex mb-2 ml-2'>
                <div className="w-16 h-3 sm:w-16 sm:h-3 md:w-16 md:h-3 mr-2 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
                <div className="w-16 h-3 sm:w-16 sm:h-3 md:w-16 md:h-3 mr-2 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
                <div className="w-16 h-3 sm:w-16 sm:h-3 md:w-16 md:h-3 mr-2 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
            </section>
            <div className="w-full h-6 sm:w-full sm:h-6 md:w-full md:h-96 object-cover antialiased leading-relaxed bg-gray-300" />
            <div className="w-64 h-3 sm:w-64 sm:h-3 md:w-64 md:h-3 my-4 mx-2 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
        </div>
    );
};

export default PostCard;
