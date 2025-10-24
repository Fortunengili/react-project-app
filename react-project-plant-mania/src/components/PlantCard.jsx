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
    <div className="container py-4">
      <h2 className="fw-bold text-success mb-4 text-center">Explore Our Plants</h2>

      <div className="d-flex justify-content-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ maxWidth: "200px" }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-select"
          style={{ maxWidth: "150px" }}
        >
          <option value="all">All</option>
          <option value="Succulent">Succulent</option>
          <option value="Tropical">Tropical</option>
          <option value="Flowering">Flowering</option>
          <option value="Houseplant">Houseplant</option>
          <option value="Aquatic">Aquatic</option>
          <option value="Grass">Grass</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="form-select"
          style={{ maxWidth: "150px" }}
        >
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
              <div className="card h-100 shadow-sm">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5>{plant.name}</h5>
                  <p className="text-muted">{plant.type}</p>
                  <p className="text-muted">KES {plant.price}</p>
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => addToCart(plant)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-5">No plants found.</p>
        )}
      </div>
    </div>
  );
}

export default PlantCard;
