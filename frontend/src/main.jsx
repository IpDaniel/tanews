import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./routes/App.jsx";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import Contact from "./routes/Contact.jsx";
import Privacy from "./routes/Privacy.jsx";
import Profile from "./routes/Profile.jsx";
import Error404 from "./routes/Error404.jsx";
import Settings from "./routes/Settings.jsx";
import Register from "./routes/Register.jsx";
import Login from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import AdminAddArticle from "./routes/AdminAddArticle.jsx";
import ArticlePage from "./routes/ArticlesPage.jsx";
import EditArticles from "./routes/EditArticles.jsx";
import EditArticle from "./routes/EditArticle.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/profile", element: <Profile /> },
  { path: "/*", element: <Error404 /> },
  { path: "/settings", element: <Settings /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/authorized/add-article", element: <AdminAddArticle /> },
  { path: "/authorized/edit-article/", element: <EditArticles /> },
  { path: "/authorized/edit/:id", element: <EditArticle /> },
  { path: "/article/:id", element: <ArticlePage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
