import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import PageLayout from './Components/PageLayout.jsx'
import { Homepage, VideoPlayerPage, HistoryPage, PublishVideo, LoginPage, RegisterPage, PrivateRoute } from './Components/index'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<PageLayout />}>
            {/* Private routes */}
            <Route index element={
                <PrivateRoute>
                    <Homepage />
                </PrivateRoute>
            } />
            <Route path='VideoPlayer/:videoId' element={
                <PrivateRoute>
                    <VideoPlayerPage key={window.location.pathname} />
                </PrivateRoute>
                } />
            <Route path='History' element={
                <PrivateRoute>
                    <HistoryPage />
                </PrivateRoute>
                } />
            <Route path='Publish' element={
                <PrivateRoute>
                    <PublishVideo />
                </PrivateRoute>
                } />

            {/* Public routes */}
            <Route path='register' element={<RegisterPage />} />
            <Route path='login' element={<LoginPage />} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
