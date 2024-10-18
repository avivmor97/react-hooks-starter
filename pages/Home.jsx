const { Link } = ReactRouterDOM;

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to Leon & Aviv Home Page!</h1>
            <Link to="/mail">
                <img className="home-img" src="assets/img/Gmail_Icon.png" alt="Image 1" />
            </Link>
            <Link to="/note">
                <img className="home-img" src="assets/img/google keep icon.png" alt="Image 2" />
            </Link>
        </section>
    );
}
