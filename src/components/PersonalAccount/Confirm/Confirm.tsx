import { useTranslation } from "react-i18next"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../../../hoc/AuthProvider"
import { Button } from "../../UI/Button/Button"
import { Input } from "../../UI/Input/Input"
import styles from "./Confirm.module.css"
import image from "./res/dnk.gif"
import back from "./res/back.svg"
import { Button2 } from "../../UI/Button2/Button2"

export const Confirm = () => {

    const { t, i18n } = useTranslation()
    const { isAuth } = useAuth()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        window.location.reload();
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img className={styles.bgImage} src={image} />
                <div className={styles.auth}>
                    <div className={styles.text}>
                        <p className={styles.header}>Вы успешно зарегистрировались!</p>
                        <p className={styles.info}>Дождитесь подтверждения вашего аккаунта!</p>
                    </div>
                    <Link to={"/"}><Button2 type={1}>На главную</Button2></Link>
                </div>
            </div>
            {isAuth && <Navigate to="/" />}
        </div>
    )
}