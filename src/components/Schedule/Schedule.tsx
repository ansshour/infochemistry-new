import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import $api from "../../http"
import { sleep } from "../../services/sleep"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { BtnToggle } from "../UI/BtnToggle/BtnToggle"
import { Loader2 } from "../UI/Loader2/Loader2"
import { Loader3 } from "../UI/Loader3/Loader3"
import { ScheduleCard } from "../UI/ScheduleCard/ScheduleCard"
import { Warning } from "../UI/Warning/Warning"
import styles from "./Schedule.module.css"

export const Schedule = () => {

    const { t } = useTranslation()

    const random = useMemo(() => {
        return Math.random() * 10000
    }, [])

    const lang = localStorage.getItem("i18nextLng");

    const weekVariables = [
        { id: 0, number: t("schedule.all"), parity: "all" },
        { id: 1, number: t("schedule.even"), parity: "even" },
        { id: 2, number: t("schedule.odd"), parity: "odd" },
    ]

    const replaceParity = (id: number) => {
        if (id === 0) return "all"
        if (id === 1) return "even"
        if (id === 2) return "odd"
    }

    const info = [
        { name: t("schedule.breadcrumbs.main"), link: "/" },
        { name: t("schedule.breadcrumbs.students"), link: "" },
        { name: t("schedule.breadcrumbs.schedule"), link: "/schedule" },
    ]


    const weeks = [
        { rus: t("schedule.monday"), id: 0 },
        { rus: t("schedule.tuesday"), id: 1 },
        { rus: t("schedule.wednesday"), id: 2 },
        { rus: t("schedule.Thursday"), id: 3 },
        { rus: t("schedule.Friday"), id: 4 },
        { rus: t("schedule.Saturday"), id: 5 },
    ]


    const [activeWeek, setActiveWeek] = useState(weekVariables[0])
    const [activeGroup, setActiveGroup] = useState(null)
    const [times, setTimes] = useState<any>([])
    const [groupVariables, setGroupVariables] = useState<any>([])
    // const [schedule, setSchedule] = useState([])
    const [monday, setMonday] = useState([])
    const [tuesday, setTuesday] = useState([])
    const [wednesday, setWednesday] = useState([])
    const [thursday, setThursday] = useState([])
    const [friday, setFriday] = useState([])
    const [saturday, setSaturday] = useState([])
    const [notification, setNotification] = useState("");
    const [loader, setLoader] = useState(true)

    const getTimeSlots = async () => {
        try {
            const { data } = await $api.get("timetable/time_slots")
            setTimes(data)
        } catch (err) {

        }

    }

    const getGroups = async () => {
        try {
            const { data } = await $api.get("groups/")
            setGroupVariables(data)
            setActiveGroup(data[0])

        } catch (err) {

        }
    }

    const diff = (arr1: any, arr2: any) => arr1.filter(i => !arr2.includes(i))

    const getSchedule = async () => {
        try {
            if (activeGroup) {
                const { data } = await $api.get(`timetable/lessons?group=${activeGroup.id}`);
                // setSchedule(data)
                const even = data.filter(item => item.lesson_parity === "even")
                const odd = data.filter(item => item.lesson_parity === "odd")
                let schedule;
                if (replaceParity(activeWeek.id) === "all") schedule = data
                if (replaceParity(activeWeek.id) === "even") schedule = diff(data, odd)
                if (replaceParity(activeWeek.id) === "odd") schedule = diff(data, even)
                setMonday(schedule.filter(({ weekday }) => weekday === 0))
                setTuesday(schedule.filter(({ weekday }) => weekday === 1))
                setWednesday(schedule.filter(({ weekday }) => weekday === 2))
                setThursday(schedule.filter(({ weekday }) => weekday === 3))
                setFriday(schedule.filter(({ weekday }) => weekday === 4))
                setSaturday(schedule.filter(({ weekday }) => weekday === 5))

            }
        } catch (err) {

        }
    }

    const getNotification = async () => {
        try {
            const { data } = await $api.get("/timetable/notifications/");
            setNotification(data.length && data[0])
        } catch (err) {

        }
    }


    useEffect(() => {
        getTimeSlots()
        getGroups()
        getSchedule()
        getNotification()
    }, [])

    useEffect(() => {
        getSchedule()
    }, [activeGroup, activeWeek])

    const fakeloader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeloader()
    }, [])


    return (
        <>

            <>
                <Breadcrumbs info={info} />
                {loader ? <Loader2 /> : (
                    <div className={styles.container}>
                        <h1 className={styles.title}>
                            {t("schedule.title")}
                        </h1>
                        <div className={styles.numberWeek}>
                            {/* tgt */}
                        </div>
                        <div className={styles.topBlock}>
                            <div className={styles.week}>
                                <p className={styles.topBlock__title}>{t("schedule.week")}</p>
                                <BtnToggle fontColor="black" variables={weekVariables} activeColor="#79F3EC" activeElement={activeWeek} setActiveElement={setActiveWeek} />
                            </div>
                            <div className={styles.groups}>
                                <p className={styles.topBlock__title}>{t("schedule.group")}</p>
                                <BtnToggle fontColor="white" variables={groupVariables} activeColor="#229FFF" activeElement={activeGroup} setActiveElement={setActiveGroup} />
                            </div>
                            <div className={styles.warningBlock} style={!notification ? { display: "none" } : {}}>
                                <Warning text={notification} />
                            </div>
                        </div>
                        <div className={styles.scheaduleWrapper}>
                            <div className={styles.Weeks}>
                                {weeks.map(({ rus }) => <p key={rus}>{rus}</p>)}
                            </div>
                            <p className={styles.timeWrite}>{t("schedule.time")}</p>
                            <div className={styles.times}>
                                {times.map(({ start, id }) => <p key={id}>{start}</p>)}
                            </div>
                            <div className={styles.scheduleGrid}>
                                <div className={styles.dayOfWeek}>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 1).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 2).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 3).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 4).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 5).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 6).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 7).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{monday.filter(({ time_slot, lesson_parity }) => time_slot === 8).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                </div>
                                <div className={styles.dayOfWeek}>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 1).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 2).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 3).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 4).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 5).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 6).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 7).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{tuesday.filter(({ time_slot, lesson_parity }) => time_slot === 8).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                </div>
                                <div className={styles.dayOfWeek}>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 1).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 2).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 3).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 4).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 5).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 6).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 7).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{wednesday.filter(({ time_slot, lesson_parity }) => time_slot === 8).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                </div>
                                <div className={styles.dayOfWeek}>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 1).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 2).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 3).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 4).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 5).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 6).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 7).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{thursday.filter(({ time_slot, lesson_parity }) => time_slot === 8).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                </div>
                                <div className={styles.dayOfWeek}>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 1).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 2).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 3).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 4).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 5).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 6).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 7).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{friday.filter(({ time_slot, lesson_parity }) => time_slot === 8).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                        />
                                    ))}
                                    </div>
                                </div>
                                <div className={styles.dayOfWeek}>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 1).map(({ name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type, weekday }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 2).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 3).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 4).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 5).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 6).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 7).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                    <div className={styles.area}>{saturday.filter(({ time_slot, lesson_parity }) => time_slot === 8).map(({ weekday, name, name_eng, time_slot, teacher_name, teacher_name_eng, classroom, classroom_eng, address, address_eng, zoom_link, lesson_parity, lesson_type }) => (
                                        <ScheduleCard
                                            key={`${name} ${time_slot}`}
                                            name={lang === "ru" ? name : name_eng}
                                            time={time_slot}
                                            teacher={lang === "ru" ? teacher_name : teacher_name_eng}
                                            place={{ auditorium: lang === "ru" ? classroom : classroom_eng, address: lang === "ru" ? address : address_eng }}
                                            zoom={zoom_link}
                                            lesson_parity={lesson_parity}
                                            color={lesson_type}
                                            weekday={weekday}
                                        />
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </>

        </>
    )
}