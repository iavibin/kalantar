import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import {
  Portal,
  PortalSearch,
  PortalGraph,
  PortalMap,
  PortalGallery,
  PortalRecorder
} from './pages/Portal';
import { AuthProvider } from './context/AuthContext';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/portal" element={<Portal />}>
            <Route index element={<Navigate to="search" replace />} />
            <Route path="search" element={<PortalSearch />} />
            <Route path="graph" element={<PortalGraph />} />
            <Route path="map" element={<PortalMap />} />
            <Route path="gallery" element={<PortalGallery />} />
            <Route path="recorder" element={<PortalRecorder />} />
            <Route path="*" element={<Navigate to="search" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
