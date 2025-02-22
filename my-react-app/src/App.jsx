import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Profile from "./pages/profile";
import Bookmarking from "./pages/bookmarking";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookmarking" element={<Bookmarking />} />
            </Routes>
        </Router>
    );
}

export default App;