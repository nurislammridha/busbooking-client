'use client'
import React from "react";
import Link from "next/link";
// import Router from "next/router";
import { useRouter } from 'next/navigation'

import NProgress from "nprogress";
import "./nprogress.css";

import { Layout, Menu } from "antd";

const { Header } = Layout;




const Nav = () => {
  const Router = useRouter()
  // Router.onRouteChangeStart = url => NProgress.start();
  // Router.onRouteChangeComplete = url => NProgress.done();
  // Router.onRouteChangeError = url => NProgress.done();
  return (
    <nav>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link href="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/about">
              About
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </nav>
  );
}
export default Nav;
