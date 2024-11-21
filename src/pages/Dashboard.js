import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext";

export default function Dashboard() {
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

  return (
    <div>
      {!userLoggedIn ? (
        <h2>Please login to view the dashboard</h2>
      ) : (
        <>
          <h2>Inventory Dashboard</h2>
          <ul>
            {inventory.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.quantity}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
