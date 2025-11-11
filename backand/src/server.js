const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Autenticação simples via JWT (exemplo)
app.use((req,res,next)=>{
  const auth = req.headers.authorization
  if(auth && auth.startsWith('Bearer ')) {
    try{
      const token = auth.slice(7)
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
      req.user = payload
    }catch(e){}
  }
  next()
})

// IA mock endpoint
app.post('/api/ai/chat', (req,res)=>{
  const {message} = req.body
  const reply = `Assistente (mock): recebi sua pergunta -> ${message}. Sugestão: consulte o perfil do paciente e agende o exame.`
  res.json({reply})
})

app.get('/api/patients/search', (req,res)=>{
  const q = req.query.q || ''
  const stmt = db.prepare("SELECT * FROM patients WHERE name LIKE ? OR cpf LIKE ? OR cns LIKE ? LIMIT 50")
  const rows = stmt.all(`%${q}%`,`%${q}%`,`%${q}%`)
  res.json(rows)
})

app.post('/api/appointments', (req,res)=>{
  const {patient_id, datetime} = req.body
  const stmt = db.prepare('INSERT INTO appointments(patient_id, scheduled_at) VALUES (?,?)')
  const info = stmt.run(patient_id, datetime)
  res.json({id: info.lastInsertRowid})
})

app.get('/api/reports/patient/:id', (req,res)=>{
  const id = req.params.id
  const patient = db.prepare('SELECT * FROM patients WHERE id = ?').get(id)
  const appointments = db.prepare('SELECT * FROM appointments WHERE patient_id = ?').all(id)
  const exams = db.prepare('SELECT e.*, er.content FROM exams e LEFT JOIN exam_results er ON er.exam_id = e.id WHERE e.appointment_id IN (SELECT id FROM appointments WHERE patient_id = ?)').all(id)
  res.json({patient, appointments, exams})
})

app.get('/api/integracoes/cnes', async (req,res)=>{
  const q = req.query.q || ''
  // Nota: em produção troque por integração real com CNES
  try{
    const r = await axios.get('https://apidadosabertos.saude.gov.br/v1/cnes/estabelecimentos', {params: {q}})
    res.json(r.data)
  }catch(e){
    res.status(500).json({error:'Erro ao consultar CNES (mock)'})
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log('API running on', PORT))
