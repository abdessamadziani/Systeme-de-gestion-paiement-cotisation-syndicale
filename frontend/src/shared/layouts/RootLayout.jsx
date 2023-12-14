import { Outlet } from "react-router";
// import  Header  from "../components/NavBar"

const RootLayout = () => {
      
  return (
    <>
    {/* <Header/> */}
      <Outlet/>
    </>
  );
};

export default RootLayout;