import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Button } from "../../UI/Button/Button"
import { Input } from "../../UI/Input/Input"
import styles from "./Restore.module.css"

export const Restore = () => {

    const { t, i18n } = useTranslation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        window.location.reload();
    }

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <div className={styles.top}>
                    <p className={styles.title}>{t("restorePass.title")}</p>
                    <p className={styles.info}>{t("restorePass.subtitle")}</p>
                    <div className={styles.inputs}>
                        <Input placeholder="e-mail" width={300} height={38} style={{ fontSize: "18px" }} />
                    </div>
                    <Button width="171" height="33px" style={{ margin: "50px auto" }}>{t("restorePass.done")}</Button>
                </div>
                <div className={styles.footer}>
                    <div className={styles.langToggler}>
                        <span className={styles.ru} onClick={() => { changeLanguage("ru") }} style={localStorage.getItem("i18nextLng") === "ru" ? { textDecoration: "underline" } : {}}>RU</span>
                        <span>/</span>
                        <span className={styles.en} onClick={() => { changeLanguage("en") }} style={localStorage.getItem("i18nextLng") === "en" ? { textDecoration: "underline" } : {}}>EN</span>
                    </div>
                    <Link className={styles.register} to="/auth">{t("restorePass.auth")}</Link>
                </div>
            </div>
        </div>
    )
}