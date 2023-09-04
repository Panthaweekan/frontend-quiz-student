import React, { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";

interface Donation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  time: string;
}

export default function DonationList() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Fetch donation data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: Donation[]) => {
        setDonations(data);
      })
      .catch((error) => {
        console.error("Error fetching donation data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Donation List</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>
            {donation.firstName} {donation.lastName} - Amount: {donation.amount}{" "}
            THB
          </li>
        ))}
      </ul>
    </div>
  );
}
