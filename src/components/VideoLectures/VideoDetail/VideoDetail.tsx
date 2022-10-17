import { Breadcrumbs } from "../../UI/Breadcrumbs/Breadcrumbs"
import styles from "./VideoDetail.module.css"
import pdficon from "./res/pdficon.svg"
import downloadIcon from "./res/download.svg"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import noavatar from "./res/noavatar.png"
import { Loader2 } from "../../UI/Loader2/Loader2"

export const VideoDetail = () => {

    const lang = localStorage.getItem("i18nextLng");
    const [loader, setLoader] = useState(false)
    const { t } = useTranslation()

    let { id } = useParams();

    const info = [
        { name: t("videolecturesDetail.breadcrumbs.main"), link: "/" },
        { name: t("videolecturesDetail.breadcrumbs.students"), link: "" },
        { name: t("videolecturesDetail.breadcrumbs.Videolectures"), link: "/video_lectures" },
    ]

    const [data, setData] = useState<any>({})

    const getVideoData = async () => {
        setLoader(true)
        try {
            const data = await fetch(`https://new.infochemistry.ru/api/lectures/${id}/`);
            const response = await data.json();
            setData(response)
        } catch (err) {

        }
        setLoader(false)
    }

    const getRoles = () => {
        const roles = data?.teacher.roles.map(role => {
            return t(`videolecturesDetail.${role}`)
        })
        return roles.join(", ");
    }

    useEffect(() => {
        getVideoData()
    }, [])

    return (
        <>
            {loader ? (
                <Loader2 />
            ) : (
                <>
                    <>
                        {Object.keys(data).length ? (
                            <>
                                <Breadcrumbs info={info} />
                                <div className={styles.container}>
                                    <h1 className={styles.title}>
                                        {lang === "ru" ? data.name : data.name_eng}
                                    </h1>
                                    <div className={styles.video}>
                                        <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${data.link.split("/")[data.link.split("/").length - 1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        {/* <span className={styles.arrowRight} onClick={() => { id && (window.location.href = String(Number(id) + 1)) }}></span>
                            <span className={styles.arrowLeft} onClick={() => { id && (window.location.href = String(Number(id) - 1)) }}></span> */}
                                    </div>
                                    <p className={styles.teacherTitle}>{t("videolecturesDetail.teacher")}</p>
                                    <div className={styles.teacherInfo}>
                                        <div className={styles.photo} style={{ backgroundImage: `url(${data.teacher.avatar ? data.teacher.avatar : noavatar})` }}>

                                        </div>
                                        <div className={styles.nameAndPost}>
                                            <p className={styles.teacherName}>{lang === "ru" ? `${data.teacher.last_name} ${data.teacher.first_name} ${data.teacher.middle_name}` : `${data.teacher.last_name_eng} ${data.teacher.first_name_eng} ${data.teacher.middle_name_eng}`}</p>
                                            <p className={styles.post}>{getRoles()}</p>
                                        </div>
                                        <a className={styles.emails} href={`mailto:${data.teacher.contact_email}`} style={!data.teacher.contact_email ? { display: "none" } : {}}>
                                            <svg width="14" height="12" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.71743 0.166992C11.6599 0.166992 13.1247 1.75191 13.1247 3.85366V7.85999C13.1247 8.93566 12.7443 9.90749 12.0531 10.597C11.433 11.2147 10.6286 11.542 9.72676 11.542H3.97917C3.07909 11.542 2.27526 11.2153 1.65459 10.597C0.963341 9.90749 0.583008 8.93566 0.583008 7.85999V3.85366C0.583008 1.75191 2.04776 0.166992 3.99026 0.166992H9.71743ZM9.71743 1.04199H3.99026C2.52317 1.04199 1.45801 2.22441 1.45801 3.85366V7.85999C1.45801 8.70174 1.74734 9.45366 2.27234 9.97691C2.72501 10.429 3.31592 10.667 3.98092 10.667H9.71743C9.71859 10.6658 9.72326 10.667 9.72676 10.667C10.3923 10.667 10.9827 10.429 11.4353 9.97691C11.9609 9.45366 12.2497 8.70174 12.2497 7.85999V3.85366C12.2497 2.22441 11.1845 1.04199 9.71743 1.04199ZM10.6368 3.74213C10.789 3.92938 10.7604 4.20471 10.5732 4.35754L7.98084 6.46454C7.65301 6.72471 7.26101 6.85479 6.86959 6.85479C6.47934 6.85479 6.09026 6.72588 5.76476 6.46804L3.14851 4.35871C2.96009 4.20704 2.93092 3.93113 3.08201 3.74329C3.23426 3.55604 3.50959 3.52629 3.69742 3.67738L6.31134 5.78438C6.63976 6.04454 7.10234 6.04454 7.43309 5.78204L10.0208 3.67854C10.2086 3.52513 10.4839 3.55429 10.6368 3.74213Z" fill="black" />
                                            </svg>
                                            <span>{data.teacher.contact_email}</span>
                                        </a>
                                    </div>
                                    <div className={styles.desc_wrapp} style={lang === "ru" && !data.description || lang === "en" && !data.description ? { display: "none" } : {}}>
                                        <p className={styles.descTitle}>{t("videolecturesDetail.description")}</p>
                                        <p className={styles.desc}>{lang === "ru" ? data.description : data.description_eng}</p>
                                    </div>
                                    <div className={styles.materials_wrapp} style={!data.attachments.length ? { display: "none" } : {}}>
                                        <p className={styles.materialTitle}>{t("videolecturesDetail.materials")}</p>
                                        {data.attachments.map(({ file, id }: any, i: number) => {
                                            return (
                                                <>
                                                    <div className={styles.material} key={id}>
                                                        <div className={styles.first}>
                                                            {/* <img src={pdficon} alt="pdficon" /> */}
                                                            <p className={styles.fileName}>{lang === "ru" ? `${data.name} (${i + 1})` : `${data.name_eng} (${i + 1})`}</p>
                                                        </div>
                                                        <div className={styles.second}>
                                                            {/* <p className={styles.weight}>{data.file.weight}</p> */}
                                                            <a href={file} download target="_blank"><svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.90212 6.34344C7.40237 6.34344 7.80837 6.74944 7.80837 7.24969C7.80837 7.74994 7.40237 8.15594 6.90212 8.15594H5.76508C3.81483 8.15594 2.22949 9.74006 2.22949 11.6891V17.5918C2.22949 19.5481 3.81966 21.1383 5.77595 21.1383H19.2368C21.1846 21.1383 22.7712 19.5517 22.7712 17.6039V11.7024C22.7712 9.7461 21.1798 8.15594 19.2259 8.15594H18.0997C17.5995 8.15594 17.1935 7.74994 17.1935 7.24969C17.1935 6.74944 17.5995 6.34344 18.0997 6.34344H19.2259C22.1803 6.34344 24.5837 8.74802 24.5837 11.7024V17.6039C24.5837 20.5522 22.1839 22.9508 19.2368 22.9508H5.77595C2.82158 22.9508 0.416992 20.5474 0.416992 17.5918V11.6891C0.416992 8.74077 2.81553 6.34344 5.76508 6.34344H6.90212ZM12.5013 0.625C13.0015 0.625 13.4075 1.031 13.4075 1.53125L13.4066 13.8877L15.3832 11.9036C15.736 11.5483 16.3087 11.5483 16.664 11.9012C17.018 12.254 17.0192 12.828 16.6664 13.1832L13.1511 16.7123C13.1167 16.7476 13.0796 16.7802 13.0399 16.8095L13.1429 16.72C13.104 16.7595 13.0618 16.7949 13.0169 16.8261C12.9895 16.845 12.9616 16.8621 12.9329 16.8778C12.919 16.8853 12.9044 16.8927 12.8897 16.8997C12.8633 16.9123 12.8362 16.9236 12.8086 16.9336C12.7947 16.9385 12.7808 16.9431 12.7669 16.9473C12.7328 16.9579 12.6978 16.9664 12.6621 16.9728C12.6541 16.9741 12.6467 16.9754 12.6394 16.9765C12.6106 16.981 12.5805 16.9841 12.55 16.9858C12.5336 16.9866 12.5175 16.987 12.5013 16.987L12.4532 16.9834L12.3784 16.9788C12.373 16.978 12.3677 16.9773 12.3624 16.9765L12.5013 16.987C12.4473 16.987 12.3937 16.9822 12.3412 16.9728C12.3048 16.9664 12.2699 16.9579 12.2359 16.9475C12.2223 16.9432 12.2089 16.9388 12.1956 16.934C12.1679 16.9242 12.1404 16.9128 12.1137 16.9001C12.0975 16.8924 12.0814 16.8842 12.0655 16.8755C12.0432 16.8632 12.0217 16.8501 12.0008 16.8363C11.9864 16.8268 11.9721 16.8167 11.9581 16.8061C11.9236 16.7802 11.891 16.7519 11.8606 16.7215L11.8597 16.72L8.33617 13.1832C7.98333 12.828 7.98454 12.254 8.33858 11.9012C8.69383 11.5483 9.26658 11.5483 9.61942 11.9036L11.5941 13.8877L11.595 1.53125C11.595 1.031 12.001 0.625 12.5013 0.625Z" fill="black" />
                                                            </svg>
                                                            </a>

                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )
                        }
                    </>
                </>
            )}
        </>
    )
}