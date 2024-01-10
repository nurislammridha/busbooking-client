import Header from './Header';
// import 'antd/dist/antd.css';

import React from "react";


const Layout = ({ children }) => {
    console.log(children)
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
};

export default Layout;