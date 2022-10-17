import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import Select from "react-select"
import styles from "./CreateLab.module.css"
import { Editor } from "../Editor/Editor"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Quiz } from "../Quiz/Quiz"
import $api from "../../http"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../hoc/AuthProvider"
import axios from "axios"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import { useTranslation } from "react-i18next"
import { Loader2 } from "../UI/Loader2/Loader2"
import { Button2 } from "../UI/Button2/Button2"
import { Input2 } from "../UI/Input2/Input2"
import back from "./res/back.svg"
import { Modal } from "../UI/Modal/Modal"



type Choices = {
    text: string;
    correct: boolean;
    id: number;
}

export type Quiestion = {
    id: number;
    text: string;
    multiple_choice: boolean;
    choices: Choices[]
    image?: any;
    hasImage?: boolean;
}

export const QuizContext = createContext<any>(null)


export const CreateLab = () => {


    const getContent = () => {
        return document.querySelector(".note-editable").innerHTML
    }

    const createContent = (text: string) => {
        document.querySelector(".note-editable").innerHTML = text;
    }

    const { t } = useTranslation()
    const lang = localStorage.getItem("i18nextLng");
    const info = [
        { name: t("createLab.breadcrumbs.PATeacher"), link: "/teacher_personal_account" },
        { name: t("createLab.breadcrumbs.CreateNewLab"), link: "" },
    ]


    const navigate = useNavigate()
    const { isAuth, user } = useAuth()

    const { id } = useParams()

    const [leaveHref, setLeaveHref] = useState("")

    const [loader, setLoader] = useState(false)
    const [groupList, setGroupList] = useState<any>([])
    const [groupListActive, setGroupListActive] = useState<any>([]) //
    const [activeGroup, setActiveGroup] = useState([]);
    const [activeQuizItem, setActiveQuizItem] = useState<null | number>(null)
    const [labName, setLabName] = useState("");
    const [groups, setGroups] = useState([])
    const [quiz, setQuiz] = useState<any[]>([
        {
            id: 0,
            text: "",
            multiple_choice: false,
            choices: [{
                id: 0,
                text: "",
                correct: false,
            }],
            image: "",
            hasImage: false,
        }
    ])
    const [hasReport, setHasReport] = useState<boolean>(true);
    const [hasQuiz, setHasQuiz] = useState<boolean>(false);
    const [passingScore, setPassingScore] = useState("")

    useEffect(() => {
        console.log(passingScore)
    }, [passingScore])

    const [editorContent, setEditorContent] = useState("")
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);


    const getGroups = async () => {
        try {
            const { data } = await $api.get("groups/")
            setGroupList(data)
            setGroups(data.map(({ id, number }) => ({ value: id, label: number })))
        } catch (err) {

        }
    }

    const sendImage = () => {
        quiz.forEach(async ({ id, image }) => {
            if (image) {
                try {
                    const response = await $api.put(`labs/questions/${id}/`, image)
                } catch (err) {

                }
            }
        })
    }


    const sendLabData = async () => {

        try {
            const { data } = await $api.post("/labs/", {
                university_groups: activeGroup.map(({ value }) => value),
                passing_score: !hasQuiz ? 0 : Number(passingScore), //change
                name: labName,
                text: getContent(),
                questions: hasQuiz ? quiz.map(quiz => ({ text: quiz.text, multiple_choice: quiz.multiple_choice, choices: quiz.choices, image: quiz.image, hasImage: quiz.hasImage })) : [],
                report_required: hasReport,
            })
            quiz.forEach((quizItem) => {
                data.questions.forEach((responseItem) => {



                    if (responseItem.number - 1 === quizItem.id) {
                        if (quizItem.image) {
                            $api.put(`labs/questions/${responseItem.id}/`, quizItem.image);
                        }
                    }
                })
            })
            // window.location.href = `/teacher_personal_account?success=1`
            navigate("/teacher_personal_account?success=1")
        } catch (err) {
            let unknownError = true;
            if (!activeGroup.length) {
                lang === "ru" ? toast.error("Выберите группу!") : toast.error("Select a group!")
                unknownError = false;
            }
            if (!labName) {
                lang === "ru" ? toast.error("Введите название лабораторной работы!") : toast.error("Enter the name of the laboratory work!")
                unknownError = false;
            }
            if (!editorContent) {
                lang === "ru" ? toast.error("Заполните тело лабораторной работы!") : toast.error("Fill out the body of the lab work!")
                unknownError = false;
            }
            if (err.response.data?.questions[0].choices) {
                lang === "ru" ? toast.error("В вопросах должен быть выбран хотя бы один вариант ответа!") : toast.error("At least one answer option must be selected in the questions!")
                unknownError = false;
            }
        }
    }

    const getLabById = async () => {
        setLoader(true)
        try {
            const { data } = await $api.get(`labs/${id}/teacher/`)

            setQuiz(data.questions.map(item => ({ id: item.id, text: item.text, image: item.image, multiple_choice: item.multiple_choice, choices: item.choices.map(item => ({ text: item.text, correct: item.correct, id: item.id || false })) })))
            setActiveGroup(groupList.filter(({ id, number }) => data.university_groups.includes(id)).map(({ id, number }) => ({ value: id, label: number })))
            setLabName(data.name)
            createContent(data.text)
            setHasReport(data.report_required)
            setHasQuiz(data.questions.length)
            setPassingScore(data.passing_score)
        } catch (err) {

        }
        setLoader(false)
    }


    const editLabData = async () => {
        try {
            const { data } = await $api.put(`/labs/${id}/`, {
                name: labName,
                passing_score: !hasQuiz ? 0 : Number(passingScore), //change
                text: getContent(),
                questions: hasQuiz ? quiz.map(quiz => ({ text: quiz.text, multiple_choice: quiz.multiple_choice, choices: quiz.choices, image: quiz.image, hasImage: quiz.hasImage })) : [],
                report_required: hasReport,
                university_groups: activeGroup.map(({ value }) => value),
            })
            quiz.forEach((quizItem) => {
                data.questions.forEach((responseItem) => {
                    if (responseItem.id === quizItem.id) {
                        if (quizItem.image) {
                            $api.put(`labs/questions/${responseItem.id}/`, quizItem.image);
                        }
                    }
                })
            })
            // window.location.href = `/teacher_personal_account?success=2`
            // navigate("/teacher_personal_account?success=2")
        } catch (err) {
            let unknownError = true;
            if (!activeGroup.length) {
                lang === "ru" ? toast.error("Выберите группу!") : toast.error("Select a group!")
                unknownError = false;
            }
            if (!labName) {
                lang === "ru" ? toast.error("Введите название лабораторной работы!") : toast.error("Enter the name of the laboratory work!")
                unknownError = false;
            }
            if (!editorContent) {
                lang === "ru" ? toast.error("Заполните тело лабораторной работы!") : toast.error("Fill out the body of the lab work!")
                unknownError = false;
            }
            if (err.response.data?.questions[0].choices) {
                lang === "ru" ? toast.error("В вопросах должен быть выбран хотя бы один вариант ответа!") : toast.error("At least one answer option must be selected in the questions!")
                unknownError = false;
            }
        }
    }


    const getInfo = async () => {
        await getGroups()
        await getLabById()
    }

    useEffect(() => {
        if (id) {
            getLabById()
        }
    }, [])

    useEffect(() => {
        if (id) {
            getLabById()
        }
    }, [groupList])

    useEffect(() => {
        getGroups()
    }, [])


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

    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#D6D6D6",
                primary: "#D6D6D6",
                primary50: "#D6D6D6",
            }
        }
    }


    const getValue = () => {
        if (activeGroup) {
            return groups.filter(c => activeGroup.includes(c.value))

        } else {
            return []
        }
    }


    const onChange = (newValue) => {
        setActiveGroup(newValue)
    }

    // id: 0,
    // text: "",
    // multiple_choice: false,
    // choices: [{
    //     id: 0,
    //     text: "",
    //     correct: false,
    // }],
    // image: "",
    // hasImage: false,

    // const quizIsCorrect = (quiz) => {
    //     let correct = true;
    //     quiz.forEach(({ text, choices }) => {
    //         if (!text) {
    //             correct = false;
    //         }
    //         let choiceHasCorrectAnswer = false;
    //         let allAnswersHasText = true;
    //         choices.forEach(({ text, correct }) => {
    //             if (correct) {
    //                 choiceHasCorrectAnswer = true;
    //             }
    //             if (!text) {
    //                 allAnswersHasText = false;
    //             }
    //         })
    //         if (!choiceHasCorrectAnswer || !allAnswersHasText) {
    //             correct = false;
    //         }
    //     })
    //     return correct
    // }

    useEffect(() => {
        let links: any = document.querySelectorAll("a");
        links = [...links].filter(item => !item.classList.contains("note-dropdown-item"))
        const linkClickHandler = (e) => {
            e.preventDefault()
            const href = e.target.closest("a").getAttribute("href");
            setLeaveHref(href)
            setConfirmModalOpen(true)
        }

        links.forEach(link => {
            link.addEventListener("click", linkClickHandler)
        })
        return () => links.forEach(link => link.removeEventListener("click", linkClickHandler))
    }, [])


    return (
        <>

            {loader ? (
                <Loader2 />
            ) : (
                <>

                    <QuizContext.Provider value={{ quiz, setQuiz, activeQuizItem, setActiveQuizItem, passingScore, setPassingScore }}>
                        <div className={styles.container}>
                            <div className={styles.outerOuter}>
                                <div className={styles.outer}>
                                    <div className={styles.wrapper}>
                                        {/* <div className={styles.editor}> */}
                                        {/* <Editor content={editorContent} setContent={setEditorContent} /> */}

                                        {/* </div> */}
                                        <div className={styles.editInfo}>
                                            <div className={styles.topEditInfo}>
                                                <Link to={'/teacher_personal_account'}>
                                                    <div className={styles.back}>
                                                        <img alt="back" src={back} />
                                                        <p>Создание проекта</p>
                                                    </div>
                                                </Link>
                                                <div className={styles.name}>
                                                    <p className={styles.title}>Название проекта</p>
                                                    <Input2 placeholder="Введите название проекта..." style={{ height: "38px", fontSize: "14px", border: "1px solid #929292", color: "black" }} value={labName} onChange={(e) => { setLabName(e.target.value) }} />
                                                </div>
                                                <div className={styles.group}>
                                                    <p className={styles.title}>{t("createLab.Groups")}</p>
                                                    {/* <Select items={groupList.map(item => item.number)} multiple activeEl={groupListActive.filter(i => i)} setActiveEl={setGroupListActive} placeholder={t("createLab.Groups")} /> */}
                                                    <Select
                                                        options={groups}
                                                        classNamePrefix="custom-select"
                                                        placeholder="Введите группы, которым будет доступен проект..."
                                                        className="react-select-container"
                                                        theme={theme => customTheme(theme)}
                                                        value={activeGroup}
                                                        onChange={onChange}
                                                        isMulti={true}
                                                        noOptionsMessage={({ inputValue }) => !inputValue ? "Список пуст..." : "Список пуст..."} />
                                                </div>
                                                <div className={styles.labOptions}>
                                                    <p>Отчетность по проекту</p>
                                                    {/* <label className={styles.isQuiz}><Checkbox checked={hasQuiz} setChecked={setHasQuiz} />{t("createLab.Quiz")}</label>
                                                <label className={styles.isReport}><Checkbox checked={hasReport} setChecked={setHasReport} />{t("createLab.Report")}</label> */}
                                                    <div className={styles.buttons}>
                                                        <Button2 type={hasQuiz ? 1 : 2} style={{ padding: "3px 20px", marginRight: "15px" }} onClick={() => { setHasQuiz(!hasQuiz) }}>Квиз</Button2>
                                                        <Button2 type={hasReport ? 1 : 2} style={{ padding: "3px 20px" }} onClick={() => { setHasReport(!hasReport) }}>Отчет</Button2>
                                                    </div>
                                                </div>
                                            </div>
                                            {hasQuiz ? (
                                                <div className={styles.quiz}>
                                                    {/* <div className={styles.title}>{t("createLab.Quiz")}</div> */}
                                                    <div>
                                                        <Quiz />
                                                    </div>
                                                </div>
                                            ) : ""}
                                        </div>
                                        <div className={styles.editor}>
                                            <p className={styles.editorTitle}>Основной контент проекта</p>
                                            <Editor />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <Button style={{ margin: "30px auto", marginBottom: "0", padding: "7px 35px" }} onClick={id ? editLabData : sendLabData}>{t("createLab.save")}</Button> */}
                            <div className={styles.actions}>
                                <div className={styles.actionsInner}>
                                    <p className={styles.title}>Действия</p>
                                    <Button2 type={2} style={{ padding: "5px 15px", width: "100%" }} onClick={id ? editLabData : sendLabData}>Сохранить проект</Button2>
                                </div>
                            </div>
                        </div>
                    </QuizContext.Provider>
                </>
            )
            }
            {
                <Modal active={confirmModalOpen} setActive={setConfirmModalOpen}>
                    <div className={styles.confirm}>
                        <p className={styles.confirmTitle}>{`Вы точно    хотите покинуть страницу ${id ? "редактирования" : "создания"} лабораторной работы?`}</p>
                        {/* <label className={styles.confirmCheckbox}>
                            <Checkbox />
                            <p>Подтвердить</p>
                        </label> */}
                        <div className={styles.buttonsM}>
                            <Button2 type={2} onClick={() => { setConfirmModalOpen(false) }}>Отмена</Button2>
                            <Button2 type={1} onClick={() => { navigate(leaveHref) }}>Выйти</Button2>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}


export const useQuiz = () => useContext(QuizContext);