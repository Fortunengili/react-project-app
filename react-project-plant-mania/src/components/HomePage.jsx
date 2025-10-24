import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Tropical Green Style";

  useEffect(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }, []);

  const galleryImages = [
    {
      src: "https://www.idyl.co.in/cdn/shop/articles/out-0_e91f6f5b-df0e-441c-88a1-4fbe2ab148a0_1100x.png?v=1731309345",
      caption: "Lush Indoor Oasis",
    },
    {
      src: "https://thumbs.dreamstime.com/z/colorful-tropical-plant-botanic-gardens-singapore-vibrant-leaves-192775771.jpg",
      caption: "Vibrant Plant Vibes",
    },
    {
      src: "https://tse4.mm.bing.net/th/id/OIP.hdedq9Oc8_EWCQl3OXXoIQHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3",
      caption: "Nature’s Finest",
    },
  ];

  const featuredPlants = [
    {
      src: "https://tse4.mm.bing.net/th/id/OIP.aoDQcbG5tH-beddN9BXuLAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      name: "Monstera Deliciosa",
    },
    {
      src: "https://th.bing.com/th/id/R.c6fa429a8b9ce15b906189b0df45613e?rik=f2isJWQ%2bJjFscw&pid=ImgRaw&r=0",
      name: "Fiddle Leaf Fig",
    },
    {
      src: "https://m.media-amazon.com/images/I/818CAvsi6-L.jpg",
      name: "Snake Plant",
    },
  ];

  return (
    <div className="homepage">
      <section className="hero-section d-flex align-items-center justify-content-center text-white text-center">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="display-3 fw-bold hero-title">{displayedText}</h1>
          <p className="hero-text">
            Transform your space with nature’s finest plants.
          </p>
          <button
            className="btn btn-warning fw-bold rounded-pill px-4 py-2"
            onClick={() => navigate("/dashboard")}
          >
            Explore Now
          </button>
        </div>
      </section>

      <section className="gallery-section py-5 container text-center">
        <h2 className="text-success mb-4">Discover the Beauty of Plants</h2>
        <div className="row">
          {galleryImages.map((img, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="gallery-card">
                <img src={img.src} alt={img.caption} className="gallery-img" />
                <p className="text-muted mt-2">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section py-5 bg-light container text-center">
        <h2 className="text-success mb-4">Our Top Picks</h2>
        <div className="row">
          {featuredPlants.map((plant, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="card plant-card">
                <img src={plant.src} alt={plant.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="text-success">{plant.name}</h5>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => navigate("/dashboard")}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
