import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router";

 import  RootLayout  from "./shared/layouts/RootLayout";
// import { NotFoundPage } from "./shared/pages";
import AuthRoutes from "./features/auth/routes/AuthRoutes";
// import MailRoutes from "./features/mail/routes/MailRoutes";
// import { AuthMiddleware } from "./features/auth/middlewares";

// import MenuRoutes from "./features/menu/routes/menuRoutes";
import {LandingPage} from "./shared/pages/LandingPage"
// import AdminRoutes from "./features/adminDashboard/routes/AdminRoutes";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage/>} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* <Route path="/mail/*" element={<MailRoutes />} /> */}
        {/* <Route
          path="/delivery-tracking/*"
          element={
            <AuthMiddleware>
              <DeliveryTrackingRoutes />
            </AuthMiddleware>
          }
        /> */}
        {/* <Route path="/menu/*" element={<MenuRoutes />} />
        <Route path="/search/*" element={<SearchMapRoutes />} />
        <Route path="/products/*" element={<ProductRoutes />} />
        <Route path="/dashboard/*" element={<AdminRoutes />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
        
    </>
  )
}

export default App
