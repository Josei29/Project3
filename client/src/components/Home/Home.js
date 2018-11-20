import React from "react";
import { Parallax, Footer } from "react-materialize";
import "./Home.css";

// Landing page
const Home = () => {
    return (
        <div>
            <Parallax imageSrc="./assets/images/budget.png" alt="img1"/>
            <div className="section white">
                <div className="row container">
                    <h2 className="header">About</h2>
                    <p className="parallaxText">Manage and see where your money is going!</p>
                    <p className="parallaxText">Create your budget for any special occasion.</p>
                </div>
            </div>
            <Parallax imageSrc="./assets/images/special.png" alt="img2"/>
            <div className="section white">
                <div className="row container">
                    <h2 className="header">Send Money</h2>
                    <p className="parallaxText">Send money to other users, it's very simple!</p>
                </div>
            </div>
            <Parallax imageSrc="./assets/images/send.png" alt="img3"/>
            <Footer copyrights="Created by: Jose Jimenez - 2018" moreLinks={<a rel="noopener noreferrer" className="grey-text text-lighten-4 right" href="https://josei29.github.io/" target="_blank">Portfolio</a>}></Footer>
        </div>
    );
}

export default Home;