import React from "react";
import moment from "moment";
import { PostType } from "../../types";

interface Fprops {
    data: PostType,
    reffs?: (node: HTMLDivElement | null) => void // adding ref props for getting bottom hit
}

// this componet is post card and can be reused.
const Post: React.FC<Fprops> = ({ data, reffs }) => {
    const { caption, created_at, firstname, image_url, lastname, mention, profile_pic, tags, username } = data;
    return (
        <div className="mb-2 relative bg-gray-100 border border-gray-300 rounded-lg overflow-hidden" ref={reffs}>
            {/* User Details */}
            <div className='flex items-center p-4'>
                <img className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover' src={`${process.env.REACT_APP_SUPABASE_IMAGE_URI}${profile_pic}`} alt={firstname} />
                <section className='ml-2'>
                    <h1 className='text-sm font-medium'>{`${firstname} ${lastname}`}</h1>
                    <h2 className='text-xs font-normal'>{username}</h2>
                </section>
            </div>
            {/* Post information */}
            <section>
                {caption && <h2 className="px-4">{caption}</h2>}
                <div className="px-2 my-2 flex">
                    {/* Tags */}
                    {tags.map((item, index) => (
                        <span
                            key={index}
                            className="bg-slate-300 font-semibold text-xl text-slate-700 text-xs px-2 py-1 rounded-md m-1 flex items-center"
                        >
                            {`#${item}`}
                        </span>
                    ))}
                </div>
                {image_url && <img className="pb-4 w-full text-lg" src={`${process.env.REACT_APP_SUPABASE_IMAGE_URI}${image_url}`} alt="couldn't get the image." />}
            </section>
            {/* user mentions */}
            <div className="absolute right-1 bottom-14 flex">
                {mention.map((item, index) => (
                    <span
                        key={index}
                        className="bg-gray-800 font-semibold text-xl text-white text-xs px-2 py-1 rounded-md m-1 flex items-center"
                    >
                        {`@${item}`}
                    </span>
                ))}
            </div>
            {/* Time stamps */}
            <h5 className="px-4 pb-4 text-xs font-normal">{`Posted on ${moment(created_at).format('DD-MMM-YYYY hh:mm a')}`}</h5>
        </div>
    );
};

export default Post;
