import React, { useEffect, useRef, useState } from "react";
import { Accordion } from "../UI/Accordion/Accordion"
import { Button } from "../UI/Button/Button";
import styles from "./LaboratoryWork.module.css"
import { Question } from "./Question/Question";
import $api from "../../http";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hoc/AuthProvider";
import { Loader } from "../UI/Loader/Loader";
import { useTranslation } from "react-i18next";
import { Loader2 } from "../UI/Loader2/Loader2";
import fileImage from "./res/file.svg"
import back from "./res/back.svg"
import { Button2 } from "../UI/Button2/Button2";
import { Modal } from "../UI/Modal/Modal";
import { sleep } from "../../services/sleep";





type List = {
    item: string;
    id: number;
}


export const LaboratoryWork = () => {



    const { t } = useTranslation()
    const lang = localStorage.getItem("i18nextLng");

    const navigate = useNavigate()

    const [activeLab, setActiveLab] = useState<any>({});


    const loadRef = useRef<HTMLInputElement | null>(null)
    const [reportState, setReportState] = useState<"notLoad" | "load" | "send" | "empty">("empty")
    const [file, setFile] = useState<any>()
    const [activeLabData, setActiveLabData] = useState<any>()
    const [questionAnswers, setQuestionAnswers] = useState<any>({})
    const [testStatus, setTestStatus] = useState<"notSend" | "passed" | "notPassed" | "wasPassed" | "empty" | "answersError">("empty")
    const [fileName, setFileName] = useState<null | string>(null)
    const [acceptDate, setAcceptDate] = useState<null | string>(null)
    const [contentLab, setContentLab] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [isLeftBarOpen, setLeftBarOpen] = useState(true)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [content, setContent] = useState<any>([])
    const [loader, setLoader] = useState(true)


    const getLabsInfo = async () => {
        const { data } = await $api.get("/labs/");
        let firstLab;
        Object.keys(data[0]).forEach(key => {
            if (key === "id" || key === "name") {
                firstLab = { ...firstLab, [key]: data[0][key] }
            }
        })
        firstLab && setActiveLab(firstLab)
    }



    useEffect(() => {
        getLabsInfo()
    }, [])

    useEffect(() => {
        if (activeLab) {
            getLabById(activeLab.id)
        }
    }, [activeLab])

    const onChangeInputLoadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files;
            setFileName(file[0]["name"])
            const formData = new FormData();
            formData.append("report", file[0])
            setFile(formData)
            setReportState("load")
        }

    }

    const loadLabFile = async () => {
        try {
            const response = await $api.put(`labs/${activeLab.id}/my_results/upload_report/`, file)
            const { data } = await $api.get(`labs/${activeLab.id}/my_results/`);
            if (data.report_filename) {
                setFileName(data.report_filename)
            }
            lang === "ru" ? toast.success("Отчет был успешно отправлен!") : toast.success("The report was successfully sent!")
            setReportState("send")
        } catch (err) {
            lang === "ru" ? toast.error("Ошибка отправки отчета!") : toast.error("Error sending the report!")
        }
        setConfirmModalOpen(false)
    }

    const getLabById = async (id: number) => {
        try {
            if (id) {
                const { data } = await $api(`labs/${id}/`)
                setActiveLabData(data)

            }
        } catch (err) {

        }
    }


    const loadBtnClick = () => {
        loadRef.current?.click();
    }

    const changeLab = (id: number, name: string, page: number) => {
        setActiveLab({ name: name, id: id })
        // getLabById(id)
        setCurrentPage(page)
        navigate(`/online_lab?lab=${activeLab.id}&page=${page}&name=${name}`)
    }


    function createMarkup(content: any) {
        return { __html: content };
    }


    const submitTest = async () => {
        try {
            const forSend = Object.keys(questionAnswers).map(key => questionAnswers[key]).filter(item => item.length)
            const { data } = await $api.post(`labs/${activeLab.id}/submit_test/`, { answers: forSend })
            if (data.test_passed) {
                setTestStatus("passed")
            }
            if (!data.test_passed) {
                setTestStatus("notPassed")
            }
        } catch (err) {
            if (err.response.data["detail"] === "Number of answers is not equal to number of questions") {
                // setTestStatus("answersError")
                toast.error("Чтобы завершить тест, вы должны ответить на все вопросы!")
            } else if (err.response.status === 400) {
                setTestStatus("wasPassed")
            }
        }

    }



    const getResults = async () => {
        if (activeLab.id) {
            const { data } = await $api.get(`labs/${activeLab.id}/my_results/`);
            if (data.test_passed) {
                setTestStatus("passed")
            } else {
                setTestStatus("notSend")
            }
            if (!data.report_filename) {
                setReportState("notLoad")
            } else {
                setFileName(data.report_filename)
                setReportState("send")
            }
            if (data.date_accepted) {
                setAcceptDate(data.date_accepted)
                setReportState("send")
            }
        }
    }

    useEffect(() => {
        if (activeLab) {
            getResults()
        }
    }, [activeLab])


    useEffect(() => {
        $api.get("auth/user/")
            .then(({ data }) => {
                return data
            })
            .catch((err) => {
                navigate("/")
            })
    }, [])



    const getLabListById = async () => {
        let labs = [];
        const { data } = await $api.get("labs/");
        const withContent = data.map(async (item) => {
            let next = true;
            let currentPage = 1;
            let contentList = [];
            while (next) {
                const response = await $api.get(`labs/${item.id}/content/?page=${currentPage}`)
                contentList.push(response.data.text)
                next = response.data.next;
                currentPage++;
            }
            return { ...item, contentList: contentList }
        })
        const result = await Promise.all(withContent);
        setContent(result)
        await sleep(500)
        setLoader(false)
        return result
    }

    useEffect(() => {
        getLabListById().then(data => setContentLab(data[0].contentList[0]))
    }, [])


    const parseTitle = (text: string) => {
        const div = document.createElement("div");
        div.innerHTML = text;
        return div.querySelector("h1")?.innerText
    }

    const labContent = () => {
        if (loader) {
            return null
        } else if (content.length) {
            return <div className={styles.lab} dangerouslySetInnerHTML={createMarkup(contentLab)} />
        } else {
            return (
                <div className={styles.noLabContentWrapp}>
                    <div className={styles.noLabContent}>
                        <p>Пока что здесь нет ни одного проекта
                            Попробуйте зайти позже</p>
                        <Button2 type={1} onClick={() => { navigate(-1) }}>Вернуться</Button2>
                    </div>
                </div>
            )
        }
    }

    const labList = () => {
        if (loader) {
            return null
        } else if (content.length) {
            return (
                content.map(({ name, id, contentList }, i) => (
                    contentList.length > 1 ? (
                        <Accordion
                            key={id}
                            name={name}
                            type={2}
                            needOpen={i === 0 ? true : false}>
                            {
                                contentList.map((item, i) => {
                                    const labId = id;
                                    const nameLab = name;
                                    return (
                                        <div
                                            key={i}
                                            className={[styles.labListItem, styles.accordionItem].join(" ")}
                                            onClick={() => { setContentLab(item); changeLab(id, name, i + 1) }}
                                            style={activeLab.id === labId && currentPage === i + 1 ? { backgroundColor: "#79f3ec" } : {}}>
                                            {<p>{parseTitle(item)}</p> || `${i + 1} часть`}
                                        </div>
                                    )
                                })
                            }
                        </Accordion>) : (
                        <div
                            key={id}
                            className={styles.labListItemS}
                            onClick={() => { changeLab(id, name, 1); setContentLab(contentList[0]) }}
                            style={activeLab.id === id ? { backgroundColor: "#79f3ec" } : {}}
                        >
                            <p>{name}</p>
                        </div>
                    )
                ))
            )
        } else {
            return (<p className={styles.noProject}>Мы работаем над добавлением новых проектов.</p>)

        }
    }


    return (
        <>
            <>
                <div className={styles.container}>
                    {loader ? (
                        <Loader2 />
                    ) : (
                        <div
                            className={styles.wrapper}
                            style={!isLeftBarOpen ? { gridTemplateColumns: "72px 3fr 250px" } : {}}>
                            <div className={styles.left}>
                                <div className={styles.left__inner} id="left__inner" style={!isLeftBarOpen ? { backgroundColor: "white", width: "70px" } : {}}>
                                    <div className={styles.title} onClick={() => { setLeftBarOpen(!isLeftBarOpen) }}>
                                        <img alt="back" src={back} style={!isLeftBarOpen ? { transform: "scaleX(-1)" } : {}} />
                                        <p style={!isLeftBarOpen ? { display: "none" } : {}}>Проекты</p>
                                    </div>
                                    <div className={styles.labList} style={!isLeftBarOpen ? { display: "none" } : {}}>
                                        {labList()}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.mainInner}>
                                <div className={styles.main__wrapper}>
                                    {loader ? (
                                        ""
                                    ) : (
                                        <div className={styles.main}>
                                            {labContent()}
                                            {activeLabData?.questions.length ? (
                                                <div className={styles.quiz}>
                                                    {testStatus === "notSend" && (
                                                        <>
                                                            <p className={styles.quiz__title}>{t("onlineLab.questions")}</p>
                                                            <div className={styles.questions}>
                                                                {activeLabData && activeLabData.questions.map(({ number, text, multiple_choice, choices, id, image }) => <Question image={image} questionAnswers={questionAnswers} setQuestionAnswers={setQuestionAnswers} key={id} number={number} title={text} manyAnswer={multiple_choice} choices={choices} id={id} />)}
                                                            </div>

                                                            <div style={{ margin: "15px", display: "flex", justifyContent: "center" }}><Button2 onClick={submitTest} type={2}>Отправить</Button2></div>
                                                        </>
                                                    )}
                                                    {testStatus === "passed" && (
                                                        <div className={styles.passed}>
                                                            <p className={styles.quizStatus__title}>{t("onlineLab.questions")}</p>
                                                            <p className={styles.status__text}>{t("onlineLab.success1")}<span style={{ color: "#63C018" }}>{t("onlineLab.success2")}</span>{t("onlineLab.success3")}</p>
                                                        </div>
                                                    )}
                                                    {testStatus === "notPassed" && (
                                                        <div className={styles.passed}>
                                                            <p className={styles.quizStatus__title}>{t("onlineLab.questions")}</p>
                                                            <p className={styles.status__text} style={{ marginBottom: "30px" }}>{t("onlineLab.fail1")}<span style={{ color: "#EC0B43" }}>{t("onlineLab.fail2")}</span>{t("onlineLab.fail3")}</p>
                                                            <Button2 style={{ margin: "0 auto" }} type={2} onClick={() => [setTestStatus("notSend")]}>{t("onlineLab.tryAgain")}</Button2>
                                                        </div>
                                                    )}
                                                    {testStatus === "wasPassed" && (
                                                        <div className={styles.passed}>
                                                            <p className={styles.quizStatus__title}>{t("onlineLab.questions")}</p>
                                                            <p className={styles.status__text}>
                                                                {t("onlineLab.passed1")}<span style={{ color: "#63C018" }}>{t("onlineLab.passed2")}</span>{t("onlineLab.passed3")}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {testStatus === "answersError" && (
                                                        <div className={styles.passed}>
                                                            <p className={styles.quizStatus__title}>{t("onlineLab.questions")}</p>
                                                            <p className={styles.status__text} style={{ marginBottom: "30px" }}>Для успешного прохождения теста необходимо выбрать хотя бы 1 вариант ответа в каждом вопросе!</p>
                                                            <Button2 style={{ margin: "0 auto" }} type={2} onClick={() => [setTestStatus("notSend")]}>{t("onlineLab.tryAgain")}</Button2>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : ""}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {activeLabData?.report_required ? (
                                <div className={styles.right}>
                                    <div className={styles.right__inner}>
                                        <p className={styles.title2}>{t("onlineLab.report")}</p>
                                        {reportState === "notLoad" && (
                                            <>
                                                <p className={styles.fileNotFound}>{t("onlineLab.fileNotFound")}</p>
                                                <Button2 onClick={loadBtnClick} type={2} style={{ width: "100%", padding: "5px 10px" }}>{t("onlineLab.upload")}</Button2>
                                                <input type="file" ref={loadRef} onChange={onChangeInputLoadFile} hidden multiple />
                                            </>
                                        )}
                                        {reportState === "load" && (
                                            <>
                                                <div className={styles.loadedFileInfo}>
                                                    <div className={styles.area}>
                                                        <img alt="file" src={fileImage} />
                                                        <p>{fileName}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button2 type={2} onClick={() => { setConfirmModalOpen(true) }}>Сдать отчет</Button2>
                                                </div>
                                            </>
                                        )}
                                        {reportState === "send" && (
                                            <>
                                                <div className={styles.loadedFileInfo}>
                                                    <div className={styles.area}>
                                                        <img alt="file" src={fileImage} />
                                                        <p>{fileName}</p>
                                                    </div>
                                                </div>
                                                <p>{acceptDate ? `Отчет принят / ${acceptDate?.split("").slice(0, 10).join("").split("-").join(".")}` : "Отчет сдан"}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.right}>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </>
            {
                <Modal active={confirmModalOpen} setActive={setConfirmModalOpen}>
                    <div className={styles.confirm}>
                        <p className={styles.confirmTitle}>Вы уверены, что хотите отправить отчет?</p>
                        <p className={styles.confirmText}>После отправки отчёта по теме «{activeLab.name}», его нельзя будет редактировать</p>
                        <div className={styles.buttons}>
                            <Button2 type={2} onClick={() => { setConfirmModalOpen(false) }}>Отмена</Button2>
                            <Button2 type={1} onClick={loadLabFile}>Отправить</Button2>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}