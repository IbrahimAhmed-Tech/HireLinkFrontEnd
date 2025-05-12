import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./Layout"; 

const PrivateLayoutRoutes = () => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export default PrivateLayoutRoutes;
