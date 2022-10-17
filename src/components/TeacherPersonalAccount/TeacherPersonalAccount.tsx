import React, { useEffect, useMemo, useRef, useState } from "react";
import { Accordion } from "../UI/Accordion/Accordion"
import { Button } from "../UI/Button/Button";
import styles from "./TeacherPersonalAccount.module.css"
import selected from "./res/selected.svg"
import { SearchInput } from "../UI/SearchInput/SearchInput";
import { StudentCard } from "./studentCard/StudentCard";
import $api from "../../http";
import { useAuth } from "../../hoc/AuthProvider";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Loader2 } from "../UI/Loader2/Loader2";
import { Footer } from "../Footer/Footer";
import back from "./res/back.svg"
import { Button2 } from "../UI/Button2/Button2";


type List = {
    item: string;
    id: number;
}


export const TeacherPersonalAccount = () => {


    const { t } = useTranslation()

    const navigate = useNavigate()

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let exit = false;

    const lang = localStorage.getItem("i18nextLng");

    const { user, isAuth } = useAuth()

    const [activeLab, setActiveLab] = useState<any>({});
    const [labNames, setLabNames] = useState([])
    const [students, setStudents] = useState([])
    const [loader, setLoader] = useState(false)
    const [fixed, setFixed] = useState(false)
    const [isLeftBarOpen, setLeftBarOpen] = useState(true)
    const [maxScore, setMaxScore] = useState(null)

    const getLabsInfo = async () => {
        setLoader(true)
        const { data } = await $api.get(`labs/teacher/`);
        let firstLab;
        Object.keys(data[0]).forEach(key => {
            if (key === "id" || key === "name") {
                firstLab = { ...firstLab, [key]: data[0][key] }
            }
        })
        firstLab && setActiveLab(firstLab)
        setLabNames(data)
        setLoader(false)
    }

    const getResults = async () => {
        try {
            const { data } = await $api.get(`labs/${activeLab.id}/teacher_results/`);
            const forLabScore = await $api.get(`labs/${activeLab.id}/`);
            setMaxScore(forLabScore.data.questions.length)
            setStudents(data)
            console.log(data)
        } catch (err) {

        }

    }

    const downloadReport = () => {
        const token = localStorage.getItem("token");
        axios.defaults.baseURL = 'https://new.infochemistry.ru';
        axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
        axios
            .get(`/api/labs/${activeLab.id}/download_table/`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.csv');
                document.body.appendChild(link);
                link.click();
            });
    }

    useEffect(() => {
        getLabsInfo()
        getResults()
    }, [])

    const deleteLab = async () => {
        try {
            const response = await $api.delete(`labs/${activeLab.id}`)
            window.location.href = "/teacher_personal_account?delete=1";
        } catch (err) {
            lang === "ru" ? toast.error("Ошибка удаления лабораторной работы!") : toast.error("Error deleting lab work!")
        }
    }





    useEffect(() => {
        getResults()
    }, [activeLab])

    const teacherGroups = [
        "administration",
        "practice_student",
        "staff",
        "doctoral_student",
        "postdoctoral",
        "group_leader",
    ]

    useEffect(() => {
        let counter = 0;
        $api.get("auth/user/")
            .then(({ data }) => {
                data.roles.forEach((role) => {
                    if (teacherGroups.includes(role)) {
                        counter++;
                    }
                })
                if (counter === 0) {
                    navigate("/")
                }
                return data
            })
            .catch((err) => {
                navigate("/")
            })
    }, [])

    useEffect(() => {
        if (params.success === "1") {
            lang === "ru" ? toast.success("Лабораторная работа была успешно создана!") : toast.success("The lab work has been successfully created!")
        }
        if (params.success === "2") {
            lang === "ru" ? toast.success("Лабораторная работа была успешно отредактирована!") : toast.success("The lab work has been successfully edited!")
        }
        if (params.delete === "1") {
            lang === "ru" ? toast.success("Лабораторная работа была успешно удалена!") : toast.success("The lab work was successfully deleted!")
        }
    }, [])

    // useEffect(() => {
    //     const sidebar = document.querySelector("#left__inner");
    //     const offset = sidebar.getBoundingClientRect().top + document.body.scrollTop;
    //     document.addEventListener("scroll", () => {
    //         if (window.scrollY > offset) {
    //             setFixed(true)
    //         } else {
    //             setFixed(false)
    //         }
    //     })
    // }, [])

    const [labsData, setLabsData] = useState()




    return (
        <div className={styles.container}>

            <div className={styles.wrapper} style={!isLeftBarOpen ? { gridTemplateColumns: "72px 3fr 250px" } : {}}>
                <div className={styles.left}>
                    <div className={fixed ? [styles.left__inner, styles.fixed].join(" ") : styles.left__inner} id="left__inner" style={!isLeftBarOpen ? { width: "70px" } : {}}>
                        <div className={styles.title} onClick={() => { setLeftBarOpen(!isLeftBarOpen) }}>
                            <img alt="back" src={back} style={!isLeftBarOpen ? { transform: "scaleX(-1)" } : {}} />
                            <p style={!isLeftBarOpen ? { display: "none" } : {}}>Проекты</p>
                        </div>
                        <div className={styles.labList} style={!isLeftBarOpen ? { display: "none" } : {}}>
                            {!labNames.length && <p>{t("teacherPersonalAccount.noLabs")}</p>}
                            {labNames.map(({ name, id }, i) => (
                                <div
                                    key={id}
                                    style={activeLab.id === id ? { backgroundColor: "#79f3ec" } : {}}
                                    onClick={() => { setActiveLab({ name: name, id: id }) }}
                                    className={styles.labListItem}>
                                    <p>{name}</p>
                                </div>
                            ))}
                        </div>
                        <a href="/createlab" className={styles.buttonWrapp} style={!isLeftBarOpen ? { display: "none" } : {}}><Button2 type={2} style={{ width: "100%" }}>{t("teacherPersonalAccount.add")}</Button2></a>
                    </div>
                </div>
                <div className={styles.wrapper__main}>
                    <div className={styles.main}>
                        <div className={styles.top}>
                            <p className={styles.title__main}>{`Успеваемость.`}</p>
                            {/* <SearchInput
                            style={{ maxWidth: "250px", justifySelf: "end", borderRadius: "20px" }}
                            placeholder={t("teacherPersonalAccount.search")}
                        /> */}
                        </div>
                        <div className={styles.table}>
                            <div className={styles.tableHead}>
                                <p className={styles.headTable}>{t("teacherPersonalAccount.fio")}</p>
                                <p className={styles.headTable}>{t("teacherPersonalAccount.group")}</p>
                                <p className={styles.headTable}>{t("teacherPersonalAccount.questionsPassed")}</p>
                                <p className={styles.headTable}>{t("teacherPersonalAccount.downloadReport")}</p>
                                <p className={styles.headTable}>{t("teacherPersonalAccount.PassedMark")}</p>
                            </div>
                            {students.map(({ id, test_passed, accepted, user, report_filename, last_score }) => <StudentCard
                                id={id}
                                test_passed={test_passed}
                                accepted={accepted}
                                user={user}
                                key={id}
                                report_filename={report_filename}
                                labId={activeLab.id}
                                maxScore={maxScore}
                                score={last_score} />)}
                        </div>

                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.right__inner}>
                        <div className={styles.performance}>
                            <p className={styles.performanceTitle}>{t("teacherPersonalAccount.performance")}</p>
                            <p className={styles.performanceDesc}>Выгрузите таблицу упеваемости по проекту</p>
                            <div className={styles.button__wrapper}><Button2 style={{ width: "100%", padding: "7px 25px" }} onClick={downloadReport} type={2}>{t("teacherPersonalAccount.downloadTable")}</Button2></div>
                        </div>
                        <div className={styles.actions}>
                            <p className={styles.titleActions}>Действия</p>
                            <div className={styles.button__wrapper}><Button2 type={2} style={{ width: "100%", marginBottom: "15px" }} onClick={() => { window.location.href = `/createLab/${activeLab.id}` }}>{t("teacherPersonalAccount.create")}</Button2></div>
                            <div className={styles.button__wrapper}><Button2 type={2} style={{ width: "100%" }} onClick={deleteLab}>{t("teacherPersonalAccount.delete")}</Button2></div>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.footer}>
                    <Footer />
                </div> */}
            </div>
        </div >
    )
}