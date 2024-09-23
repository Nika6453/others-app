import PostList from "../components/PostList"

function HomePage() {
    return (
    <section class="mobile-block">
        <div class="mobile-block_header is-secondary">
            Все новости
        </div>
        <div>
        <PostList/>           
        </div>
    </section>
    );
}

export default HomePage;