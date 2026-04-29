import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/features/layout/components/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { SimulatorPage } from '@/pages/SimulatorPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </MainLayout>
    </BrowserRouter>
  );
}
