import homeIcon from "../assets/tripaloski/categories/all.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingRow from "../components/LoadingRow";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://f076312796667bfa.mokky.dev/category`);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <section class="mobile-block">
            <div class="mobile-block_header is-category">
                Категории
            </div>
            {isLoading ? (
                <LoadingRow />
            ) : (
                <div className="container">
                    <div class="category-row">
                        <Link to="/" class="news-button category-item">
                            <img src={homeIcon} alt="All news" class="category-item_img" />
                            <span class="category-item_title">Все новости</span>
                        </Link>
                        {categories.map((category) => (
                            <Link style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${category.imageUrl})`, backgroundSize:'cover', backgroundPosition:'center'}} key={category.id} to={`/category/posts/${category.id}`} class="games-button category-item">
                                <img src={category.iconUrl} alt={category.name} class="category-item_img" />
                                <span className="category-item_title">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default CategoriesPage;