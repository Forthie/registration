import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { fetchRegister } from '../redux/slices/auth';



export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitValues = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            return alert("Не удалось зарегистрироваться")
        }

    }

    const authOnClick = () => navigate("/login");


    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .typeError("Должно быть строкой")
            .required("Обязательно")
            .matches(/^[аА-яЯ\s]+$/, "Имя должно состоять из русских букв"),
        secondName: yup
            .string()
            .typeError("Должно быть строкой")
            .required("Обязательно")
            .matches(/^[аА-яЯ\s]+$/, "Фамилия должна состоять из русских букв"),
        login: yup
            .string()
            .typeError("Должно быть строкой")
            .required("Обязательно"),
        password: yup
            .string()
            .typeError("Должно быть строкой")
            .required("Обязательно"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Пароли не совпадают")
            .required("Обязательно"),
        email: yup.string().email("Введите верный email").required("Обязательно"),
        confirmEmail: yup
            .string()
            .email("Введите верный email")
            .oneOf([yup.ref("email")], "Email не совпадают")
            .required("Обязательно")
    });



    return (
        <>
            <header>
                <Button onClick={() => navigate('/')} variant="contained" style={{ backgroundColor: "black" }}>Home</Button>
                <Button onClick={authOnClick} variant="outlined">Авторизоваться</Button>
            </header>
            <Formik
                initialValues={{
                    name: "",
                    secondName: "",
                    login: "",
                    password: "",
                    confirmPassword: "",
                    email: "",
                    confirmEmail: ""
                }}
                validateOnBlur
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    submitValues(values);
                }}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    dirty
                }) => (
                    <div className='register'>
                        <TextField
                            id="name"
                            label="Имя"
                            variant="outlined"
                            className='field'
                            name={"name"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {touched.name && errors.name && (
                            <p className={"error"}>{errors.name}</p>
                        )}
                        <TextField
                            id="surname"
                            label="Фамилия"
                            variant="outlined"
                            className='field'
                            name={"secondName"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.secondName}
                        />
                        {touched.secondName && errors.secondName && (
                            <p className={"error"}>{errors.secondName}</p>
                        )}
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
                            id="password"
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
                        <TextField
                            type="password"
                            id="confpassword"
                            label="Подтвердите пароль"
                            variant="outlined"
                            className='field'
                            name={"confirmPassword"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className={"error"}>{errors.confirmPassword}</p>
                        )}
                        <TextField

                            id="email"
                            label="Email"
                            variant="outlined"
                            className='field'
                            name={"email"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <p className={"error"}>{errors.email}</p>
                        )}
                        <TextField

                            id="confirmemail"
                            label="Подтвердите Email"
                            variant="outlined"
                            className='field'
                            name={"confirmEmail"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmEmail}
                        />
                        {touched.confirmEmail && errors.confirmEmail && (
                            <p className={"error"}>{errors.confirmEmail}</p>
                        )}
                        <Button
                            onClick={() => {
                                handleSubmit();
                                authOnClick();
                            }}
                            disabled={!isValid || !dirty}
                            variant="contained"
                            className='btn'
                        >Зарегистрироваться</Button>
                    </div>
                )}
            </Formik>
        </>
    )
}  
