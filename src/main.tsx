import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticlesIndex } from "./pages/ArticlesIndex";
import { NotFound } from "./pages/NotFound";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/artigos" element={<ArticlesIndex />} />
        <Route path="/artigos/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
