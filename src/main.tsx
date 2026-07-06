import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AudioProvider } from "./audio/AudioProvider";
import { DoodDraftPage } from "./game/DoodDraft/pages/DoodDraftPage";
import { AdminNewsDraftsPage } from "./pages/AdminNewsDraftsPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticlesIndex } from "./pages/ArticlesIndex";
import { NotFound } from "./pages/NotFound";
import { PlantaoPage } from "./pages/PlantaoPage";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/global.css";
import "./styles/news.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/artigos" element={<ArticlesIndex />} />
          <Route path="/artigos/:slug" element={<ArticlePage />} />
          <Route path="/plantao" element={<PlantaoPage />} />
          <Route path="/arcade/dooddraft" element={<DoodDraftPage />} />
          <Route path="/admin/news-drafts" element={<AdminNewsDraftsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  </React.StrictMode>
);
