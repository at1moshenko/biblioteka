import React from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomePage } from "./components/page/page-home";
import { BookPage } from "./components/page/page-book";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/page/page-not-found";

import { AuthForm } from "./components/page/register";
import { FavoritePage } from "./components/favorites";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import "./index.css";

function App() {
  return (
    <div className="App">
      <PersistGate persistor={persistor}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id/:title" element={<BookPage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<FavoritePage />} />
        </Routes>
        <Footer />
      </PersistGate>
    </div>
  );
}

export default App;
