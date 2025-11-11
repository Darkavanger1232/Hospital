import React, {useState} from 'react'
import axios from 'axios'
export default function AppointmentForm(){ 
  const [patientId, setPatientId] = useState('')
  const [datetime, setDatetime] = useState('')
  async function submit(e){ e.preventDefault()
    await axios.post('/api/appointments', {patient_id: patientId, datetime})
    alert('Agendamento solicitado')
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <label className="block">ID do Paciente<input value={patientId} onChange={e=>setPatientId(e.target.value)} className="w-full p-2 border rounded"/></label>
      <label className="block mt-2">Data e Hora<input type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} className="w-full p-2 border rounded"/></label>
      <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">Agendar</button>
    </form>
  )
}
