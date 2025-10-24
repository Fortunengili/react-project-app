import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../css/PlantCard.css";

function PlantCard() {
  const { addToCart } = useOutletContext();
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    fetch("http://localhost:3001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const processedPlants = plants
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || p.type === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="container">
      <h2 className="fw-bold text-success mb-4 text-center">Explore Our Plants</h2>

      <div className="plant-search-bar">
        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Succulent">Succulent</option>
          <option value="Tropical">Tropical</option>
          <option value="Flowering">Flowering</option>
          <option value="Houseplant">Houseplant</option>
          <option value="Aquatic">Aquatic</option>
          <option value="Grass">Grass</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>

      <div className="row">
        {processedPlants.length > 0 ? (
          processedPlants.map((plant) => (
            <div className="col-md-4 mb-4" key={plant.id}>
              <div className="card plant-card">
                <img src={plant.image} alt={plant.name} />
                <div className="card-body">
                  <h5>{plant.name}</h5>
                  <p className="text-muted">{plant.type}</p>
                  <p className="text-muted">KES {plant.price}</p>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => addToCart(plant)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No plants found.</p>
        )}
      </div>
    </div>
  );
}

export default PlantCard;
