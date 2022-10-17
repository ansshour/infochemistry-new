import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hoc/AuthProvider"
import $api from "../../../http"
import { AuthService } from "../../../services/auth.service"
import { Button } from "../../UI/Button/Button"
import { Input } from "../../UI/Input/Input"
import Select from "react-select"
import styles from "./Register.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next"
import { Input2 } from "../../UI/Input2/Input2"
import { Button2 } from "../../UI/Button2/Button2"
import image from "./res/dnk.gif"
import back from "./res/back.svg"

export const Register = () => {


    const navigate = useNavigate()
    const lang = localStorage.getItem("i18nextLng");

    const { t, i18n } = useTranslation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        window.location.reload();
    }

    const { setIsAuth, setUser, isAuth } = useAuth()

    const [fields, setFields] = useState({ fio: "", group: "", email: "", username: "", password: "", password2: "" })
    const [groups, setGroups] = useState<any>([])
    const [activeGroup, setActiveGroup] = useState([]);
    const [errors, setErrors] = useState({ fio: "", group: "", username: "", password: "" })

    const changeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [e.target.name]: e.target.value })
    }



    const register = (e) => {
        e.preventDefault()
        AuthService.register(
            { username: fields.username, email: `${fields.username}@infochemistry.ru`, password1: fields.password, password2: fields.password, last_name: fields.fio.split(" ")[0], first_name: fields.fio.split(" ")[1], middle_name: fields.fio.split(" ")[2], university_group: Number(activeGroup) }
        )
            .then(response => {
                window.location.href = "/register/confirm"
            })
            .catch(err => {
                const errs = err.response.data;
                let errObj = { fio: "", group: "", username: "", password: "" }
                if ("first_name" in errs) {
                    errObj = { ...errObj, fio: "Заполните ФИО!" }
                }
                if ("university_group" in errs) {
                    errObj = { ...errObj, group: "Выберите группу!" }
                }
                if ("password1" in errs) {
                    errObj = { ...errObj, password: "Некорректный пароль! Пароль должен содержать от 7 символов!" }
                }
                if ("username" in errs) {
                    errObj = { ...errObj, username: "Некорректое имя пользователя!" }
                }
                setErrors(errObj)
            })

    }

    const getGroups = async () => {
        try {
            const { data } = await $api.get("groups/");
            setGroups(data.map(({ id, number }) => ({ value: id, label: number })))
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    useEffect(() => {
        getGroups()
    }, [])

    useEffect(() => {
        console.log(errors)
    }, [errors])


    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#D6D6D6",
                primary: "#D6D6D6",
                primary50: "#D6D6D6",
            }
        }
    }

    const getValue = () => {
        return activeGroup ? groups.find(e => e.value === activeGroup) : ""
    }

    const onChange = (newValue) => {
        setActiveGroup(newValue.value)
    }


    return (
        <div className={styles.wrapper}>
            <form onSubmit={e => register(e)}>
                <div className={styles.container}>
                    <img className={styles.bgImage} src={image} />
                    <div className={styles.auth}>
                        <div className={styles.back} onClick={() => { navigate(-1) }}>
                            <img alt="back" src={back} />
                            <p>Назад</p>
                        </div>
                        <p className={styles.title}>Регистрация в НОЦ Инфохимия</p>
                        <div className={styles.inputs}>
                            <Input2 placeholder="Введите ФИО..." onChange={e => setFields({ ...fields, fio: e.target.value })} />
                            <p className={styles.error}>{errors["fio"]}</p>
                            <Select
                                options={groups}
                                classNamePrefix="custom-select"
                                placeholder="Группы"
                                className="react-select-container"
                                theme={theme => customTheme(theme)}
                                value={getValue()}
                                noOptionsMessage={({ inputValue }) => !inputValue ? "Список пуст..." : "Список пуст..."}
                                onChange={onChange} />
                            <p className={styles.error}>{errors["group"]}</p>
                            <Input2 placeholder="Введите логин..." onChange={e => setFields({ ...fields, username: e.target.value })} />
                            <p className={styles.error}>{errors["username"]}</p>
                            <Input2 placeholder="Введите пароль..." type="password" onChange={e => setFields({ ...fields, password: e.target.value })} />
                            <p className={styles.error}>{errors["password"]}</p>
                        </div>
                        <div className={styles.buttons}>
                            <Button2 type={2}>Зарегистрироваться</Button2>
                        </div>
                    </div>
                </div>
            </form>
            {isAuth && <Navigate to="/" />}
        </div>
    )
}