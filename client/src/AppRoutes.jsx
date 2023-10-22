import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpIn from "./pages/SignUpIn"

const AppRoutes = () => {
    return (

        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUpIn />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes;