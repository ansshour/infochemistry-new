import { useContext, useEffect, useRef, useState } from "react"
import styles from "./Quote.module.css"
import icon from "./res/icon.svg"
import { Modal } from "../../../UI/Modal/Modal"
import { useTranslation } from "react-i18next"
import { Tabs, Tab, TabList, TabPanel } from "react-tabs"
import "./Quote.css"
import { Button2 } from "../../../UI/Button2/Button2"
import { Checkbox } from "../../../UI/Checkbox/Checkbox"

type Props = {
    authors: string;
    name: string;
    place: string;
    code: string;
    gost_citation: string;
    mla_citation: string;
    asa_citation: string;
    bibtex?: string;
    plain_text?: string;
}

export const Quote: React.FC<any> = ({ authors, name, place, code, gost_citation, mla_citation, asa_citation, bibtex, plain_text, bibtex_citation_full, bibtex_citation, plaintext_citation_full, plaintext_citation }) => {


    const [isModalActive, setIsModalActive] = useState(false)
    const [full, setFull] = useState(false)

    const { t } = useTranslation()

    const copyText = () => {
        const text = document.querySelector("#toCopy")?.innerHTML;
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <div className={styles.container}>
                <p className={styles.top}>{authors}</p>
                <p className={styles.middle}>{name}</p>
                <div className={styles.bottom}>
                    <p className={styles.place}>{place}</p>
                    <div className={styles.btn} onClick={() => { setIsModalActive(true) }}>
                        <Button2 type={2}>Цитировать</Button2>
                    </div>
                    <p className={styles.code}>{code}</p>
                </div>
            </div>
            <Modal active={isModalActive} setActive={setIsModalActive}>
                <div className={styles.modalContainer}>
                    <p className={styles.title}>Цитирование</p>
                    <div className={styles.tabs}>
                        <Tabs>
                            <TabList>
                                <Tab>
                                    Plain Text
                                </Tab>
                                <Tab>
                                    BibTeX
                                </Tab>
                            </TabList>
                            <label className={styles.isQoute}>
                                <Checkbox checked={full} setChecked={setFull} />
                                < p > Цитата и реферат</p>
                            </label>
                            <TabPanel>
                                <div className={styles.quote__modal}>
                                    <p id="toCopy">{full ? plaintext_citation_full : plaintext_citation}</p>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className={styles.quote__modal}>
                                    <p id="toCopy">{full ? bibtex_citation_full : bibtex_citation}</p>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className={styles.buttonsModal}>
                        <Button2 type={2} onClick={() => setIsModalActive(false)}>Отмена</Button2>
                        <Button2 type={1} onClick={() => copyText()}>Скопировать</Button2>
                    </div>
                </div>
            </Modal>
        </>
    )
}