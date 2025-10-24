import React from 'react'
import { Toaster, toast } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

export const App = () => {

  return (
    <>

      <Toaster richColors />
      {/* <button onClick={() => toast("bam cai cc")}>bam thang bo m di</button> */}

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
