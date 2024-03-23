import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="grid-container ">
      <div className="event-background"></div>
      <div className="container">
        <div className="flex-container">
          <div className="title-container">
            <h1 className="title">Welcome to {"Himanshu's Events Hub"}</h1>
            <p className="subtitle">Discover the best events in town..!!</p>
          </div>
          <Link className="btn" to="events">
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
