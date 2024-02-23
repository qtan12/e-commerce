// định nghĩa đường link trang web
import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import { Taikhoan, Trangchu, Public} from './pages/public'
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
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.TRANGCHU} element={<Trangchu />} />
          <Route path={path.TAIKHOAN} element={<Taikhoan />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
