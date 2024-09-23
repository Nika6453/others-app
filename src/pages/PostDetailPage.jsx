import backIcon from "../assets/tripaloski/Vector.svg"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingDetail from "../components/LoadingDetail";

function PostDetailPage () {

    const {id} = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://f076312796667bfa.mokky.dev/post/${id}`);
                setPost(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    return(
        <section class="mobile-block">
            <Link to="/" class="back-button">
                <div class="container">
                    <img src={backIcon} alt="Back Button" />
                    Назад
                </div>
            </Link>
            {isLoading ? (<LoadingDetail />) : (
                <div class="container">
                    <div class="post-detail-block">
                        <h3 class="news-card_title">{post.title}</h3>
                        <span class="news-card_date">{post.date}</span>
                        <p class="description">{post.description}</p>
                        <img src={post.imageUrl} alt={post.title} />
                    </div>
                </div>
            )}
        </section>
    );
}

export default PostDetailPage;