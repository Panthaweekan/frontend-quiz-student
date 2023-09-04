import React, { useState } from "react";
import { API_URL } from "@/utils/api";

interface DonationFormState {
  firstName: string;
  lastName: string;
  email: string;
  amount: string;
}

export default function DonationForm() {
  const initialFormState: DonationFormState = {
    firstName: "",
    lastName: "",
    email: "",
    amount: "",
  };

  const [formData, setFormData] = useState<DonationFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<DonationFormState>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data before sending to the server
    const validationErrors: Partial<DonationFormState> = {};

    if (!formData.firstName) {
      validationErrors.firstName = "Please enter a first name.";
    }

    if (!formData.lastName) {
      validationErrors.lastName = "Please enter a last name.";
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    const numericAmount = parseInt(formData.amount);

    if (!formData.amount || isNaN(numericAmount) || numericAmount <= 1000) {
      validationErrors.amount = "Amount must be a number greater than 1000.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Create JSON from form data
      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        amount: formData.amount,
      };

      // Send data to the server via POST Request <-- https://donation-server-production.up.railway.app/donate
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data sent successfully:", data);
          // Clear the form after successful submission
          setFormData(initialFormState);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
  };

  return (
    <div>
      <h1>Donation Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="amount">Amount :</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
