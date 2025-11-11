import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
export default function App(){ return (
  <div className="min-h-screen bg-gray-50">
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard/*" element={<Dashboard/>} />
    </Routes>
  </div>
)}
