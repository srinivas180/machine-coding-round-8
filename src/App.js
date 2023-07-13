import { Route, Routes } from "react-router";

import { Home } from "./pages/Home";
import { Event } from "./pages/Event";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event/:eventId" element={<Event />} />
            </Routes>
        </div>
    );
}

export default App;
