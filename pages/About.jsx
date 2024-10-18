export function About() {
    return (
        <section className="about">
            <h1>Meet Our Programmers</h1>

            <div className="programmer-card">
                <img className="programmer-img" src="assets\img\Aviv's avatar.png" alt="Aviv Mor" />
                <div className="programmer-info">
                    <h2>Aviv Mor</h2>
                    <p>27 years old</p>
                    <p>
                        Aviv is a passionate traveler and an adventurous soul who has explored cultures and cuisines across the globe. 
                        With a strong love for music, he’s spent years producing beats and songs, blending his creative skills with technology.
                        Recently, Aviv has embarked on a new journey as a programmer, bringing his creativity and fresh perspective into the world of coding. 
                        As a dedicated foodie, he never misses a chance to try new dishes, constantly seeking inspiration for his next adventure.
                    </p>
                </div>
            </div>

            <div className="programmer-card">
                <img className="programmer-img" src="path-to-leon-image.png" alt="Leon Pri-Mor" />
                <div className="programmer-info">
                    <h2>Leon Pri-Mor</h2>
                    <p>52 years old</p>
                    <p>
                        Leon is a seasoned data programmer with decades of experience, specializing in building robust, data-driven solutions. 
                        Known for his analytical mindset and problem-solving skills, Leon has successfully delivered countless projects in his career. 
                        Outside the tech world, Leon is an avid motorcycle enthusiast, enjoying the freedom and thrill of the open road. 
                        Family is at the core of his life, and he loves spending quality time with his loved ones, making every moment count. 
                        Whether he's coding or cruising, Leon’s passion for life and work is undeniable.
                    </p>
                </div>
            </div>
        </section>
    );
}
