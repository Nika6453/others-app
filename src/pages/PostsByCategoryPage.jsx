import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import LoadingPost from "../components/LoadingPost";

function PostsByCategoryPage() {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState(true);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await axios.get(`https://f076312796667bfa.mokky.dev/category/${id}`);
                setCategory(response.data);
            } catch (error) {
                setError("Failed to load category.");
                console.error(error);
            } finally {
                setIsLoadingCategory(false);
            }
        }

        async function fetchPosts() {
            try {
                const response = await axios.get(`https://f076312796667bfa.mokky.dev/post`);
                setPosts(response.data);
            } catch (error) {
                setError("Failed to load posts.");
                console.error(error);
            } finally {
                setIsLoadingPosts(false);
            }
        }

        fetchCategory();
        fetchPosts();
    }, [id]);

    return (
        <section className="mobile-block">
            <div className="mobile-block_header is-success">
                {isLoadingCategory ? "Loading category..." : category.name}
            </div>
            <div className="all-news-block">
                {isLoadingPosts ? (
                    <LoadingPost />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    posts
                        .filter(post => post.category === category.name)
                        .map(post => (
                            <PostCard key={post.id} post={post} />
                        ))
                )}
            </div>
        </section>
    );
}

export default PostsByCategoryPage;
