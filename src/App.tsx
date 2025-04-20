import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css"


import Navbar from "./components/Navbar";
import Popup from "./components/Feedbacks/Popup";
import PageDemo from "./pages/PageDemo";
import Footer from "./components/Footer"
import DashboardPage from "./pages/DashboardPage";
import MesDonneesPage from "./pages/MesDonneesPage";
import MesCollectionsPage from "./pages/MesCollectionsPage";
import MesCollectionsDetailPage from "./pages/MesCollectionsDetailPage";
import MesDonneesDetailPage from "./pages/MesDonneesDetailPage";

import CSV from "./pages/CSV";
import UpdateCSVPage from "./pages/UpdateCSVPage";
import TEIPage from "./pages/TEIPage";
import EmptyPage from "./pages/EmptyPage";
import ThesaurusPage from "./pages/ThesaurusPage"

import { useAppDispatch } from "./app/hooks";
import { setApiKey } from "./app/auth-slice";
import { setBase } from "./app/base-url-slice";
import Colorblind from "./components/Modals/Colorblind"


export type RouterParams =
  {
    id: string
    id2: string
  }

function App() {
  const [show, setShow] = useState(true)
  const dispatch = useAppDispatch();

  if (sessionStorage.getItem("api_key") !== null) {
    dispatch(setApiKey(sessionStorage.getItem("api_key")!))
  }
  if (sessionStorage.getItem("server_url") !== null) {
    dispatch(setBase(sessionStorage.getItem("server_url")!))
  }


  return (
    <BrowserRouter>
      <Navbar />
      <Popup closePopup={() => setShow(false)} showPopup={show} />
      <Colorblind />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<PageDemo />} />
        <Route path="/account" element={<DashboardPage />} />
        <Route path="/collections" element={<MesCollectionsPage />} />
        <Route path="/collections/:id/:id2" element={<MesCollectionsDetailPage />} />
        <Route path="/donnees" element={<MesDonneesPage />} />
        <Route path="/donnees/:id/:id2" element={<MesDonneesDetailPage />} />

        <Route path="/csv" element={<CSV />} />
        <Route path="/updatecsv" element={<UpdateCSVPage />} />
        <Route path="/tei" element={<TEIPage />} />

        <Route path="/empty" element={<EmptyPage />} />
        <Route path="/thesaurus" element={<ThesaurusPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
