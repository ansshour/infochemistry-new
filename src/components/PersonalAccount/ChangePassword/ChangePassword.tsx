import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button } from "../../UI/Button/Button"
import { Input } from "../../UI/Input/Input"
import styles from "./ChangePassword.module.css"

export const ChangePassword = () => {

    const { t, i18n } = useTranslation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        window.location.reload();
    }


    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <div className={styles.top}>
                    <p className={styles.title}>{t("changePass.title")}</p>
                    <div className={styles.inputs}>
                        <Input placeholder={t("changePass.password")} width={300} height={38} style={{ fontSize: "18px" }} />
                        <Input placeholder={t("changePass.password2")} width={300} height={38} style={{ fontSize: "18px" }} password={true} />
                    </div>
                    <Button width="171" height="33px" style={{ margin: "50px auto" }}>{t("changePass.Join")}</Button>
                </div>
                <div className={styles.footer}>
                    <div className={styles.langToggler}>
                        <span className={styles.ru} onClick={() => { changeLanguage("ru") }} style={localStorage.getItem("i18nextLng") === "ru" ? { textDecoration: "underline" } : {}}>RU</span>
                        <span>/</span>
                        <span className={styles.en} onClick={() => { changeLanguage("en") }} style={localStorage.getItem("i18nextLng") === "en" ? { textDecoration: "underline" } : {}}>EN</span>
                    </div>
                    <Link className={styles.register} to="/auth">{t("changePass.Join")}</Link>
                </div>
            </div>
        </div>
    )
}