import styles from "./ScheduleCard.module.css"
import teacherImg from "./res/teacher.svg"
import placeImg from "./res/place.svg"
import { useContext, useState } from "react";
import { FaClock } from "react-icons/fa";
import zoomImg from "./res/zoom.svg"
import { useTranslation } from "react-i18next";

type Place = {
    auditorium: string;
    address: string;
}

type Props = {
    time: string;
    name: string;
    teacher?: string;
    place?: Place;
    color?: string;
    even?: boolean;
    zoom?: string;
    lesson_parity?: string;
    weekday?: number;
}


export const ScheduleCard: React.FC<Props> = ({ time, name, teacher, place, color, even, zoom, lesson_parity, weekday }) => {

    const { t } = useTranslation()

    const replaceTime = (time_id: number) => {
        if (time_id === 1) return "8:20"
        if (time_id === 2) return "10:00"
        if (time_id === 3) return "11:40"
        if (time_id === 4) return "13:30"
        if (time_id === 5) return "15:20"
        if (time_id === 6) return "17:00"
        if (time_id === 7) return "18:40"
        if (time_id === 8) return "20:20"
    }

    const colorByType = (type: string) => {
        if (type === "lecture") return "#0091FF"
        if (type === "practice") return "#F7B500"
        if (type === "laboratory") return "#A50AFF"
    }

    const nameByType = (type: string) => {
        if (type === "lecture") return "Лекция"
        if (type === "practice") return "Практика"
        if (type === "laboratory") return "Лабораторная работа"
    }


    const [isShowDetailInfo, setIsShowDetailInfo] = useState(false);

    const timeToFormat = (time: string) => {
        let timeSplited = time?.split(":");
        let nextTimeInMinutes = Number(timeSplited[0]) * 60 + Number(timeSplited[1]) + 90;
        return `${time} - ${Math.floor(nextTimeInMinutes / 60)}:${nextTimeInMinutes % 60}`
    }

    return (
        <>
            <div className={styles.container}
                onMouseLeave={() => {
                    setIsShowDetailInfo(false)
                }}
                style={teacher !== undefined || place !== undefined ? { height: "100%" } : { height: "100.09px" }}
                onMouseEnter={() => {
                    setIsShowDetailInfo(true)
                }
                }
            >
                <div className={styles.leftLine} style={{ backgroundColor: `${colorByType(color)}` }}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <p className={styles.time} style={{ color: `${colorByType(color)}` }}>{replaceTime(Number(time))}</p>
                            {/* <div className={styles.weekType} style={lesson_parity === "all" ? { display: "none" } : {}}>
                                {lesson_parity === "even" && "чет."}
                                {lesson_parity === "odd" && "нечет."}
                            </div> */}
                        </div>
                        <p className={styles.name} style={!name ? { display: "none" } : {}}>{name}</p>
                        <div className={styles.teacher} style={!teacher ? { display: "none" } : {}}>
                            <img alt="teacherIcon" src={teacherImg} />
                            <p>{teacher}</p>
                        </div>

                        <div className={styles.place} style={!place.auditorium || !place.address ? { display: "none" } : {}}>
                            <img alt="teacherIcon" src={placeImg} />
                            <p>
                                <p>{`${place.auditorium} ${t("schedule.aud")}`}</p>
                                <p>{place.address}</p>
                            </p>
                        </div>
                    </div>
                </div>
                {isShowDetailInfo &&
                    <div className={styles.detailInfo} style={weekday === 5 ? { left: "-305px" } : {}}>
                        <div className={styles.top__detail}>
                            <div className={styles.type__detail} style={{ backgroundColor: `${colorByType(color)}` }}>{nameByType(color)}</div>
                            <div className={styles.time__detail}>
                                <p style={{ color: `${colorByType(color)}`, fontWeight: "bold" }}>{timeToFormat(replaceTime(Number(time)))}</p>
                            </div>
                        </div>
                        <p className={styles.name__detail} style={!name ? { display: "none" } : {}}>{name}</p>
                        <div className={styles.teacher__detail} style={!teacher ? { display: "none" } : {}}>
                            <img alt="teacherIcon" src={teacherImg} />
                            <p>{teacher}</p>
                        </div>
                        <div className={styles.place__detail} style={!place.auditorium || !place.address ? { display: "none" } : {}}>
                            <img alt="teacherIcon" src={placeImg} className={styles.icon__detail} />
                            <p>
                                <p>{`${place.auditorium} ${t("schedule.aud")}`}</p>
                                <p>{place.address}</p>
                            </p>
                        </div>
                        <div className={styles.zoom} style={!zoom ? { display: "none" } : {}}>
                            <a href={zoom} target="_blank"><img alt="zoom" src={zoomImg} /></a>
                        </div>
                        <div className={styles.parity}>
                            <p>{lesson_parity === "even" && "Только по четным неделям"}</p>
                            <p>{lesson_parity === "odd" && "Только по нечетным неделям"}</p>
                        </div>
                    </div>}
            </div>
        </>
    )
}