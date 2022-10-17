import { Reorder, useDragControls } from "framer-motion"
import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import $api from "../../../http"
import { Quiestion, useQuiz } from "../../CreateLab/CreateLab"
import { Checkbox } from "../../UI/Checkbox/Checkbox"
import { Radio } from "../../UI/Radio/Radio"
import { TextareaAutoGrow } from "../../UI/TextareaAutoGrow/TextareaAutoGrow"
import styles from "./QuizCard.module.css"
import drag from "./res/drag.svg"
import { BsPlusLg } from "react-icons/bs"
import { FaRegTrashAlt } from "react-icons/fa"


export const QuizCard: React.FC<any> = ({ id, text, multiple_choice, choices, item, hasImage, imageB }) => {

    const { t } = useTranslation()

    const imageChangeHandler = (e: any) => {
        let image = e.target.files[0];
        setImage(image)
    }


    const randomValue = useMemo(() => {
        return String(Math.random() * 10000);
    }, [])

    const { quiz, setQuiz, setActiveQuizItem, activeQuizItem } = useQuiz()
    const controls = useDragControls()
    const [image, setImage] = useState<any>(null)
    const [preview, setPreview] = useState<any>()

    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
            setImageQuizCard()
        } else {
            setPreview(null)
        }
    }, [image])

    const setMultiple = () => {
        setQuiz(
            quiz.map((question: Quiestion) => {
                if (question.id === id) {
                    question.multiple_choice = !question.multiple_choice;
                }
                return question
            })
        )
    }

    const setImageQuizCard = () => {
        const formData = new FormData();
        formData.append("image", image)
        setQuiz(
            quiz.map((question: Quiestion) => {
                if (question.id === id) {
                    question.image = formData;
                }
                return question
            })
        )
    }

    const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuiz(
            quiz.map((question: Quiestion) => {
                if (question.id === id) {
                    question.text = e.target.value;
                }
                return question
            })
        )
    }

    const setCorrectAnswer = (type: string, i: number) => {
        if (type === "checkbox") {
            setQuiz(
                quiz.map((question: Quiestion) => {
                    if (question.id === id) {
                        {
                            question.choices.map((choice, index) => {
                                if (i === index) {
                                    choice.correct = !choice.correct;
                                }
                                return choice
                            })
                        }
                    }
                    return question
                })
            )
        }
        if (type === "radio") {
            setQuiz(
                quiz.map((question: Quiestion) => {
                    if (question.id === id) {
                        {
                            question.choices.map((choice, index) => {
                                if (i === index) {
                                    choice.correct = !choice.correct;
                                }
                                if (i !== index) {
                                    choice.correct = false;
                                }
                                return choice
                            })
                        }
                    }
                    return question
                })
            )
        }
    }

    const addAnswer = () => {
        setQuiz(
            quiz.map((question: Quiestion, i: number) => {
                let id_choice = Math.min(...question.choices.map(({ id }) => id))

                if (question.id === id) {
                    if (question.choices[question.choices.length - 1].text.length) {
                        question.choices.push({
                            id: id_choice += 1,
                            text: "",
                            correct: false,
                        })
                    }
                }
                return question
            })
        )
    }

    const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setQuiz((quiz) => (
            quiz.map((question: Quiestion) => {
                if (question.id === id) {
                    question.choices.map((choice, i: number) => {
                        if (index === i) {
                            choice.text = e.target.value;
                        }
                        return choice
                    })
                }
                return question
            })
        ))
    }

    const deleteAnswer = (i: number) => {
        setQuiz((quiz) => (
            quiz.map((question: any) => {
                let newChoices;
                if ((question.id === id) && (question.choices.length > 1)) {
                    newChoices = question.choices.filter((choice) => choice.id !== i)
                    return { ...question, choices: newChoices }
                } else {
                    return question
                }
            })

        ))
    }

    return (
        <Reorder.Item
            value={item}
            whileDrag={{

            }}
            dragListener={false}
            dragControls={controls}>
            <div className={styles.container} onClick={() => { setActiveQuizItem(id) }} style={activeQuizItem === id ? { boxShadow: "0px 0px 8px 0px rgba(121, 243, 236, 0.5)" } : {}}>
                <div>
                    {/* <p className={styles.multipleTitle}>Тип вопроса</p> */}
                    <label className={styles.multiple}>
                        <Checkbox checked={multiple_choice} setChecked={setMultiple} />
                        <p>{t("createLab.manyAnswers")}</p>
                    </label>
                </div>
                <img alt="drag" src={drag} className={styles.drag} onPointerDown={(e) => controls.start(e)} />
                <div className={styles.top}>
                    <input placeholder={t("createLab.WriteQuestion")} className={styles.question} onChange={e => { onChangeQuestion(e) }} value={text} />
                </div>
                {(hasImage || imageB) && (
                    <div className={styles.image}>
                        <input type="file" onChange={e => { imageChangeHandler(e) }} style={{ marginBottom: "20px" }} />
                        <img className={styles.imageE} src={preview || imageB} />
                    </div>
                )}
                <div className={styles.answers}>
                    {choices?.map(({ text, correct, id }, i: number) => (
                        <div className={styles.answer} key={id}>
                            {multiple_choice ? <Checkbox checked={correct} setChecked={() => { setCorrectAnswer("checkbox", i) }} /> : <Radio name={randomValue} checked={correct} setChecked={() => { setCorrectAnswer("radio", i) }} />}
                            <input placeholder={t("createLab.WriteAnswer")} value={text} onChange={e => { changeAnswer(e, i) }} className={styles.answerEnter} />
                            <div className={styles.deleteAnswer} onClick={() => { deleteAnswer(id) }}><FaRegTrashAlt size={11} /></div>
                        </div>
                    ))}
                    <div>
                        <button className={styles.addButton} onClick={addAnswer}>
                            <BsPlusLg />
                            <p>{t("createLab.addAnswerVariable")}</p>
                        </button>
                    </div>
                </div>
            </div>
        </Reorder.Item >
    )
}