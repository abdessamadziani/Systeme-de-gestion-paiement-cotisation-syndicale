import { Route, Routes } from "react-router";
// import AuthLayout from "../layouts/AuthLayout";
import { SignIn , SignUp } from "../components/index";
import AuthLayout from "../layouts/AuthLayout";





const AuthRoutes = () => (
  <Routes>
      <Route path="/" element={<AuthLayout />}>
      <Route index element={<SignIn />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      </Route>
  </Routes>
);

export default AuthRoutes;
