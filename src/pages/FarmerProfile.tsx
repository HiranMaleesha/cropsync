// Users.tsx (FarmerProfile.tsx)
import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerDetails from "./farmerDetails";

// Define the User type
type User = {
  _id: string;
  name: string;
  gmail: string;
  age: number;
  address: string;
};

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Users() {
  // Add loading state
  const [loading, setLoading] = useState<boolean>(true);
  // Initialize to null to detect when data hasn't loaded yet
  const [users, setUsers] = useState<User[] | null>(null);
  
  useEffect(() => {
    setLoading(true);
    fetchHandler()
      .then((data) => {
        console.log("API response:", data); // Log the response to see its structure
        
        if (data && Array.isArray(data)) {
          // If the response is directly an array
          setUsers(data);
        } else if (data && Array.isArray(data.users)) {
          // If the response has a users property that's an array
          setUsers(data.users);
        } else {
          console.error("Unexpected API response format:", data);
          setUsers([]); // Set to empty array if no users data
        }
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setUsers([]); // Set to empty array on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user, i) => (
            <div key={i}>
              <FarmerDetails user={user} />
            </div>
          ))
        ) : (
          <p>No farmers found</p>
        )}
      </div>
    </div>
  );
}

export default Users;