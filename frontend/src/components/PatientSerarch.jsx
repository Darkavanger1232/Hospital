import React, {useState} from 'react'
import axios from 'axios'
export default function PatientSearch(){
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)
  async function search(){
    const res = await axios.get(`/api/patients/search?q=${encodeURIComponent(q)}`)
    setResult(res.data)
  }
  return (
    <div>
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} className="p-2 border rounded flex-1" placeholder="Nome, CPF, CNS..."/>
        <button onClick={search} className="px-4 py-2 bg-green-600 text-white rounded">Pesquisar</button>
      </div>
      <pre className="mt-4 bg-white p-3 rounded shadow">{result ? JSON.stringify(result, null, 2) : 'Nenhum resultado'}</pre>
    </div>
  )
}
