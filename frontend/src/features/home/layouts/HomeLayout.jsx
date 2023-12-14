import { Outlet, useNavigate } from "react-router-dom";
//  import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

const HomeLayout = () => {
//   const location = useLocation();
  const navigate = useNavigate();

//   const selectedTab = location.pathname.split("/")[2] || "login";
//   const [selected, setSelected] = useState(selectedTab);

//   useEffect(() => {
//     setSelected(selectedTab);
//   }, [location.pathname, selectedTab]);

  const navigateTo = (key) => {
    setSelected(key);
    navigate(`/home/${key}`);
  };

  return (
    
           <Outlet />
     
     

  );
};

export default HomeLayout;
