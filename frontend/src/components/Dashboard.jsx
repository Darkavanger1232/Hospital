import React from 'react'
import ChatAI from './ChatAI'
import PatientSearch from './PatientSearch'
import AppointmentForm from './AppointmentForm'
export default function Dashboard(){ return (
  <div className="p-6 grid grid-cols-3 gap-6">
    <div className="col-span-2">
      <h2 className="text-2xl mb-4">Painel</h2>
      <PatientSearch />
      <div className="mt-6"><AppointmentForm/></div>
    </div>
    <div>
      <h3 className="text-xl">Assistente IA</h3>
      <ChatAI/>
    </div>
  </div>
)}
