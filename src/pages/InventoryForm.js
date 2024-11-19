import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function InventoryForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventory, setInventory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, quantity: parseInt(quantity) };
    setInventory([...inventory, newItem]);
    setName("");
    setQuantity("");
    alert("Item added successfully!");

    // Add item to Firestore
    try {
      const db = getFirestore();
      await addDoc(collection(db, "items"), newItem);
      console.log("Document written with ID: ", newItem);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Inventory Item</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      {/* Display added inventory items */}
    </div>
  );
}
