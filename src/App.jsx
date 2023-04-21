import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminLayout } from "./layout/AdminLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { HomeLayout } from "./layout/HomeLayout";
import { Admin } from "./pages/admin/Admin";
import { Carusel } from "./pages/admin/Carusel";
import { Login } from "./pages/auth/Login";
import { SendMessage } from "./pages/auth/SendMessage";
import {Home} from "./pages/home/Home";
import {NotFoundPages} from "./pages/NotFoundPages"
import Wrapper from "./layout/Wrappers";
import {SmsAdmin} from "./pages/admin/SmsAdmin";
import {Malumotlar} from "./pages/home/Malumotlar";
import {Working} from "./pages/admin/Working";
import {Videos} from "./pages/admin/Videos";

function App() {
  return (
      <BrowserRouter>
          <Wrapper>
          <ToastContainer/>
          <Routes>
              <Route path={"/"} element={<HomeLayout/>}>
                <Route index element={<Home />} />
                <Route path={"/malumotlar"} element={<Malumotlar />} />
              </Route>
              <Route path={"/auth/login"} element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path={"/auth/login/send"} element={<SendMessage/>}/>
              </Route>
              <Route path={"/admin"} element={<AdminLayout/>}>
                <Route index element={<Admin/>}/>
                <Route path={"/admin/carusel"} element={<Carusel/>}/>
                <Route path={"/admin/message"} element={<SmsAdmin/>}/>
                <Route path={"/admin/working"} element={<Working/>}/>
                <Route path={"/admin/videos"} element={<Videos/>}/>
              </Route>
              <Route path={"*"} element={<NotFoundPages />} />
          </Routes>
              </Wrapper>
      </BrowserRouter>
  )
}

export default App
