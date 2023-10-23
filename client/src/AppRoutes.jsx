import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpIn from "./pages/SignUpIn"
import Home from "./pages/Home";

const AppRoutes = () => {
    return (

        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUpIn />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes;