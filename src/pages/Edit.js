import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
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
                  {item.name} - {item.quantity}
                </span>
                <span>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
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
