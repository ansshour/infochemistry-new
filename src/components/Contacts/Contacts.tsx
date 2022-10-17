import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import styles from "./Contacts.module.css"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { ChangeEvent, useEffect, useState } from "react";
import $api from "../../http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { sleep } from "../../services/sleep";
import { Loader2 } from "../UI/Loader2/Loader2";


const Maps = () => (

    <YMaps>
        <YMaps>
            <Map defaultState={{
                center: [59.927288, 30.338353],
                zoom: 18,
            }} width="100%" height="350px">
                <Placemark geometry={[59.927288, 30.338353]} />
            </Map>
        </YMaps >
    </YMaps >
);

export const Contacts = () => {

    const [loader, setLoader] = useState(true)

    const [contactForm, setContactForm] = useState({ email: "", name: "", text: "" })

    const { t } = useTranslation()
    const lang = localStorage.getItem("i18nextLng");

    const sendMessage = async () => {
        try {
            const response = await $api.post("feedback/", { email: contactForm.email, name: contactForm.name, text: contactForm.text });
            lang === "ru" ? toast.success("Ваше сообщение успешно отправлено!") : toast.success("Your message has been sent successfully!")
        } catch (err) {
            lang === "ru" ? toast.error("Ошибка отправки сообщения! Все поля должны быть заполнены!") : toast.error("Error sending a message! All fields must be filled in!")
        }

    }

    const info = [
        { name: t("contacts.breadcrumbs.main"), link: "/" },
        { name: t("contacts.breadcrumbs.aboutTheCenter"), link: "" },
        { name: t("contacts.breadcrumbs.contacts"), link: "/contacts" },
    ]

    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])

    return (
        <>
            <Breadcrumbs info={info} />
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <h1 className={styles.titleH}>
                        {t("contacts.title")}
                    </h1>
                    <div className={styles.contacts}>
                        <div className={styles.contact}>
                            <div className={styles.post}>
                                <p className={styles.title}> {t("contacts.director")}</p>
                                <p> {t("contacts.directorName")}</p>
                            </div>
                            <div className={styles.number}>
                                <p className={styles.title}>{t("contacts.phoneNumber")}</p>
                                <p><a href="tel:+79992103977">+7 (999) 210-39-77</a></p>
                            </div>
                            <div className={styles.email}>
                                <p className={styles.title}>{t("contacts.email")}</p>
                                <p><a href="mailto:skorb@itmo.ru">skorb@itmo.ru</a></p>
                            </div>

                        </div>
                        <div className={styles.contact}>
                            <div className={styles.post}>
                                <p className={styles.title}>{t("contacts.Project")}</p>
                                <p>{t("contacts.ProjectName")}</p>
                            </div>
                            <div className={styles.number}>
                                <p className={styles.title}>{t("contacts.phoneNumber")}</p>
                                <p><a href="tel:+79819550382">+7 (981) 955-03-82</a></p>
                            </div>
                            <div className={styles.email}>
                                <p className={styles.title}>{t("contacts.email")}</p>
                                <p><a href="mailto:nasonova@itmo.ru">nasonova@itmo.ru</a></p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.address}>
                        <p className={styles.title}>{t("contacts.Address")}</p>
                        <p><a href="https://yandex.ru/maps/org/universitet_itmo/1017559385/?indoorLevel=1&ll=30.338353%2C59.927288&utm_source=main_stripe_big&z=17" target="_blank">{t("contacts.AddressContent")} </a></p>
                    </div>
                    <div className={styles.map}>
                        <Maps />
                    </div>
                    <div className={styles.line}>

                    </div>
                    {/* <div className={styles.contactForm}>
                    <div className={styles.text}>
                        <p className={styles.contactFormTitle}>{t("contacts.writeToUs")}</p>
                        <p className={styles.contactFormDesc}>{t("contacts.feedbackText")}</p>
                    </div>
                    <div className={[styles.form, styles.first].join(" ")}>
                        <Input
                            placeholder="e-mail"
                            width={285}
                            height={38}
                            fontsize={18}
                            value={contactForm.email}
                            style={{ height: "38px" }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setContactForm({ ...contactForm, email: e.target.value }) }} />
                        <Input
                            placeholder={t("contacts.name")}
                            width={285}
                            height={38}
                            fontsize={18}
                            value={contactForm.name}
                            style={{ height: "38px" }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setContactForm({ ...contactForm, name: e.target.value }) }} />
                    </div>
                    <div className={[styles.form, styles.second].join(" ")}>
                        <textarea
                            className={styles.message}
                            placeholder={t("contacts.message")}
                            value={contactForm.text}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setContactForm({ ...contactForm, text: e.target.value }) }} />
                    </div>
                    <div className={styles.useless}>

                    </div>
                    <p className={styles.personalData}>{t("contacts.personalSuccess")}</p>
                    <div className={styles.submit}>
                        <div><Button width="131" height="33" onClick={sendMessage}>{t("contacts.send")}</Button></div>
                    </div>
                </div> */}
                </div>
            )}
        </>
    )
}