// FarmerDetails.tsx
import React from 'react'

// Define the User type
type User = {
  _id: string;
  name: string;
  gmail: string;
  age: number;
  address: string;
};

// Component names in React must be capitalized
function FarmerDetails(props: { user: User }) {
  const {_id, name, gmail, age, address} = props.user;
  
  return (
    <div>
      <h1>Farmer details</h1>
      <br />
      <h1>ID: {_id}</h1>
      <h1>Name: {name}</h1>
      <h1>Gmail: {gmail}</h1>
      <h1>Age: {age}</h1>
      <h1>Address: {address}</h1>
      <button>Update</button>
      <button>Delete</button>
    </div>
  )
}

export default FarmerDetails;