import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import CurrentBoard from "./pages/CurrentBoard/CurrentBoard";
import Root from "./Root";






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
                        path: "/home",
                        element: <Home />,
                    },
                   
                ]
            },
        ]
    },


]);