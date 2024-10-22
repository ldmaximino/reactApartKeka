import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Menu } from "./components/Menu/Menu";
import { Guest } from "./components/Guest/Guest";
import { IdForm } from "./components/IdForm/IdForm";
import { CodeAlarm } from "./components/CodeAlarm/CodeAlarm";
import { Message } from "./components/Message/Message";
import { FindGuest } from "./components/Visit/FindGuest";
import { GetGuest } from "./components/GetGuest/GetGuest";
import { Visit } from "./components/Visit/Visit";
import { UserProvider } from "./components/Context/userContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/new-guest" element={<Guest />} />
          <Route path="/new-visit" element={<FindGuest />} />
          <Route path="/id-form" element={<IdForm />} />
          <Route path="/code-alarm/:idNumber" element={<CodeAlarm />} />
          <Route path="/getguest/:searchby/:nameParam" element={<GetGuest />} />
          <Route path="/addvisit" element={<Visit />} />
          <Route path="/message-confirm" element={<Message />} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>
);
