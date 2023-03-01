import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth.js';
import { useEffect } from 'react';


export const AuthForm = () => {
    const dispatch = useDispatch();
    // const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const onClickregister = () => navigate("/register");
    const formikSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        if ("token" in data.payload) {
            window.sessionStorage.setItem("token", JSON.stringify(data.payload.token));
            const isAuth = Boolean(window.sessionStorage.getItem('token',JSON.stringify(data.payload.token)))
            if (isAuth) navigate('/me');
        } else {
            alert("Не удалось авторизоваться");
        }
    }

    

    // useEffect(() => {
    //     if (isAuth) {
    //         navigate('/me');
    //     }
    // }, [isAuth, navigate]);

    const authValidationSchema = yup.object().shape({
        login: yup
            .string()
            .typeError("Должно быть строкой")
            .required("Обязательно"),
        password: yup
            .string()
            .typeError("Должно быть строкой")
            .required("Обязательно"),
    })

    return (
        <>
            <header>
                <Button onClick={() => navigate('/')} variant="contained" style={{ backgroundColor: "black" }}>Home</Button>
                <Button onClick={onClickregister} style={{ width: "200px" }} variant="contained">Зарегистрироваться</Button>
            </header>
            <Formik
                initialValues={{
                    login: "",
                    password: "",
                }}
                validateOnBlur
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    formikSubmit(values);
                }}
                validationSchema={authValidationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    dirty
                }) => (
                    <div className='auth'>
                        <div className='data-fields'>
                            <TextField
                                id="login"
                                label="Логин"
                                variant="outlined"
                                className='field'
                                name={"login"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.login}
                            />
                            {touched.login && errors.login && (
                                <p className={"error"}>{errors.login}</p>
                            )}
                                <TextField
                                    type="password"
                                    id="outlined-basic"
                                    label="Пароль"
                                    variant="outlined"
                                    className='field'
                                    name={"password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {touched.password && errors.password && (
                                    <p className={"error"}>{errors.password}</p>
                                )}
                        </div>
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                            disabled={!isValid || !dirty}
                            variant="contained"
                            className='btn'
                        >Авторизоваться</Button>
                    </div>
                )}
            </Formik>
        </>
    )
}