import React from 'react'

// This is skeleton for Profile card
const ProfileCardSkeleton: React.FC = () => {
    return (
        <div className="relative bg-gray-200 border border-gray-300 rounded-lg p-4 flex flex-col items-center animate-pulse">
            <div className="my-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover antialiased leading-relaxed bg-gray-300 " />
            <section className="flex flex-col items-center mb-4">
                <div className="block antialiased leading-relaxed bg-gray-300 rounded-full h-3 w-32" />
                <div className="mt-2 antialiased leading-relaxed bg-gray-300 rounded-full h-2 w-16" />
            </section>
            <section className="flex flex-col items-center mb-2">
                <div className="block antialiased leading-relaxed bg-gray-300 rounded-full h-3 w-32" />
                <div className="mt-2 antialiased leading-relaxed bg-gray-300 rounded-full h-2 w-16" />
            </section>
            <section className="w-full flex justify-evenly mb-2">
                <div className="mt-2 antialiased leading-relaxed bg-gray-300 rounded-full h-2 w-16" />
                <div className="mt-2 antialiased leading-relaxed bg-gray-300 rounded-full h-2 w-16" />
            </section>
            <div className="mt-2 w-20 h-6 sm:w-22 sm:h-7 md:w-24 md:h-8 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
        </div>
    )
}

export default ProfileCardSkeleton