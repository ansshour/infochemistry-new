import { ProjectCard } from "./ProjectCard/ProjectCard"
import styles from "./Projects.module.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { sleep } from "../../services/sleep"
import { Loader2 } from "../UI/Loader2/Loader2"

const CircleCard: React.FC<any> = ({ name, className }) => {
    return (
        <div className={[styles.circleCard, className].join(" ")}>
            {name}
        </div>
    )
}

export const Projects = () => {

    const navigate = useNavigate()

    const [loader, setLoader] = useState(true)

    const items = [
        { name: "INFOCHEM LABS", text: "Проект сделан для удобной работы с лабораторными работами преподавателей Инфохимии", id: 0, link: "/online_lab" },
        { name: "INFOCHEM ROBO", text: "В этом разделе вы можете изучть и забронировать оборудование НОЦ Инфохимии", id: 1, link: "/robo" },
        { name: "INFOCHEM SEARCH", text: "Удобный поиск для химиков, исследователей и т. д по химической базе знаний ", id: 2, link: null },
        { name: "INFOCHEM MINE", text: "На базе НОЦ Инфохимии у нас разрабатываются 5 проектов. С каждым вы можете ознакомиться подробнее в разделах ", id: 3, link: null },
        { name: "INFOCHEM VR", text: "На базе НОЦ Инфохимии у нас разрабатываются 5 проектов.", id: 4, link: null },
    ]

    const classnames = [
        { classname: styles.first, id: 0 },
        { classname: styles.second, id: 2 },
        { classname: styles.third, id: 4 },
        { classname: styles.fourth, id: 3 },
        { classname: styles.fifth, id: 1 },
    ]

    const [activeItem, setActiveItem] = useState<number>(null)

    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])


    return (
        <>
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <h1 className={styles.title}>Проекты</h1>
                    <div className={styles.wrapper}>
                        <div className={styles.projectCards}>
                            {items.map(({ name, text, id, link }) => <ProjectCard key={id} onClick={() => navigate(link)} name={name} text={text} onMouseLeave={() => { setActiveItem(null) }} onMouseEnter={() => setActiveItem(id)} />)}
                        </div>
                        <div className={styles.circle}>

                            <div className={styles.circleElement}>
                                <CircleCard name={"INFOCHEM LABS"} className={styles.labs} />
                                <CircleCard name={"INFOCHEM SEARCH"} className={styles.search} />
                                <CircleCard name={"INFOCHEM VR"} className={styles.vr} />
                                <CircleCard name={"INFOCHEM MINE"} className={styles.mine} />
                                <CircleCard name={"INFOCHEM ROBO"} className={styles.robo} />
                                <div className={styles.center} />
                                {classnames.map(({ classname, id }) => <div key={id} className={[classname, styles.circleElementMainBasic, activeItem === id ? styles.active : ""].join(" ")} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}