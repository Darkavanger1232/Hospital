import React, {useState} from 'react'
import axios from 'axios'
export default function ChatAI(){ 
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  async function send(){
    if(!input) return
    const userMsg = {role:'user', text: input}
    setMessages(prev=>[...prev, userMsg])
    setInput('')
    try{
      const res = await axios.post('/api/ai/chat', {message: userMsg.text})
      setMessages(prev=>[...prev, {role:'assistant', text: res.data.reply}])
    }catch(e){
      setMessages(prev=>[...prev, {role:'assistant', text: 'Erro ao conectar com a IA.'}])
    }
  }
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="h-64 overflow-auto mb-2">
        {messages.map((m,i)=> (<div key={i} className={m.role==='user'? 'text-right':'text-left'}>{m.text}</div>))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 p-2 border rounded" />
        <button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
      </div>
    </div>
  )
}
