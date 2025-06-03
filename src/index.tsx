import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import routers from "./router";

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const faviconHref = `${import.meta.env.VITE_PUBLIC_URL}/favicon.ico`;
const existingFavicon = document.querySelector("link[rel~='icon']");
if (existingFavicon) {
    existingFavicon.setAttribute('href', faviconHref);
} else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = faviconHref;
    document.head.appendChild(link);
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routers}/>
        </QueryClientProvider>
    </React.StrictMode>
);
