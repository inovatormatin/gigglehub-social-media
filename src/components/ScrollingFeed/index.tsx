import React, { useEffect, useState, useRef, useCallback } from 'react';
import supabase from '../../configs/supabaseClient';
import Cookies from 'universal-cookie';
import { PostType } from '../../types';
import PostComp from "../Post"
import { Nomorecard, PostCardSkeleton } from '../index';

// Cookie setup
const cookies = new Cookies();

interface FetchError {
    message: string;
}

const GetPosts: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true); // For detecting if there are more posts
    const offset = useRef(0); // Keeps track of pagination offset

    const LIMIT = 4; // Number of posts to fetch per request

    // Fetch posts from Supabase
    const fetchPosts = useCallback(async () => {
        const userId = cookies.get('i06');
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.rpc('get_prioritized_posts', {
                limit_posts: LIMIT,
                offset_posts: offset.current,
                user_id: userId,
            });

            if (error) {
                throw new Error(error.message);
            }

            if (data.length < LIMIT) {
                setHasMore(false); // No more data to fetch
            }

            setPosts((prevPosts) => [...prevPosts, ...data]); // Append new posts to the existing ones
            offset.current += LIMIT; // Increment offset
        } catch (err: unknown) {
            const typedError = err as FetchError;
            setError(typedError.message || 'An error occurred while fetching posts.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Infinite Scroll logic
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchPosts(); // Fetch more posts when the last one is visible
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, fetchPosts]
    );

    // Initial fetch
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                {posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        // Attach ref to the last post for infinite scrolling
                        return (
                            <PostComp
                                key={index}
                                data={post}
                                reffs={lastPostRef}
                            />
                        );
                    } else {
                        return (
                            <PostComp
                                key={index}
                                data={post}
                            />
                        );
                    }
                })}
            </div>
            {/* this will show the loader while fetching the data */}
            {loading && <PostCardSkeleton />}
            {/* this will tell the user that there are no more posts */}
            {!hasMore && !loading && <Nomorecard />}
        </div>
    );
};

export default GetPosts;
