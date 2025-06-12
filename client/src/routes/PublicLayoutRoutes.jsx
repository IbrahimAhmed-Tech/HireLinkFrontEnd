import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import axios from 'axios';
import Layout from "./Layout";

const PublicLayoutRoutes = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const checkToken = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await axios.get("/api/auth/validate-token", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    navigate("/");
                }
            } catch (err) {
                console.log(err?.message);
            }
        };

        checkToken();
    }, [navigate]);

    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};


export default PublicLayoutRoutes;