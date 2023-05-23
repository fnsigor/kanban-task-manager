import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import CurrentBoard from "./pages/CurrentBoard/CurrentBoard";
import Root from "./App";






//============================================= ROUTER CONFIG ======================

export const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <GlobalErrorPage />,
        children: [
            { index: true, element: <Home /> },
            {
                // errorElement: <ErrorPage />,
                children: [
                    {
                        path: "/boards/:boardid",
                        element: <CurrentBoard />,
                    },
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/home",
                        element: <Home />,
                    },
                    {
                        path: "/cadastro",
                        element: <Register />,
                    },
                ]
            },
        ]
    },


]);