import styles from "./Footer.module.css"
import $api from "../../http";
import { useTranslation } from "react-i18next";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import vk from "./res/vk.svg"
import inst from "./res/inst.svg"
import mark from "./res/mark.png"
import phone from "./res/phone.png"
import mail from "./res/mail.png"
import logo from "./res/logo.png"
import image from "./res/image.png"


export const Footer = () => {


    const lang = localStorage.getItem("i18nextLng");



    const [email, setEmail] = useState("")

    const subscribe = async () => {
        try {
            const response = await $api.post("mailing/subscription/", { email: email });
            lang === "ru" ? toast.success("Вы успешно подписаны на рассылку!") : toast.success("You have successfully subscribed to the newsletter!")
        } catch (err) {

            lang === "ru" ? toast.error("Ошибка подписки на рассылку! Введите email.") : toast.error("Newsletter subscription error! Enter your email.")
        }

    }

    return (
        <div className={styles.footerInner}>
            <div className={styles.container}>
                <div className={[styles.footer, styles.footer_first].join(" ")} style={(window.location.pathname === "/") ? {} : { paddingTop: "69px" }}>
                    <div className={styles.left}>
                        {!(window.location.pathname === "/") && (
                            <div className={styles.recordWrapperSecondary}>
                                <div className={styles.logo}>
                                    <img alt="logo" src={logo} />
                                    <p>НОЦ Инфохимии</p>
                                </div>
                                <div className={styles.recordBlockSecondary}>
                                    <p className={styles.descNews}>Получай новости НОЦ первым</p>
                                    <div className={styles.inputBlock}>
                                        <input placeholder="Введите почту..." value={email} onChange={(e) => setEmail(e.target.value)} className={styles.getNewsInput} />
                                        <button className={styles.subscribe} onClick={subscribe}>Подписаться</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.right}>
                        <div className={styles.rightFirst}>
                            <div className={styles.socialNetworks}>
                                <div className={styles.vk}><img src={vk} alt="vk" /></div>
                                <div className={styles.inst}><img className={styles.instImg} src={inst} alt="inst" /></div>
                            </div>
                            <div className={styles.contacts}>
                                <a className={styles.address} href="https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_lomonosova_9/Z0kYdQRoSkAEQFtjfXVzdn5rbA==/?ll=30.338353%2C59.927288&z=17" target="_blank" rel="noreferrer">
                                    <img alt="mark" src={mark} />
                                    <p>Санкт-Петербург, Ломоносова, д. 9, 191002</p>
                                </a>
                                <a className={styles.mail} href="mailto:skorb@itmo.ru" target="_blank" rel="noreferrer">
                                    <img alt="mark" src={mail} />
                                    <p>skorb@itmo.ru</p>
                                </a>
                                <a className={styles.phone} href="tel:+79992103977" target="_blank" rel="noreferrer">
                                    <img alt="mark" src={phone} />
                                    <p>+7-999-210-39-77</p>
                                </a>
                            </div>
                            <p className={styles.itmo}>© 2022 ITMO University. All rights reserved</p>
                        </div>
                        <div className={styles.rightFirst}>
                            <div className={styles.links}>
                                <a href="#" className={styles.link}>Абитуриентам</a>
                                <a href="#" className={styles.link}>Студентам</a>
                                <a href="#" className={styles.link}>Исследования</a>
                                <a href="#" className={styles.link}>Новости</a>
                                <a href="#" className={styles.link}>О центре</a>
                                <a href="#" className={styles.link}>Онлайн-образование</a>
                            </div>
                            <a href="#" className={styles.personalS}>Пользовательское соглашение</a>
                            <p className={[styles.itmo, styles.mobile].join(" ")}>© 2022 ITMO University. All rights reserved</p>
                        </div>
                    </div>
                    {(window.location.pathname === "/") && <div className={styles.getNews}>
                        <div className={styles.getNewsTitle}>
                            <img alt="logo" src={logo} />
                            <p>НОЦ Инфохимии</p>
                        </div>
                        <p className={styles.descNews}>Получай новости НОЦ первым</p>
                        <div className={styles.inputBlock}>
                            <input placeholder="Введите почту..." value={email} onChange={(e) => setEmail(e.target.value)} className={styles.getNewsInput} />
                            <button className={styles.subscribe} onClick={subscribe}>Подписаться</button>
                        </div>
                        {/* <img alt="image" src={image} className={styles.inputImg} /> */}
                    </div>}

                </div>
            </div>
        </div>
    )
}