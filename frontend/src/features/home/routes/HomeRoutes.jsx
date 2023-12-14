import { Route, Routes } from "react-router";
// import AuthLayout from "../layouts/AuthLayout";
import {Appartement ,Client,Payment, History, Home } from "../components/index";
 import HomeLayout from "../layouts/HomeLayout";





const HomeRoutes = () => (
  <Routes>
      <Route path="/" element={<HomeLayout />}>
      <Route index element={<Home />} />
      <Route path="clients" element={<Client />} />
      <Route path="appatements" element={<Appartement />} />
      <Route path="payments" element={<Payment />} />
      <Route path="history" element={<History />} />

      </Route>
  </Routes>
);

export default HomeRoutes;
