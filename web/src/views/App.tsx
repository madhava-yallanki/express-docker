import { JSX } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Home } from './home/index.js';

export const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index={true} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const AppLayout = (): JSX.Element => {
  return (
    <div className="max-w-screen-md mx-auto">
      <Outlet />
    </div>
  );
};
