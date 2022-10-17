import React, { useEffect, useMemo, useState } from "react";
import { Checkbox } from "../../UI/Checkbox/Checkbox";
import { Radio } from "../../UI/Radio/Radio";
import styles from "./Question.module.css"

type Props = {
    title: string;
    number: number;
    manyAnswer: boolean;
    answers: string[];
}


export const Question: React.FC<any> = ({ number, title, manyAnswer, choices, id, image, questionAnswers, setQuestionAnswers }) => {


    const random = useMemo(() => {
        return String(Math.random() * 10000)
    }, [])


    const [answers, setAnswers] = useState([])
    useEffect(() => {
        setQuestionAnswers({ ...questionAnswers, [id]: answers })
    }, [answers])


    return (
        <div className={styles.container}>
            <p className={styles.title}>{number}. {title}</p>
            {image && <img src={image} height={300} className={styles.image} />}
            < ul className={styles.answersList}>
                {choices.map((item, id) => (
                    <label key={item.id}>
                        <li >
                            {manyAnswer ? <Checkbox onClick={(e) => { e.target.checked ? setAnswers([...answers, id + 1]) : setAnswers(answers.filter(item => item != id + 1)) }} /> : <Radio name={random} onClick={() => { setAnswers([id + 1]) }} />}
                            {item.text}
                        </li>
                    </label>
                ))}
            </ul>
        </div>
    )
}