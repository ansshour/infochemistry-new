import { useState } from "react";
import { VacancyCardT } from "../../../types/typesVacancy";
import { Button } from "../Button/Button";
import { Button2 } from "../Button2/Button2";
import { Modal } from "../Modal/Modal";
import styles from "./VacancyCard.module.css"


const dangerTextEnter = (text: string) => {
    return { __html: text };
}

const replace = (lang: "ru" | "en", str: string) => {
    if (lang === "ru") {
        if (str === "full_time") {
            return "Полный день"
        }
        if (str === "part_time") {
            return "Частичная занятость"
        }
        if (str === "from_1_to_3") {
            return "Опыт: 1 - 3 года"
        }
        if (str === "from_3_to_6") {
            return "Опыт: 3 - 6 лет"
        }
        if (str === "from_6 ") {
            return "Опыт: более 6 лет"
        }
        if (str === "bachelor") {
            return "Бакалавриат"
        }
        if (str === "masters") {
            return "Магистратура"
        }
        if (str === "postgraduate") {
            return "Аспирантура"
        }
    }
    if (lang === "en") {
        if (str === "full_time") {
            return "Full time"
        }
        if (str === "part_time") {
            return "Part time"
        }
        if (str === "from_1_to_3") {
            return "1 - 3 years"
        }
        if (str === "from_3_to_6") {
            return "3 - 6 years"
        }
        if (str === "from_6 ") {
            return "more than 6 years"
        }
        if (str === "bachelor") {
            return "Bachelor"
        }
        if (str === "masters") {
            return "Master"
        }
        if (str === "postgraduate") {
            return "Postgraduate"
        }
    }

}

export const VacancyCard: React.FC<any> = ({ name, categories, desc }) => {

    const lang = localStorage.getItem("i18nextLng");

    const [modalActive, SetModalActive] = useState(false);
    let counter = -1;

    return (
        <>
            <div className={styles.container}>
                <div>
                    <p className={styles.name}>{name}</p>
                    <div className={styles.buttons}>
                        {Object.keys(categories).map((key, i) => {
                            if (categories[key] !== "none") {
                                counter++;
                                return (
                                    counter % 2 === 0 ? <button key={i} className={styles.categoryBtn}>{replace(lang === "ru" ? "ru" : "en", categories[key])}</button> : <button key={i} className={styles.categoryBtn}>{replace(lang === "ru" ? "ru" : "en", categories[key])}</button>
                                )
                            }
                        })}
                    </div>
                    <p className={styles.desc} dangerouslySetInnerHTML={dangerTextEnter(desc.split(" ").filter((item: string, i: number) => i < 20 && item).join(" ") + "...")} />
                </div>
                <div className={styles.footr}><span onClick={() => { SetModalActive(true) }}><Button2 type={2}>Подробнее</Button2></span></div>
            </div>
            <Modal active={modalActive} setActive={SetModalActive}>
                <div className={styles.modal__container}>
                    <p className={styles.modal__title}>{name}</p>
                    <div className={styles.buttons}>
                        {Object.keys(categories).map((key, i) => {
                            if (categories[key] !== "none") {
                                counter++;
                                return (
                                    counter % 2 === 0 ? <button key={i} className={styles.categoryBtn} >{replace(lang === "ru" ? "ru" : "en", categories[key])}</button> : <button key={i} className={styles.categoryBtn} >{replace(lang === "ru" ? "ru" : "en", categories[key])}</button>
                                )
                            }
                        })}
                    </div>
                    <div className={styles.line}></div>
                    <div dangerouslySetInnerHTML={dangerTextEnter(desc)} />
                </div>
            </Modal>
        </>
    )
}