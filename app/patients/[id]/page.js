"use client";

import Image from "next/image";
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function getData() {
  // Fetch data from your API here.
  const res = await fetch('https://dummyjson.com/users')
  const data = await res.json()
  return data.users
}

export default function PatientDetailsPage() {
  const { id } = useParams();
  const [patientData, setPatientData] = useState([])
  const [currentPatient, setCurrentPatient] = useState({})

  useEffect(() => {
    getData().then(data => {
      console.log(data)
      setPatientData(data)
    })
  }, [])

  useEffect(() => {
    if (patientData.length !== 0) {
      const data = patientData.find((patient) => {
        if (patient?.id == id) {
          setCurrentPatient(patient)
        }
      })
    }
    if (id > patientData.length) {
      const data = JSON.parse(localStorage.getItem("localUser"))
      console.log(data)
      setCurrentPatient(data)
    }
  }, [patientData])

  return (
    <div className="p-2 flex items-center justify-center">
      {!currentPatient?.id && (
        <Image
          src="/nodata.svg"
          alt="loading"
          width={500}
          height={500}
        />
      )}
      {currentPatient?.id && (
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Image
              src={currentPatient?.image}
              alt={`${currentPatient?.firstName} ${currentPatient?.lastName}`}
              width={128}
              height={128}
              className="rounded-full border-4 border-indigo-500 shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentPatient?.firstName} {currentPatient?.lastName}
              </h1>
              <p className="text-gray-600">Username: @{currentPatient?.username}</p>
              <p className="text-sm text-gray-500">
                Age: {currentPatient?.age} | Gender: {currentPatient?.gender} | DOB: {currentPatient?.birthDate}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-medium">Email:</span> {currentPatient?.email}</p>
              <p><span className="font-medium">Phone:</span> {currentPatient?.phone}</p>
            </div>
          </div>

          {/* Medical */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Medical Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
              <p><span className="font-medium">Blood Group:</span> {currentPatient?.bloodGroup}</p>
              <p><span className="font-medium">Height:</span> {currentPatient?.height} cm</p>
              <p><span className="font-medium">Weight:</span> {currentPatient?.weight} kg</p>
              <p><span className="font-medium">Eye Color:</span> {currentPatient?.eyeColor}</p>
              <p><span className="font-medium">Hair:</span> {currentPatient?.hair?.color || currentPatient.hairColor} ({currentPatient?.hair?.type || currentPatient.hairType})</p>
            </div>
          </div>

          {/* Address */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Address</h2>
            <p className="text-gray-700">
              {currentPatient?.address?.address || currentPatient.address}, {currentPatient?.address?.city || currentPatient.city}, {currentPatient?.address?.state || currentPatient.state} ({currentPatient?.address?.stateCode || currentPatient.stateCode}) - {currentPatient?.address?.postalCode || currentPatient.postalCode}, {currentPatient?.address?.country || currentPatient.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

