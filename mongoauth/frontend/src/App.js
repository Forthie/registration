import './App.css';
import { Routes, Route } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationForm';
import { AuthForm } from './components/AuthForm';
import { Exit } from './Exit';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';



function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);


  const registerHandle = () => {
    navigate('/register')
  }

  const loginHandle = () => {
    navigate('/login')
  }




  return (
    <div className="App">
      <Routes>
        {isAuth ? <Route path="/me" element={<Exit />} /> : <Route path="/" element={
          <>
            <Button onClick={registerHandle}>
              Зарегистрироваться
            </Button>
            <Button onClick={loginHandle}>
              Авторизоваться
            </Button>
          </>
        } />}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path='/login' element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;
