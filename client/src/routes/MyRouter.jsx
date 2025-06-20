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
import NotFoundPage from "../pages/notfound";



const MyRouter = () => {
    return (
        <Router>
            <Routes>
                 
                <Route element={<AuthLayoutRoutes />}>
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>
                
                <Route element={<PublicLayoutRoutes />}>
                    <Route path="/home" element={<HomePage />} /> 
                    <Route path="/reviews" element={<ReviewsPage />} />                 
                </Route>

                
                <Route element={<PrivateLayoutRoutes />}>
                    <Route path="/post-job" element={<PostJobPage />} />
                </Route>

              
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Router>
    );
};

export default MyRouter;
