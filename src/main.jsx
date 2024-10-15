import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { Menu } from './components/Menu/Menu';
import { Guest } from './components/Guest/Guest';
import { Visit } from './components/Visit/Visit';
import { IdForm } from './components/IdForm/IdForm';
import { CodeAlarm } from './components/CodeAlarm/CodeAlarm';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/new-guest" element={<Guest />} />
        <Route path="/new-visit" element={<Visit />} />
        <Route path="/id-form" element={<IdForm />} />
        <Route path="/code-alarm/:idNumber" element={<CodeAlarm />} />
      </Routes>    
    </Router>
  </StrictMode>,
)
