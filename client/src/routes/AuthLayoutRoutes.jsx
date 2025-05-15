import React from "react";
import { Outlet } from "react-router-dom";
import AuthLayout from "./AuthLayout"; 

const AuthLayoutRoutes = () => {
    return (
        <>
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        </>
    );
};

export default AuthLayoutRoutes;