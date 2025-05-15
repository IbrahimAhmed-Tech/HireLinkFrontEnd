import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import PostJobPage from "../pages/postjob";
import SignInPage from "../pages/signin";
import SignUpPage from "../pages/signup";
import ReviewsPage from "../pages/reviews";
import AuthLayoutRoutes from "./AuthLayoutRoutes";
import PrivateLayoutRoutes from "./PrivateLayoutRoutes";
import PublicLayoutRoutes from "./PublicLayoutRoutes";



const MyRouter = () => {
    return (
        <Router>
            <Routes>
                 {/* Auth Routes */}
                <Route element={<AuthLayoutRoutes />}>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
                {/* Public Routes */}
                <Route element={<PublicLayoutRoutes />}>
                    <Route path="/home" element={<HomePage />} /> 
                    <Route path="/reviews" element={<ReviewsPage />} />                 
                </Route>

                {/* Private Routes */}
                <Route element={<PrivateLayoutRoutes />}>
                    <Route path="/post-job" element={<PostJobPage />} />

                </Route>

                {/* Catch-all route for 404 */}
                {/* <Route path="*" element={<NotFound />} /> */}

            </Routes>
        </Router>
    );
};

export default MyRouter;
