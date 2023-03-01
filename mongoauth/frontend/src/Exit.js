import { Button } from '@mui/material';
import { logout, selectIsAuth } from './redux/slices/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Exit = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const onClickLogout = () => {
        dispatch(logout());
        sessionStorage.removeItem('token');
        navigate("/register");
    };
    

    


    return (
        <>
            {isAuth && <Button onClick={onClickLogout} style={{ width: "170px" }} variant="contained">Выйти</Button>}
        </>
    )
}