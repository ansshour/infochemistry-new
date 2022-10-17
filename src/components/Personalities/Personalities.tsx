import { useState, createContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import $api from "../../http"
import { sleep } from "../../services/sleep"
import "../../utils/i18next"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Loader2 } from "../UI/Loader2/Loader2"
import styles from "./Personalities.module.css"
import { PersonalityCard } from "./PersonalityCard/PersonalityCard"



export const Personalities = () => {

    const { t } = useTranslation();

    const lang = localStorage.getItem("i18nextLng");

    const info = [
        { name: t("personalities.breadcrumbs.main"), link: "/" },
        { name: t("personalities.breadcrumbs.about"), link: "" },
        { name: t("personalities.breadcrumbs.personalities"), link: "/personalities" },
    ]

    const personalitiesCategories = [
        { id: 0, name: "Групп-лидеры", name_eng: "group_leader" },
        { id: 1, name: "Постдоки и стипендиаты ИТМО", name_eng: "postdoctoral" },
        { id: 2, name: "Аспиранты", name_eng: "doctoral_student" },
        { id: 3, name: "Магистранты", name_eng: "masters_student" },
        { id: 4, name: "Бакалавры", name_eng: "bachelor_student" },
        { id: 5, name: "Школьники", name_eng: "school_student" },
        { id: 6, name: "Алюмни", name_eng: "alumni" },
        { id: 7, name: "Персонал", name_eng: "staff" },
        { id: 8, name: "Администрация", name_eng: "administration" },
        { id: 9, name: "Практиканты", name_eng: "practice_student" },
    ]

    const [loader, setLoader] = useState(true)
    const [activePersonality, setActivePersonality] = useState({ id: 0, name_eng: "group_leader" })
    const [people, setPeople] = useState(null)

    const getPeopleByRole = async (role: string) => {
        try {
            const { data } = await $api.get(`/people/?role=${role}`);
            setPeople(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPeopleByRole(activePersonality.name_eng)
    }, [activePersonality])

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
                    <h1 className={styles.title}>{t("personalities.title")}</h1>
                    <div className={styles.search}>
                        <p className={styles.searchTitle}>Поиск</p>
                        <form className={styles.inputWrapper}>
                            <input type="text" placeholder="Введите имя..." className={styles.searchInput} />
                            <button className={styles.searchButton}>Найти</button>
                        </form>
                    </div>
                    <div className={styles.personalitiesCategories}>
                        {personalitiesCategories.map(({ id, name, name_eng }) => (
                            <p
                                className={activePersonality.id === id ? [styles.personalitiesCategory, styles.active].join(" ") : styles.personalitiesCategory}
                                key={id}
                                onClick={() => { setActivePersonality({ name_eng: name_eng, id: id }) }}>
                                {name}
                            </p>
                        ))}
                    </div>
                    <div className={styles.personalitiesCards}>
                        {people?.map(({ avatar, last_name, first_name, middle_name, last_name_eng, first_name_eng, middle_name_eng, bio, bio_eng, cv_file, phone, contact_email }) => (
                            <PersonalityCard
                                avatar={avatar}
                                name={lang === "ru" ? `${last_name} ${first_name} ${middle_name}` : `${last_name_eng} ${first_name_eng} ${middle_name_eng}`}
                                bio={lang === "ru" ? bio : bio_eng}
                                resume={cv_file}
                                phone={phone}
                                email={contact_email} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}