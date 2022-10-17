import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hoc/AuthProvider"
import { AuthService } from "../../../services/auth.service"
import { Button } from "../../UI/Button/Button"
import { Input } from "../../UI/Input/Input"
import styles from "./Auth.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next"
import image from "./res/dnk.gif"
import back from "./res/back.svg"
import { Input2 } from "../../UI/Input2/Input2"
import Placeholder from "react-select/dist/declarations/src/components/Placeholder"
import { Button2 } from "../../UI/Button2/Button2"

export const Auth = () => {

    const lang = localStorage.getItem("i18nextLng");
    const { t, i18n } = useTranslation()
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        window.location.reload();
    }

    const teacherGroups = [
        "administration",
        "practice_student",
        "staff",
        "doctoral_student",
        "postdoctoral",
        "group_leader",
    ]

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({ password: null, others: null })
    const [error, setError] = useState(null)
    const { setIsAuth, isAuth, setUser } = useAuth()

    const replaceError = (message) => {
        if (message) {
            message = message[0]
        }
        if (message === 'Должно включать "username" и "password".' || message === 'Это поле не может быть пустым.') return "Заполните логин и пароль!"
        if (message === 'Невозможно войти в систему с указанными учётными данными.') return "Неверный логин или пароль!"
    }

    const auth = async (e) => {
        e.preventDefault()
        try {
            const response: any = await AuthService.login({ username: username, password: password })
            window.localStorage.setItem("token", response.data.access_token)
            window.localStorage.setItem("refresh", response.data.refresh_token)
            setIsAuth(true)
            setUser(response.data.user)

            let isTeacher = false;
            if ("online_education" in params) {
                response.data.user.roles.forEach(role => {
                    if (teacherGroups.includes(role)) {
                        isTeacher = true;
                    }
                })
                if (isTeacher) {
                    navigate("/teacher_personal_account")
                } else {
                    navigate("/online_lab")
                }
            }
        } catch (err) {
            setErrors({ password: replaceError(err.response.data["password"]), others: replaceError(err.response.data["non_field_errors"]) })
        }
    }


    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <div className={styles.wrapper}>
            <form onSubmit={e => auth(e)}>
                <div className={styles.container}>
                    <img className={styles.bgImage} src={image} />
                    <div className={styles.auth}>
                        <div className={styles.back} onClick={() => { navigate(-1) }}>
                            <img alt="back" src={back} />
                            <p>Вернуться на сайт</p>
                        </div>
                        <p className={styles.title}>Вход в НОЦ Инфохимия</p>
                        <div className={styles.inputs}>
                            <Input2 placeholder="Введите логин..." onChange={e => setUsername(e.target.value)} />
                            <Input2 placeholder="Введите пароль..." type="password" onChange={e => setPassword(e.target.value)} />
                            <p className={styles.error}>{errors["others"] || errors["password"]}</p>
                        </div>
                        {/* <p className={styles.restorePass}>Забыли пароль?</p> */}
                        <div className={styles.buttons}>
                            <Button2 type={1} >Войти</Button2>
                            <Button2 type={2} onClick={() => { navigate("/register") }}>Зарегистрироваться</Button2>
                        </div>
                    </div>
                </div>
                {isAuth && <Navigate to="/" />}
            </form>
        </div>
    )
}