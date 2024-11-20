import React from "react";
import PostSection from "./PostSection";
import Profile from "./Profile";
import Suggestion from "./Suggestion";
import { Header } from "../../components";

const Feed: React.FC = () => {
  return (
    <div className="max-w-6xl m-auto h-screen over overflow-hidden">
      {/* Header */}
      <Header />

      {/* main content */}
      <div className="m-auto flex flex-row">
        {/* Profile Section */}
        <div className="flex-1 z-1 basis-1/4 m-2 h-full overflow-y-auto scrollbar-none">
          <div
            className="h-full"
            style={{
              height: "calc(100vh - 80px)",
            }}
          >
            <Profile />
          </div>
        </div>
        {/* Feed Section */}
        <div className="flex-2 z-1 basis-2/3 my-2 h-full overflow-y-auto scrollbar-none">
          <div
            className="h-full"
            style={{
              height: "calc(100vh - 80px)",
            }}
          >
            <PostSection />
          </div>
        </div>
        {/* Suggestion Section */}
        <div className="flex-1 z-1 basis-1/3 m-2 h-full overflow-y-auto scrollbar-none">
          <div
            className="h-full"
            style={{
              height: "calc(100vh - 80px)",
            }}
          >
            <Suggestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
