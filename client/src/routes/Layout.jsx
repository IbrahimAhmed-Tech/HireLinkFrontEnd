import React from "react";
import ResponsiveAppBar from "../components/navbar/navbar";
const Layout = ({ children }) => {
    return (
        <>
            <ResponsiveAppBar />
            <main>{children}</main>
        </>
    );
};

export default Layout;