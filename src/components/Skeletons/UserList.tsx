import React from "react";

// This is skeleton for user list 
const UserList: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover antialiased leading-relaxed bg-gray-300 " />
        <section className="ml-2">
          <div className="block antialiased leading-relaxed bg-gray-300 rounded-full h-3 w-20" />
          <div className="mt-1 block antialiased leading-relaxed bg-gray-300 rounded-full h-2 w-14" />
        </section>
      </div>
      <div className="w-16 h-6 sm:w-14 sm:h-6 md:w-16 md:h-7 rounded-md object-cover antialiased leading-relaxed bg-gray-300" />
    </div>
  );
};

export default UserList;
