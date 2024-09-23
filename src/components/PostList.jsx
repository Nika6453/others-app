import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPost from "./LoadingPost";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://f076312796667bfa.mokky.dev/post`); 
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div class="all-news-block">
            {isLoading ? (
                <LoadingPost />
            ) : (
                <div>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostList;