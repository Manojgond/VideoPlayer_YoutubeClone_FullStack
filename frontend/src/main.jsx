import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import PageLayout from './Components/PageLayout.jsx'
import {Homepage, VideoPlayerPage, HistoryPage } from './Components/index'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<PageLayout />}>
            <Route index element={<Homepage />} />
            <Route path='VideoPlayer' element={<VideoPlayerPage />} />
            <Route path='History' element={<HistoryPage />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            {/* <History /> */}
        </Provider>
    </React.StrictMode>
)
