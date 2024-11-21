import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext";

export default function Edit() {
  const { userLoggedIn } = useAuth();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (!userLoggedIn) {
      return;
    }
    const fetchInventory = async () => {
      const db = getFirestore();
      const itemsCollection = collection(db, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsList = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(itemsList);
    };

    fetchInventory();
  }, []);

  const handleIncrement = async (id) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, {
      quantity: inventory.find((item) => item.id === id).quantity + 1,
    });
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = async (id) => {
    const item = inventory.find((item) => item.id === id);
    if (item.quantity > 0) {
      const itemRef = doc(db, "items", id);
      await updateDoc(itemRef, {
        quantity: item.quantity - 1,
      });
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const handleDelete = async (id) => {
    const itemRef = doc(db, "items", id);
    await deleteDoc(itemRef);
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== id)
    );
  };

  const handleEdit = async (id, newName, newQuantity) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      const itemRef = doc(db, "items", id);
      await updateDoc(itemRef, {
        name: newName,
        quantity: newQuantity,
      });
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === id
            ? { ...item, name: newName, quantity: newQuantity }
            : item
        )
      );
    }
  };

  return (
    <div>
      {!userLoggedIn ? (
        <h2>Please login to view the dashboard</h2>
      ) : (
        <>
          <h2>Inventory Dashboard</h2>
          <ul>
            {inventory.map((item) => (
              <li
                key={item.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      setInventory((prevInventory) =>
                        prevInventory.map((invItem) =>
                          invItem.id === item.id
                            ? { ...invItem, name: e.target.value }
                            : invItem
                        )
                      )
                    }
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      setInventory((prevInventory) =>
                        prevInventory.map((invItem) =>
                          invItem.id === item.id
                            ? { ...invItem, quantity: parseInt(e.target.value) }
                            : invItem
                        )
                      )
                    }
                  />
                </span>
                <span>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity === 0}
                  >
                    -
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                  <button
                    style={{
                      marginLeft: "10px",
                      color: "white",
                      backgroundColor: "red",
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      handleEdit(item.id, item.name, item.quantity)
                    }
                  >
                    Save
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
