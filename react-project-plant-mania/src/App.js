import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import CartPage from "./components/CartPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))

    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
  }, []);


  const addToCart = (plant) => {
    const existing = cart.find((item) => item.id === plant.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === plant.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      setCart(updatedCart);

      fetch(`http://localhost:3001/cart/${plant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: (existing.quantity || 1) + 1 }),
      });
    } else {
      const newItem = { ...plant, quantity: 1 };
      setCart((prev) => [...prev, newItem]);

      fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      })
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    fetch(`http://localhost:3001/cart/${id}`, 
      { method: "DELETE" })
  };

  const addUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
  };

  return (
    <>
      <NavBar onCartClick={() => setIsCartOpen(true)} cartCount={cart.length} />

      <CartPage
        cart={cart}
        removeFromCart={removeFromCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <Outlet context={{ addToCart, user, setUser, addUser }} />
    </>
  );
}

export default App;
