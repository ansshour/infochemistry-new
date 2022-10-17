import { useEffect, useState } from "react"
import $api from "../../http"
import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import { Slider } from "../UI/Slider/Slider"
import styles from "./About.module.css"
import { t } from "i18next"
import { useTranslation } from "react-i18next"
import { Loader2 } from "../UI/Loader2/Loader2"
import image1 from "./res/image1.png";
import image2 from "./res/image2.png";
import image3 from "./res/image3.png"
import blue from "./res/blue.png";
import green from "./res/green.png";
import purple from "./res/purple.png"
import advantages from "./res/advantages.png"
import education from "./res/education.png"
import cube from "./res/cube.png"
import { sleep } from "../../services/sleep"

export const About = () => {

    const lang = localStorage.getItem("i18nextLng");

    const { t } = useTranslation()

    const info = [
        { name: t("aboutUs.breadcrumbs.main"), link: "/" },
        { name: t("aboutUs.breadcrumbs.aboutTheCenter"), link: "" },
        { name: t("aboutUs.breadcrumbs.about"), link: "/about" },
    ]

    const [content, setContent] = useState<any>(null)
    const [data, setData] = useState<any>([])
    const [loader, setLoader] = useState(true)

    const dangerTextEnter = (text: string) => {
        return { __html: text };
    }

    const getContent = async () => {
        try {
            const response = await $api.get("page_content/about/");
            setContent(response.data)
            setData(response.data.slider_items.map(({ text, text_eng, image, attachment_file, attachment_name, attachment_name_eng }) => {
                return ({
                    image: image,
                    linkName: lang === "ru" ? attachment_name : attachment_name_eng,
                    link: attachment_file,
                    text: lang === "ru" ? text : text_eng
                })
            }))
        } catch (err) {

        }
    }

    useEffect(() => {
        getContent()
    }, [])

    const fakeLoader = async () => {
        await sleep(500);
        setLoader(false)
    }

    useEffect(() => {
        fakeLoader()
    }, [])

    return (
        <div className={styles.wrapper}>
            <Breadcrumbs info={info} />
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <p className={styles.title}>Больше информации о НОЦ Инфохимии</p>
                    <div className={styles.imageBlock}>
                        <p className={styles.imageTitle}>НОЦ Инфохимии</p>
                        <img alt="image1" src={image1} />
                        <div className={styles.green}>
                            <img alt="green" src={green} />
                            <p className={styles.text}>Организация и участие в научно-популярных лекциях и мероприятиях</p>
                        </div>
                        <div className={styles.blue}>
                            <img alt="blue" src={blue} />
                            <p className={styles.text}>Ученые имеют свободный доступ к высокотехнологичному приборному парку</p>
                        </div>
                        <div className={styles.purple}>
                            <p className={styles.text}>Совместные лаборатории</p>
                            <img alt="purple" src={purple} />
                        </div>
                        <img alt="image2" src={image2} className={styles.image2} />
                        <img alt="image3" src={image3} className={styles.image3} />
                    </div>
                    <p className={styles.advantagesTitle}>Возможности</p>
                    <div className={styles.advantages}>
                        <div className={styles.advantages__left}>
                            <p className={styles.advantagesText}>Сотрудники подразделения, студенты и молодые ученые имеют свободный доступ к высокотехнологичному приборному парку, что позволяет работать над собственным проектом и дает возможность публикации в высокорейтинговых международных научных журналах, таких как Nature, Science, Advanced Materials, Angew. Chem. Int. Ed., J. Am. Chem. Soc. и др.<br></br><br></br>
                                Центр активно сотрудничает с индустриальными партнёрами различных отраслей. Такой подход позволяет создавать собственные стартапы и открывает возможности вывода разрабатываемых продуктов на реальный рынок России и мира
                                в целом.</p>
                        </div>
                        <div className={styles.advantages__right}>
                            <img alt="advantages" src={advantages} />
                        </div>
                    </div>
                    <div className={styles.labs}>
                        <img alt="cube" src={cube} className={styles.cube} />
                        <p className={styles.labsTitle}>Совместные лаборатории</p>
                        <p className={styles.labsText}>На базе центра созданы 2 совместные лаборатории</p>
                        <div className={styles.labsBlocks}>
                            <div className={styles.labBlock}>Искусственный Интеллект (ИИ)<br></br>
                                для умных и функциональных материалов
                            </div>
                            <div className={styles.labBlock}>Активные материалы и поверхности<br></br>
                                Великобритания
                            </div>
                        </div>
                    </div>
                    <div className={styles.partners}>
                        <p className={styles.partnersTitle}>Международные партнёры</p>
                        <p className={styles.partnersText}>НОЦ Инфохимии активно сотрудничает с ведущими зарубежными научно-исследовательскими лабораториями. Студенты имеют возможность стажироваться в научных группах под руководством профессора Джорджа Вайтсайда (Гарвардский университет, США), профессора Сергея Семёнова (Институт Вейцмана, Израиль), участвовать в совместном проекте с департаментом биоматериалов в институте им. Макса Планка  (г. Потсдам, Германия), пройти стажировку в Национальном Университете Сингапура под руководством профессора К.С. Новосёлова (Нобелевский лауреат по физике, 2010 г.) и профессора Д.В. Андреевой-Боймлер.<br></br><br></br>
                            Магистранты и аспиранты регулярно посещают страны Европейского союза (Германия, Хорватия, Бельгия, Испания и др.) по программе Erasmus+, которая полностью покрывает все расходы (проезд, проживание) и даёт возможность поработать в современных зарубежных научных лабораториях. Научный консультант центра – лауреат Нобелевской премии по химии Жан-Мари Лен.</p>
                    </div>
                    <div className={styles.education}>
                        <p className={styles.educationTitle}>Подход к образовательной деятельности</p>
                        <div className={styles.educationSections}>
                            <p className={styles.educationText}>
                                Сегодня на базе научного центра развиваются самые актуальные научные направления и реализуются образовательные программы для бакалавров и магистров. Образование в НОЦ Инфохимии ведется в тесном контакте с выполнением научных проектов, в рамках подхода «образование через науку».<br></br><br></br>
                                Подготовка специалистов осуществляется по совершенно новому направлению, аналогов которого нет в России.  Студенты имеют уникальную возможность совершенствовать английский язык, обучаясь вместе с носителями языка и общаясь с преподавателями из разных стран.
                            </p>
                            <div>
                                <img alt="image" src={education} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}