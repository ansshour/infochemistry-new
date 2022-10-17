import { Button2 } from "../../UI/Button2/Button2"
import styles from "./Settings.module.css"
import user from "./res/user.png"
import { GrCheckmark } from "react-icons/gr"
import { AiOutlineEdit } from "react-icons/ai"
import $api from "../../../http"
import { useState, useEffect, useRef } from "react"
import { Loader2 } from "../../UI/Loader2/Loader2"
import { t } from "i18next"
import { toast } from "react-toastify"
import InputMask from "react-input-mask";
import show from "./res/show.svg"


export const Settings = () => {

    const lang = localStorage.getItem("i18nextLng");
    const imageRef = useRef<HTMLInputElement | null>(null)

    const [userInfo, setUserInfo] = useState(null)
    const [loader, setLoader] = useState(true)
    const [phoneEditable, setPhoneEditable] = useState(false)
    const [emailEditable, setEmailEditable] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)
    const [password, setPassword] = useState({ pass: "", passRepeat: "", typePass: "password", typePassRepeat: "password" })
    const [errorsPass, setErrorsPass] = useState({ differentPass: false, validPass: true })

    const getUserInfo = async () => {
        try {
            const { data } = await $api.get("/auth/user/");
            setUserInfo(data)
        } catch (err) {

        }
        setLoader(false)
    }

    const nameToFormat = (name: string, surname: string, midname: string) => `${surname} ${name} ${midname}`

    const needDesc = (userInfo) => {
        if (lang === "ru") {
            return userInfo.bio
        }
        if (lang === "eng") {
            return userInfo.bio_eng
        }
    }

    const isTeacher = (roles) => {

        const teacherGroups = [
            "administration",
            "practice_student",
            "staff",
            "doctoral_student",
            "postdoctoral",
            "group_leader",
        ]

        let isTeacher = false;
        roles.forEach(role => {
            if (teacherGroups.includes(role)) {
                isTeacher = true;
            }
        })
        return isTeacher
    }

    const getRoles = (userInfo) => {
        const roles = userInfo.roles.map(role => {
            return t(`videolecturesDetail.${role}`)
        })
        return roles.join(", ");
    }

    const onChangeImage = async (e) => {
        if (e.target.files) {
            const file = e.target.files;
            const formData = new FormData;
            try {
                formData.append("avatar", file[0])
                const { data } = await $api.put("/auth/user/", formData);
                setUserInfo({ ...userInfo, avatar: data.avatar })
                toast.success("Фотография профиля успешно установлена/изменена!")
            } catch (err) {
                toast.error("Ошибка!")
            }
        }
    }


    const sendPhone = async () => {
        try {
            await $api.put("/auth/user/", {
                phone: userInfo.phone.replace(/[^+\d]/g, ""),
            })
            setPhoneEditable(false)
            toast.success("Телефон успешно изменен!")
        } catch (err) {
            toast.error("Ошибка!")
        }
    }

    const sendEmail = async () => {
        try {
            await $api.put("/auth/user/", {
                contact_email: userInfo.email,
            })
            setEmailEditable(false)
            toast.success("Email успешно изменен!")
        } catch (err) {
            toast.error("Ошибка!")
        }
    }

    const deletePhoto = async () => {
        try {
            const { data } = await $api.put("/auth/user/", {
                avatar: null,
            })
            setEmailEditable(false)
            setUserInfo({ ...userInfo, avatar: data.avatar })
            toast.success("Фотография была успешно удалена!")
        } catch (err) {
            toast.error("Ошибка!")
        }
    }


    useEffect(() => {
        getUserInfo()
    }, [])


    const changePassword = async () => {
        try {
            const response = await $api.post("/auth/password/change/", {
                new_password1: password.pass,
                new_password2: password.passRepeat,
            })
            toast.success("Пароль успешно изменен!")
            setChangePasswordOpen(false)
            setErrorsPass({ validPass: true, differentPass: false })
        } catch (err) {
            console.error(err)
            if (password.pass !== password.passRepeat) {
                setErrorsPass({ ...errorsPass, differentPass: true })
            }
            toast.error("Ошибка!")
        } finally {

        }
    }

    return loader ? (
        <Loader2 />
    ) : (
        <div className={styles.container}>
            <div className={styles.avatarBlock}>
                <div className={styles.avatar} >
                    <img alt="avatar" className={userInfo.avatar ? styles.fullImg : ""} src={userInfo.avatar ? userInfo.avatar : user} />
                </div>
                <div onClick={() => { imageRef.current?.click() }}><Button2 type={2}>{userInfo.avatar ? "Изменить фото" : "Загрузить фото"}</Button2></div>
                <input type="file" ref={imageRef} onChange={e => onChangeImage(e)} hidden />
                {userInfo.avatar && <p className={styles.delBtn} onClick={deletePhoto}>Удалить фото</p>}
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{lang === "ru" ? nameToFormat(userInfo.first_name, userInfo.last_name, userInfo.middle_name) : nameToFormat(userInfo.first_name_eng, userInfo.last_name_eng, userInfo.middle_name_eng)}</p>
                <div className={styles.mainInfo}>
                    <div className={styles.isu}>
                        <p className={styles.title}>ИСУ</p>
                        <p className={styles.content}>{userInfo.isu_number ? userInfo.isu_number : "—"}</p>
                    </div>
                    <div className={styles.status}>
                        <p className={styles.title}>{isTeacher ? "Статус" : "Группа"}</p>
                        <p className={styles.content}>{isTeacher ? getRoles(userInfo) : userInfo.university_group_number}</p>
                    </div>
                </div>
                {needDesc(userInfo) && (
                    <div className={styles.description}>
                        <p className={styles.title}>Описание</p>
                        <p className={styles.descInfo}>Это описание отображается в персоналиях факультета</p>
                        <div className={styles.descContent}>
                            {lang === "ru" ? userInfo.bio : userInfo.bio_eng}
                        </div>
                    </div>
                )}
                <div className={styles.phone}>
                    <p className={styles.title}>Телефон</p>
                    <div className={styles.form}>
                        <InputMask
                            mask="+7(999)999-9999"
                            placeholder="Введите номер телефона.."
                            type="tel"
                            className={styles.input}
                            value={userInfo.phone}
                            disabled={!phoneEditable}
                            onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })} />
                        {phoneEditable ? (
                            <div className={styles.btn} onClick={sendPhone}>
                                <GrCheckmark />
                                <p>Сохранить</p>
                            </div>
                        ) : (
                            <div className={styles.btn} onClick={() => { setPhoneEditable(!phoneEditable) }}>
                                <AiOutlineEdit />
                                <p>Редактировать</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.email}>
                    <p className={styles.title}>Контактный email</p>
                    <div className={styles.form}>
                        <input
                            placeholder="Введите контактный email.."
                            className={styles.input}
                            disabled={!emailEditable}
                            value={userInfo.contact_email}
                            onChange={e => { setUserInfo({ ...userInfo, contact_email: e.target.value }) }} />
                        {emailEditable ? (
                            <div className={styles.btn} onClick={sendEmail}>
                                <GrCheckmark />
                                <p>Сохранить</p>
                            </div>
                        ) : (
                            <div className={styles.btn} onClick={() => { setEmailEditable(!emailEditable) }}>
                                <AiOutlineEdit />
                                <p>Редактировать</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.login}>
                    <p className={styles.title}>Логин</p>
                    <p className={styles.email}>{userInfo.contact_email}</p>
                </div>
                <div className={styles.changePassword}>
                    <p className={styles.title}>Пароль</p>
                    {!changePasswordOpen ? (
                        <div className={styles.btnWrap}><Button2 type={2} onClick={() => { setChangePasswordOpen(true) }}>Изменить</Button2></div>
                    ) : (
                        <div className={styles.passWrapp}>
                            <div className={styles.password}>
                                <p>Новый пароль</p>
                                <div className={styles.inputWrapp}>
                                    <input className={styles.inputPass} type={password.typePass} value={password.pass} onChange={e => setPassword({ ...password, pass: e.target.value })} />
                                    <img src={show} alt="show" onClick={() => { setPassword({ ...password, typePass: password.typePass === "password" ? "text" : "password" }) }} />
                                </div>
                                {!errorsPass.validPass && <p className={styles.newPassError}>Пароли не совпадают</p>}
                            </div>
                            <div className={styles.password}>
                                <p>Повторите новый пароль</p>
                                <div className={styles.inputWrapp}>
                                    <input className={styles.inputPass} type={password.typePassRepeat} value={password.passRepeat} onChange={e => setPassword({ ...password, passRepeat: e.target.value })} />
                                    <img src={show} alt="show" onClick={() => { setPassword({ ...password, typePassRepeat: password.typePassRepeat === "password" ? "text" : "password" }) }} />
                                </div>
                                {errorsPass.differentPass && <p className={styles.newPassError}>Пароли не совпадают</p>}
                            </div>
                            <div className={styles.buttonsChangePass}>
                                <div className={styles.btnWrap}><Button2 type={1} onClick={changePassword}>Изменить</Button2></div>
                                <div className={styles.btnWrap}><Button2 type={2} onClick={() => { setChangePasswordOpen(false) }}>Отмена</Button2></div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}