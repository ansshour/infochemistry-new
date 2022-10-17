import { useContext, useEffect, useMemo, useState } from "react"
import { Quiestion, QuizContext, useQuiz } from "../CreateLab/CreateLab"
import styles from "./Quiz.module.css"
import { QuizCard } from "./QuizCard/QuizCard"
import add from "./res/add.svg";
import del from "./res/del.svg";
import photo from "./res/photo.svg";
import copy from "./res/copy.svg";
import { Reorder } from "framer-motion";
import { Question } from "../LaboratoryWork/Question/Question";
import { Checkbox } from "../UI/Checkbox/Checkbox";
import { useTranslation } from "react-i18next";
import { CgImage } from "react-icons/cg"
import { FaRegCopy, FaRegTrashAlt } from "react-icons/fa"
import { BsPlusLg } from "react-icons/bs"

export const Quiz = () => {

    const { t } = useTranslation()

    const { quiz, setQuiz, activeQuizItem, passingScore, setPassingScore } = useQuiz()
    const [isQuizActive, setQuizActive] = useState(true)
    const [havePassedScore, setHavePassedScore] = useState(true)
    let tempQuiz;



    const addQuestion = () => {
        let id = Math.max(...quiz.map(({ id }) => id));
        setQuiz([...quiz, {
            id: quiz.length ? id += 1 : 0,
            text: "",
            multiple_choice: false,
            choices: [{
                id: 0,
                text: "",
                correct: false,
            }],
            image: "",
            hasImage: false,
        }])
    }

    const deleteQuestion = () => {
        setQuiz(
            quiz.filter((question) => {
                if (question.id !== activeQuizItem) {
                    return true
                }
            })
        )
    }

    const copyQuestion = () => {
        let id = Math.max(...quiz.map(({ id }) => id));
        const elem = quiz.filter((question) => {
            if (question.id == activeQuizItem) {
                return true
            }
        })[0];
        if (!elem.image) {
            setQuiz([...quiz, { ...JSON.parse(JSON.stringify(elem)), id: id += 1, key: id += 1 }])
        } else {

        }

    }

    const addQuestionWithImage = () => {
        let id = Math.max(...quiz.map(({ id }) => id));
        setQuiz([...quiz, {
            id: id += 1,
            text: "",
            multiple_choice: false,
            choices: [{
                id: 0,
                text: "",
                correct: false,
            }],
            image: "",
            hasImage: true,
        }])
    }

    useEffect(() => {
        setPassingScore(quiz.length)
    }, [havePassedScore, quiz])


    return (
        <>
            <div className={styles.passingScore}>
                <p className={styles.title}>Основные настройки квиза</p>
                <div className={styles.isActivePassingScore}>
                    <Checkbox checked={havePassedScore} setChecked={setHavePassedScore} />
                    <p>Минимальное количество вопросов</p>
                </div>
                <input className={styles.passScore} disabled={!havePassedScore} value={passingScore} onChange={e => setPassingScore(e.target.value)} /> <span className={styles.maxScore}>из {quiz.length}</span>
            </div>
            <div className={styles.container} style={!isQuizActive ? { display: "none" } : {}}>
                <div className={styles.content}>
                    <Reorder.Group axis="y" values={quiz} onReorder={setQuiz} className={styles.content}>
                        {quiz.map(({ id, text, multiple_choice, choices, hasImage, image }: Quiestion, i: number) => <QuizCard item={quiz[i]} key={id} id={id} text={text} multiple_choice={multiple_choice} choices={choices} imageB={image} hasImage={hasImage} />)}
                    </Reorder.Group>
                </div>

            </div >
            <div className={styles.controller}>
                <div>
                    <div className={styles.btn} onClick={addQuestion}>
                        <BsPlusLg />
                        <p>Добавить вопрос</p>
                    </div>
                </div>
                <div>
                    <div className={styles.btn} onClick={addQuestionWithImage}>
                        <CgImage />
                        <p>Добавить вопрос с картинкой</p>
                    </div>
                </div>
                <div>
                    <div className={styles.btn} onClick={copyQuestion}>
                        <FaRegCopy />
                        <p>Копировать вопрос</p>
                    </div>
                </div>
                <div>
                    <div className={styles.btn} onClick={deleteQuestion} >
                        <FaRegTrashAlt />
                        <p>Удалить вопрос</p>
                    </div>
                </div>
            </div>
        </>
    )
}