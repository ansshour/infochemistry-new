import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Button } from "../UI/Button/Button"
import { CategoryButton } from "../UI/CategoryButton/CategoryButton"
import { SearchInput } from "../UI/SearchInput/SearchInput"
import { VacancyCard } from "../UI/VacancyCard/VacancyCard"
import styles from "./Vacancy.module.css"
import $api from "../../http"
import { useEffect, useState } from "react"
import { DataT } from "../../types/typesVacancy"
import { useTranslation } from "react-i18next"
import { Loader2 } from "../UI/Loader2/Loader2"
import { sleep } from "../../services/sleep"

export const Vacancy = () => {


    const { t } = useTranslation()
    const [loader, setLoader] = useState(true)

    const getTrueValuesObj = (obj: any) => {
        let prevKey = "";
        let results: any = {};
        const getTrueValuesObjInternal = (obj: any) => {
            Object.keys(obj).forEach(key => {
                if (typeof obj[key] === "object") {
                    prevKey = key;
                    getTrueValuesObjInternal(obj[key])
                } else if (obj[key] === true) {
                    results = { ...results, [prevKey]: key }
                }
            })
        }
        getTrueValuesObjInternal(obj)
        return results
    }

    const langOnPage = localStorage.getItem("i18nextLng");

    const info = [
        { name: t("vacancy.breadcrumbs.main"), link: "/" },
        { name: t("vacancy.breadcrumbs.aboutTheCenter"), link: "" },
        { name: t("vacancy.breadcrumbs.vacancy"), link: "/vacancy" },
    ]

    const [data, setData] = useState<DataT[] | null>(null)
    const [category, setCategory] = useState<any>({
        employment_type: {
            full_time: false,
            part_time: false,
        },
        experience: {
            none: false,
            from_1_to_3: false,
            from_3_to_6: false,
            from_6: false,
        },
        education: {
            none: false,
            bachelor: false,
            masters: false,
            postgraduate: false,
        }
    })
    const [search, setSearch] = useState("")

    useEffect(() => {
        getData({ ...getTrueValuesObj(category) })
    }, [category])

    const getData = async ({ education, employment_type, experience, lang }: DataT) => {
        try {
            let link = "";
            if (lang && langOnPage === "en") {
                link += "?lang=eng"
            } else {
                link += "?lang=ru"
            }
            if (education) {
                link += `&education=${education}`
            }
            if (employment_type) {
                link += `&employment_type=${employment_type}`
            }
            if (experience) {
                link += `&experience=${experience}`
            }
            if (search) {
                link += `&search=${search}`
            }

            const response = await $api.get(`jobs/${link}`);
            setData(response.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        if (langOnPage === "ru") {
            getData({})
        }
        if (langOnPage === "en") {
            getData({ lang: "eng" })
        }
    }, [])


    const onSearchHandler = (e) => {
        e.preventDefault()
    }

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
                    <h1 className={styles.title}>
                        {t("vacancy.title")}
                    </h1>
                    <div>
                        <div className={styles.search}>
                            <p className={styles.searchTitle}>Поиск</p>
                            <form className={styles.inputWrapper} onSubmit={e => onSearchHandler(e)}>
                                <input type="text" placeholder="Введите название новости" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value) }} className={styles.searchInput} />
                                <button className={styles.searchButton} onClick={() => { getData({ ...getTrueValuesObj(category), ...{ search: search } }) }}>Найти</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.vacancyContainer}>
                        <div className={styles.vacancyCards}>
                            {data?.length ? (
                                <>
                                    {data.map(({ name, name_eng, description, description_eng, employment_type, experience, education, has_english }: any, i: number) => {
                                        if (langOnPage === "en" && has_english) {
                                            return (
                                                <VacancyCard
                                                    key={i}
                                                    name={name}
                                                    categories={{ employment_type: employment_type, experience: experience, education: education }}
                                                    desc={description_eng} />
                                            )
                                        } else {
                                            return (
                                                <VacancyCard
                                                    key={i}
                                                    name={name}
                                                    categories={{ employment_type: employment_type, experience: experience, education: education }}
                                                    desc={description} />
                                            )
                                        }


                                    })}
                                </>
                            ) : (
                                <p className={styles.noVacancy}>
                                    Актуальный вакансий нет.
                                </p>
                            )}

                        </div>
                        <div className={styles.categoryBlock}>
                            <div className={styles.category}>
                                <p>{t("vacancy.byEmployment")}</p>
                                <div>
                                    <CategoryButton
                                        isActive={category.employment_type.full_time}
                                        color="#63c018"
                                        onClick={() => {
                                            setCategory({
                                                ...category,
                                                employment_type: {
                                                    full_time: !category.employment_type.full_time,
                                                    part_time: false,
                                                }
                                            })
                                        }}>{t("vacancy.fulltime")}</CategoryButton>
                                    <CategoryButton
                                        onClick={() => {
                                            setCategory({
                                                ...category,
                                                employment_type: {
                                                    full_time: false,
                                                    part_time: !category.employment_type.part_time,
                                                }
                                            })
                                        }}
                                        isActive={category.employment_type.part_time}
                                        color="#63c018">{t("vacancy.parttime")}</CategoryButton>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <p>{t("vacancy.byExperience")}</p>
                                <div>
                                    <CategoryButton
                                        onClick={() => {
                                            setCategory({
                                                ...category,
                                                experience: {
                                                    none: !category.experience.none,
                                                    from_1_to_3: false,
                                                }
                                            })
                                        }}
                                        isActive={category.experience.none}
                                        color="#229fff">{t("vacancy.noExp")}</CategoryButton>
                                    <CategoryButton
                                        onClick={() => {
                                            setCategory({
                                                ...category,
                                                experience: {
                                                    none: false,
                                                    from_1_to_3: !category.experience.from_1_to_3,
                                                }
                                            })
                                        }}
                                        isActive={category.experience.from_1_to_3}
                                        color="#63c018">{t("vacancy.1to3years")}</CategoryButton>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <p>{t("vacancy.ByLevel")}</p>
                                <div>
                                    <CategoryButton
                                        onClick={() => {
                                            setCategory({
                                                ...category,
                                                education: {
                                                    masters: !category.education.masters,
                                                    postgraduate: false,
                                                }
                                            })
                                        }}
                                        isActive={category.education.masters}
                                        color="#63c018">{t("vacancy.master")}</CategoryButton>
                                    <CategoryButton
                                        onClick={() => {
                                            setCategory({
                                                ...category,
                                                education: {
                                                    masters: false,
                                                    postgraduate: !category.education.postgraduate,
                                                }
                                            })
                                        }}
                                        isActive={category.education.postgraduate}
                                        color="#63c018">{t("vacancy.postgraduate")}</CategoryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}