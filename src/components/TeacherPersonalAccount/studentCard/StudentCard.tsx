import { Checkbox } from "../../UI/Checkbox/Checkbox"
import styles from "./StudentCard.module.css"
import downloadIcon from "./res/download.svg"
import $api from "../../../http";
import { useEffect, useState } from "react";
import axios from "axios";
import noavatar from "./res/noavatar.png"
import yes from "./res/yes.svg"
import no from "./res/no.svg"
import noDownload from "./res/noDownload.svg"
import { Button2 } from "../../UI/Button2/Button2";


type Props = {
    name: string;
    group: string;
    isTrueQuestions: boolean;
    reportLink: string;
}

export const StudentCard: React.FC<any> = ({ id, test_passed, accepted, user, report_filename, labId, maxScore, score }) => {



    const lang = localStorage.getItem("i18nextLng");


    const [labAccept, setLabAccept] = useState(null);
    const [file, setFile] = useState(null)

    const getResults = async () => {
        const { data } = await $api.get(`labs/${labId}/teacher_results/${id}/`)
        setLabAccept(data.accepted);
    }


    const downloadReport = () => {
        const token = localStorage.getItem("token");
        axios.defaults.baseURL = 'https://new.infochemistry.ru';
        axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
        axios
            .get(`/api/labs/${labId}/teacher_results/${id}/download_report/`, { responseType: 'blob' })
            .then(async (response) => {
                const type = () => {
                    if (response.data.type === "application/octet-stream") {
                        return "docx"
                    }
                    if (response.data.type === "application/pdf") {
                        return "pdf"
                    }
                    if (response.data.type === "image/jpeg") {
                        return "jpeg"
                    }
                    if (response.data.type === "image/png") {
                        return "png"
                    }
                    if (response.data.type === "text/csv") {
                        return "csv"
                    }
                }

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                // link.setAttribute('download', `report.${type()}`);
                link.setAttribute('download', "");
                document.body.appendChild(link);
                link.click();
            });
    }

    const acceptLab = async () => {
        try {
            const response = await $api.put(`labs/${labId}/teacher_results/${id}/`, { accepted: !labAccept })
            getResults()
        } catch (err) {

        }
    }

    // useEffect(() => {
    //     getResults()

    // }, [])

    let nameRu = `${user.last_name} ${user.first_name} ${user.middle_name}`;
    let nameEng = `${user.last_name_eng} ${user.first_name_eng} ${user.middle_name_eng}`;


    return (
        <div className={styles.studentCard}>
            <div className={styles.fio}>
                {/* <div className={styles.avatar} style={{ backgroundImage: `url(${user.avatar ? user.avatar : noavatar})` }}></div> */}
                <p className={styles.name}>{lang === "ru" ? (nameRu.length > 30 ? nameRu.split("").slice(0, 30).join("") + "..." : nameRu) : (nameEng.length > 30 ? nameEng.split("").slice(0, 30).join("") + "..." : nameEng)}</p>
            </div>
            <p className={styles.group}>
                {user.university_group_number}
            </p>
            <p className={styles.isTrueQuestions}>{test_passed ? (
                <div className={styles.isTrueWrapp} style={score ? { marginLeft: "42px" } : {}}>
                    <img alt="yes" src={yes} />
                    {score && <p>{`(${score}/${maxScore})`}</p>}
                </div>
            ) : (
                <div className={styles.isTrueWrapp} style={score ? { marginLeft: "42px" } : {}}>
                    <img alt="no" src={no} />
                    {score && <p>{`(${score}/${maxScore})`}</p>}
                </div>
            )}</p>
            <div className={styles.downloadReport} onClick={downloadReport}>
                {report_filename ? (
                    <a download ><img alt="download" src={downloadIcon} /></a>
                ) : (
                    <img style={{ cursor: "auto" }} alt="noDownload" src={noDownload} />
                )}

            </div>
            <div>
                <span onClick={acceptLab}>
                    {/* <Checkbox checked={labAccept} /> */}
                    {!labAccept && <Button2 type={2} style={{ fontSize: "16px", padding: "2px 7px", fontWeight: "400", width: "100%" }} onClick={() => { setLabAccept(!labAccept) }}>Не сдано</Button2>}
                    {labAccept && <Button2 type={1} style={{ fontSize: "16px", padding: "2px 7px", fontWeight: "400", width: "100%" }} onClick={() => { setLabAccept(!labAccept) }}>Сдано</Button2>}
                </span>
            </div>
        </div >
    )
}