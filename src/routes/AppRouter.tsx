import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom'

const UserRouter = React.lazy(() => import('./UserRouter'))

const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/*" element={<UserRouter />} />
            </Routes>
        </Suspense>
    )
};

export default AppRouter
