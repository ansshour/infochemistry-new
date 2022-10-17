import { Button } from "../UI/Button/Button"
import styles from "./Header.module.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "./res/logo.svg"
import logo_eng from "./res/logo_eng.png"
import { useTranslation } from "react-i18next"
import "../../utils/i18next"
import { useAuth } from "../../hoc/AuthProvider"
import { AuthService } from "../../services/auth.service"
import arrow from "./res/arrow.svg";
import arrow2 from "./res/arrowHeader.svg"
import { Button2 } from "../UI/Button2/Button2"
import settingsI from "./res/settings.svg"
import logoutI from "./res/logout.svg"
import $api from "../../http"
import lc from "./res/lc.svg"

export const Header = () => {

    const lang = localStorage.getItem("i18nextLng");

    const teacherGroups = [
        "administration",
        "practice_student",
        "staff",
        "doctoral_student",
        "postdoctoral",
        "group_leader",
    ]


    const isTeacher = (roles) => {
        let isTeacher = false;
        roles.forEach(role => {
            if (teacherGroups.includes(role)) {
                isTeacher = true;
            }
        })
        return isTeacher
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeElem, setActiveElem] = useState<number[]>([]);
    const [authHeader, setAuthHeader] = useState<any>("empty")



    const { t, i18n } = useTranslation();
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        window.location.reload();
    }

    const { isAuth, setIsAuth, setUser, user } = useAuth();

    const getUserInfo = async () => {
        setAuthHeader("empty")
        try {
            const data = await $api.get("/auth/user/");
            setAuthHeader(true)
        } catch (err) {
            setAuthHeader(false)
        }

    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const logout = () => {
        AuthService.logout()
        setIsAuth(false)
        setUser(null)
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("refresh")
        setAuthHeader(false)
    }

    const mobileMenuController = (i: number) => {
        if (activeElem.includes(i)) {
            setActiveElem(activeElem.filter(e => e !== i))
        } else {
            setActiveElem([...activeElem, i])
        }
    }

    let headerItems = [
        {
            name: t("header.Abiturients"), link: "#", id: "abit",
            subElems: [
                { name: t("header.Masters"), link: "/master" },
                { name: "Бакалавриат", link: "/bachelor" },
            ]
        },
        {
            name: t("header.Students"), link: "#", id: "stud",
            subElems: [
                { name: t("header.Schedule"), link: "/schedule" },
                { name: t("header.VideoLectures"), link: "/video_lectures" },
            ]
        },
        {
            name: t("header.Researches"), link: "#", id: "researches",
            subElems: [
                { name: t("header.MainDirections"), link: "/main_directions" },
                { name: t("header.Groups"), link: "/science_groups" },
                { name: t("header.Publications"), link: "/publications" },
                { name: t("header.Equipment"), link: "/equipment" },
            ]
        },
        { name: t("header.News"), link: "/news", id: "news" },
        {
            name: t("header.AboutTheCenter"), link: "#", id: "aboutus",
            subElems: [
                { name: t("header.AboutUs"), link: "/about" },
                { name: t("header.Personalities"), link: "/personalities" },
                { name: t("header.Vacancy"), link: "/vacancy" },
                { name: t("header.Contacts"), link: "/contacts" },
            ]
        },
        {
            name: t("header.OnlineEducation"), link: isAuth ? "/projects" : "/auth?online_education", id: "onlinestudy",
            // subElems: [
            //     { name: "Онлайн-лаборатория", link: "/online_lab" },
            //     { name: "Личный кабинет преподавателя", link: "/teacher_personal_account" },
            // ]
        },
    ]


    user?.roles.forEach((role) => {
        if (teacherGroups.includes(role)) {
            headerItems[5] = { name: t("header.OnlineEducation"), link: "/projects", id: "onlinestudy" }
        } else {
            headerItems[5] = { name: t("header.OnlineEducation"), link: "/projects", id: "onlinestudy" }
        }
    })


    const logArea = () => {
        if (authHeader === "empty") {
            return ""
        } else if (authHeader) {
            return (
                <div className={styles.user}>
                    <div className={styles.avatar} style={{ backgroundImage: `url(${user && user?.avatar})` }}></div>
                    <div className={styles.info}>
                        <p className={styles.name}>{`${user && user?.first_name} ${user && user?.last_name}`}</p>
                        <p className={styles.role}>{user && isTeacher(user?.roles) ? "Преподаватель" : "Студент"}</p>
                    </div>
                    <img alt="arrow" src={arrow2} height={6} />
                    <div className={styles.subUser}>
                        <Link to="/settings">
                            <div className={styles.subUserItem}>
                                <img alt="setting" src={settingsI} />
                                <div>Настройки</div>
                            </div>
                        </Link>
                        {user && isTeacher(user?.roles) && (
                            <Link to="/teacher_personal_account">
                                <div className={styles.subUserItem}>
                                    <img alt="lc" src={lc} />
                                    <div>ЛК преподавателя</div>
                                </div>
                            </Link>
                        )}
                        <div className={styles.subUserItem} onClick={logout}>
                            <img alt="logout" src={logoutI} />
                            <div>Выйти</div>
                        </div>
                    </div>
                </div>
            )
        } else if (!authHeader) {
            return (
                <Link to={"/auth"}><Button2 type={3}>{t("header.login")}</Button2></Link>
            )
        } else {
            return null
        }
    }



    return (
        <>
            <div className={styles.container__wrapper}>
                <div className={styles.container}>
                    {/* <a href="/">
                        <img src={lang === "ru" ? logo : logo_eng} className={styles.logo} alt="logo" />
                    </a> */}
                    {/* desktop menu */}
                    <nav className={styles.nav}>
                        <ul>
                            <Link to="/" className={styles.mainPageLink}>
                                <img src={lang === "ru" ? logo : logo} className={styles.logo} alt="logo" />
                            </Link>
                            {headerItems.map(({ name, link, subElems }) => {
                                return (
                                    <div className={styles.menuElement} key={name}>
                                        <li className={styles.navItem}>
                                            <div className={styles.headerItemWrapper}>
                                                <Link to={link}>{name}</Link>
                                                {subElems && <img alt="arrow" src={arrow2} />}
                                            </div>
                                            {subElems && (
                                                <ul className={styles.subMenu}>
                                                    {subElems?.map(({ name, link }) => {
                                                        return <Link key={name} to={link} className={styles.liNavWrapp}><li>{name}</li></Link>
                                                    })}
                                                </ul>
                                            )}
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                    </nav>
                    <div className={styles.buttons}>
                        {logArea()}

                    </div>
                    {/* desktop menu */}
                    {/* mobile menu */}
                    <div className={menuOpen ? [styles.burger, styles.open].join(" ") : styles.burger} onClick={() => { setMenuOpen(!menuOpen) }}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {/* mobile menu */}
                </div >
            </div >
            <div className={menuOpen ? [styles.burgerMenu, styles.open].join(" ") : styles.burgerMenu}>
                <nav className={styles.navMobile}>
                    <ul>
                        {headerItems.map(({ name, link, subElems }, i: number) => (
                            <div className={styles.wrapper__navitems__mobile} key={name}>
                                <div className={styles.navItem__mobile}>
                                    <Link to={link}>
                                        <div className={[styles.navitemExternal__mobile, styles.container__mobile].join(" ")} onClick={() => { mobileMenuController(i) }}>
                                            <p>{name}</p>
                                            {subElems && <img src={arrow} alt="arrow" className={activeElem?.includes(i) ? [styles.arrow, styles.active].join(" ") : styles.arrow} />}
                                        </div>
                                    </Link>
                                    <div className={activeElem?.includes(i) ? [styles.subElems__mobile, styles.show].join(" ") : styles.subElems__mobile}>
                                        {subElems?.map(({ name, link }) => <Link to={link} key={name}><div className={styles.menuSubItem__mobile}><p className={styles.container__mobile}>{name}</p></div></Link>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <div className={[styles.buttons, styles.buttonsMobile, styles.container__mobile].join(" ")}>
                        <div className={styles.langToggler} style={{ fontSize: "20px" }}>
                            <span onClick={() => { changeLanguage("ru") }} style={localStorage.getItem("i18nextLng") === "ru" ? { textDecoration: "underline" } : {}}>RU</span>
                            <span>/</span>
                            <span onClick={() => { changeLanguage("en") }} style={localStorage.getItem("i18nextLng") === "en" ? { textDecoration: "underline" } : {}}>EN</span>
                        </div>
                        {!isAuth ? (
                            <Link to={"/auth"}><Button>{t("header.login")}</Button></Link>
                        ) : (
                            <Button onClick={logout}>{t("header.logout")}</Button>
                        )}
                    </div>
                </nav>
            </div>
        </>
    )
}