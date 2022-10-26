import { useState } from "react";
import { useTranslation } from "react-i18next";
import { VideoCard } from "../../UI/VideoCard/VideoCard";
import styles from "./Chapter.module.css"

type Videos = {
    image: string;
    name: string;
    authorName: string;
    date: string;
    time: string;
    id?: number;
}

type Props = {
    title: string;
    icon: string;
    numberVideos: number;
    videos: Videos[];
}

const lang = localStorage.getItem("i18nextLng");


export const Chapter: React.FC<any> = ({ title, icon, numberVideos, videos, id, data, setData }) => {

    const { t } = useTranslation()

    const [isShowAll, setIsShowAll] = useState(false)


    const moreOnClick = () => {
        fetch(`https://new.infochemistry.ru/api/lecture_series/${id}/`)
            .then(data => data)
            .then(response => response.json())
            .then(response => {
                data.map((item: any) => {
                    if (item.id === response.id) {
                        item = response;
                        return item
                    } else {
                        return item
                    }
                })
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.topBlock}>
                <div className={styles.title__wrapper}>
                    {/* <img src={icon} alt="chapterIcon" className={styles.icon} /> */}
                    <p className={styles.title}>{title}</p>
                    <p className={styles.numberVideos}>{numberVideos}</p>
                </div>
                {videos.length > 3 && !isShowAll && (
                    <span className={styles.moreBtn} onClick={() => { setIsShowAll(true) }}>{t("videolectures.more")}</span>
                )}
            </div>
            <div className={styles.videosContainer} style={isShowAll && window.innerWidth <= 991 ? { gridTemplateColumns: `repeat(${videos.length}, 100%)`, overflowX: "scroll" } : {}}>
                {
                    videos.map(({ preview, name, name_eng, teacher, updated_at, id }: any, i: number) => {
                        if (isShowAll) {
                            return <VideoCard

                                image={preview}
                                name={lang === "ru" ? name : name_eng}
                                authorName={lang === "ru" ? `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}` : `${teacher.last_name_eng} ${teacher.first_name_eng} ${teacher.middle_name_eng}`}
                                date={updated_at}
                                id={id}
                                key={id} />
                        } else {
                            if ((window.innerWidth > 991 && i < 3) || (window.innerWidth <= 991 && i < 1)) {
                                return <VideoCard
                                    image={preview}
                                    name={lang === "ru" ? name : name_eng}
                                    authorName={lang === "ru" ? `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}` : `${teacher.last_name_eng} ${teacher.first_name_eng} ${teacher.middle_name_eng}`}
                                    date={updated_at}
                                    id={id}
                                    key={id} />
                            }
                        }
                    })
                }
            </div>
        </div>
    )
}