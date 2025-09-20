"use client"
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react"
import React from "react";
import { LoaderOne } from "@/components/ui/loader";
import toast, { Toaster } from "react-hot-toast";
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

async function getData() {
  // Fetch data from your API here.
  const res = await fetch('https://dummyjson.com/users')
  const data = await res.json()
  return data.users
}

export default function Patientspage() {
  const [users, setUsers] = useState([])
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    birthDate: "",
    image: "",
    bloodGroup: "",
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    hairType: "",
    address: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
    country: "",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(""); // reset
      try {
        const data = await getData();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [])

  useEffect(() => {
    if (users.length !== 0) {
      const myData = users.map((user) => {
        return {
          pindex: user.id,
          name: user.firstName + " " + user.lastName,
          age: user.age,
          contact: user.phone,
        }
      })
      setUserData(myData)
    }
  }, [users])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateUsers = (data) => {
    setUserData((prev) => [ {
      pindex: prev.length + 1,
      name: data.firstName + " " + data.lastName,
      age: data.age,
      contact: data.phone,
    },
    ...prev
  ]);
  localStorage.setItem("localUser", JSON.stringify({id: users.length + 1, ...data}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Patient:", form);
    updateUsers(form);
    toast.success("Patient added successfully!");
    setIsOpen(false);
    setForm({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      birthDate: "",
      image: "",
      bloodGroup: "",
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      hairType: "",
      address: "",
      city: "",
      state: "",
      stateCode: "",
      postalCode: "",
      country: "",
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="md:text-8xl text-5xl font-bold text-[#0464C4] text-center">Patient Records</h1>
      {
        loading && (
          <div className="flex justify-center mt-10">
            <LoaderOne />
          </div>
        )
      }
      {
        error && (
          <div className="flex w-full justify-center mt-10">
            <Alert variant="destructive" className={"w-fit p-4"}>
              <AlertCircleIcon />
              <AlertTitle className={"text-2xl"}>Unable to process your request</AlertTitle>
              <AlertDescription>
                <p>Please try again later.</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Error: {error}</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )
      }
      {
        userData.length !== 0 && (
          <div className="flex flex-col gap-3 mt-10">
            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit sm:self-end self-center cursor-pointer"
            >
              👤 Add New Patient
            </button>

            {isOpen && (
              <div className="fixed inset-0 bg-black/50 flex justify-center z-50">
                <div className="bg-white mt-5 w-full max-w-2xl rounded-xl p-6 relative overflow-y-auto max-h-[90vh] shadow-xl">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                  >
                    ✖
                  </button>

                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Add New Patient
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="gender">Gender</label>
                  <input
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="birthDate">Birth Date</label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="image">Image URL</label>
                  <input
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <input
                    id="bloodGroup"
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="height">Height</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    value={form.height}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="weight">Weight</label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    value={form.weight}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="eyeColor">Eye Color</label>
                  <input
                    id="eyeColor"
                    name="eyeColor"
                    value={form.eyeColor}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="hairColor">Hair Color</label>
                  <input
                    id="hairColor"
                    name="hairColor"
                    value={form.hairColor}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="hairType">Hair Type</label>
                  <input
                    id="hairType"
                    name="hairType"
                    value={form.hairType}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col col-span-2">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                    rows={2}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="stateCode">State Code</label>
                  <input
                    id="stateCode"
                    name="stateCode"
                    value={form.stateCode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                  />
                </div>
              </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      ✅ Save Patient
                    </button>
                  </form>
                </div>
              </div>
            )}

            <HoverEffect items={userData} />
          </div>
        )
      }
    </div>
  );
}