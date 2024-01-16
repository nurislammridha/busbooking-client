"use client"; // This is a client component 👈🏽
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
const Param = ({ children, info = {} }) => {
  const Router = useRouter()
  // useEffect(() => {
  //   if (Object.keys(info).length <= 0) {
  //     Router.push("/");
  //   }
  // }, []);
  return <>{children}</>;
};

export default Param;
