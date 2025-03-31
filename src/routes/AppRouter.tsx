import LoadingScreen from '@/components/LoadingScreen';
import React, { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom'

const UserRouter = React.lazy(() => import('./UserRouter'))

const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path="/*" element={<UserRouter />} />
            </Routes>
        </Suspense>
    )
};

export default AppRouter
