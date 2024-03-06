// định nghĩa đường link trang web
import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import { Login, Trangchu, Public, FAQ, Sanpham, Chitietsanpham, Baiviet, Lienhetoi, FinalRegister} from './pages/public'
import path from './ultils/path';
import { layDanhmuc } from './store/app/asyncActions'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(layDanhmuc())
  }, [dispatch])
  
  return (
    <div className="min-h-screen font-main">
      {/* Định nghĩa Route */}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.TRANGCHU} element={<Trangchu />} />
          <Route path={path.CHITIETSANPHAM__PID__TITLE} element={<Chitietsanpham />} />
          <Route path={path.BAIVIET} element={<Baiviet />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.LIENHETOI} lement={<Lienhetoi />} />

          <Route path={path.SANPHAM} element={<Sanpham />} />

        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
