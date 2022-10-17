import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import styles from "./Aspirantura.module.css"
import $api from "../../http"
import { useEffect, useState } from "react"
import { Slider } from "../UI/Slider/Slider"
import { useTranslation } from "react-i18next"
import { Loader2 } from "../UI/Loader2/Loader2"
import question from "./res/question.png"
import link from "./res/link.png"
import { Accordion3 } from "../UI/Accordion3/Accordion"
import partner1 from "./res/partner1.png"
import partner2 from "./res/partner2.png"
import partner3 from "./res/partner3.png"
import partner4 from "./res/partner4.png"
import mail from "./res/mail.png"
import phone from "./res/phone.png"
import { sleep } from "../../services/sleep"

export const Aspirantura = () => {

    const items = [
        { id: 0, name: "Общая химия", text: `Формирование научного мировоззрения и получение базовых знаний для успешного усвоения всех других химических дисциплин, создание научно-практической основы для изучения дисциплин профессиональной направленности` },
        { id: 1, name: "Физическая химия", text: "Моделирование и проведение численных расчетов при описании различных видов химических и фазовых равновесий и свойст веществ в растворах. Знания о взаимосвязи физических и химических процессов. Данный курс формирует фундаментальный подход к анализу химических и биохимических процессов" },
        { id: 2, name: "Компьютерные методы и моделирование", text: "Формирование систематических знаний о современных методах компьютерного моделирования, их месте и роли в химии, а также расширение и углубление знаний, умений и навыком студетов в области информационных технологий и естественных наук" },
        { id: 3, name: "Физические и спектральные методы исследования", text: "Целью дисциплины является приобретение теоретических знаний и навыков в области физико-химических методов анализа различных объектов, умение на основе поставленных задач правильно оценивать и выбирать методы аналитического контроля" },
        { id: 4, name: "Химия высокомолекулярных соединений", text: "Приобретение современных теоретических знаний о строении, свойствах и функциях основных классов биологических макромолекул, играющих решающую роль в нормальной жизнедеятельности клеток и организмов, о закономерностях биохимических процессов, механизмах их регуляции и значении рассматриваемых биохимических процессов" },
        { id: 5, name: "Технология катализаторов и автокатализ", text: "Знания о теоретических основах сорбции и катализа, классификации и особенности кинетики и динамики процессов сорбции и десорбции" },
        { id: 6, name: "Коллоидная химия", text: "Разработка новых методов разделения и концентрирования в химическом анализе и радиохимии" },
        { id: 7, name: "Инфохимия", text: "Приобретение современных теоретических знаний о строении, свойствах и функциях основных классов биологических макромолекул, играющих решающую роль в нормальной жизнедеятельности клеток и организмов, о закономерностях биохимических процессов, механизмах их регуляции и значении рассматриваемых биохимических процессов" },
        { id: 8, name: "Аналитическая химия", text: "Содержание дисциплины охватывает круг вопросов, связанных с теорией химических равновесий в растворе и в системах «осадок – раствор», а также с применением методов математической статистики для обработки результатов анализа. Достижение способности использования теоретических и практических знаний и умений для решения аналитических задач" },
        { id: 9, name: "Супрамолекулярная химия", text: "Приобретение современных теоретических знаний о строении, свойствах и функциях основных классов биологических макромолекул, играющих решающую роль в нормальной жизнедеятельности клеток и организмов, о закономерностях биохимических процессов, механизмах их регуляции и значении рассматриваемых биохимических процессов" },
        { id: 10, name: "Биохимия", text: "Приобретение современных теоретических знаний о строении, свойствах и функциях основных классов биологических макромолекул, играющих решающую роль в нормальной жизнедеятельности клеток и организмов, о закономерностях биохимических процессов, механизмах их регуляции и значении рассматриваемых биохимических процессов" },
        { id: 11, name: "Физико-химическое приложение математических методов", text: "Формирование научного мировоззрения и получение базовых знаний для успешного усвоения всех других химических дисциплин, создание научно-практической основы для изучения дисциплин профессиональной направленности" },
        { id: 12, name: "Химические сенсоры", text: "Освоение принципов и навыков использования лабораторных алгоритмов при различных формах химического анализа, подготовка выпускника к выполнению профессиональной деятельности в клинико-диагностических лабораториях и научных учреждениях" },
        { id: 13, name: "Методы разделения и концентрирования", text: "Разработка новых методов разделения и концентрирования в химическом анализе и радиохимии" },
        { id: 14, name: "Неорганическая химия", text: "Термодинамическая оценка возможности протекания реакций, оценка возможности протекания окислительно-восстановительных реакций для проведения химического эксперимента" },
    ]

    const [activeAccordionItem, setActiveAccordionItem] = useState(null)

    const lang = localStorage.getItem("i18nextLng");

    const { t } = useTranslation()

    const dangerTextEnter = (text: string) => {
        return { __html: text };
    }

    const info = [
        { name: t("aspirantura.breadcrumbs.main"), link: "/" },
        { name: t("aspirantura.breadcrumbs.abuturients"), link: "" },
        { name: "Бакалавриат", link: "/bachelor" },
    ]

    const [content, setContent] = useState<any>([])
    const [data, setData] = useState<any>([])
    const [tableData, setTableData] = useState<any>([])
    const [loader, setLoader] = useState(true)

    const getContent = async () => {
        try {
            const { data } = await $api.get(`page_content/postgraduate/`);
            setContent(data)
            setData(data.slider_items.map(({ text, text_eng, image, attachment_file, attachment_name, attachment_name_eng }) => {
                return ({
                    image: image,
                    linkName: lang === "ru" ? attachment_name : attachment_name_eng,
                    link: attachment_file,
                    text: lang === "ru" ? text : text_eng
                })
            }))
            setTableData(data.main_table_items.map(({ header, header_eng, text, text_eng, image }) => {
                return (
                    {
                        title: lang === "ru" ? header : header_eng,
                        image: image,
                        desc: lang === "ru" ? text : text_eng
                    }
                )
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
        <>
            <Breadcrumbs info={info} />
            {loader ? <Loader2 /> : (
                <div className={styles.container}>
                    <p className={styles.title}>Бакалавриат «Инфохимия» 18.03.01</p>
                    <div className={styles.mainInfo1}>
                        <p className={styles.mainTitle}>Основная информация</p>
                        <div className={styles.programInfoBlock}>
                            <div className={styles.point}>
                                <p className={styles.first}>4 года</p>
                                <p className={styles.second}>Очное обучение</p>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}>Русский</p>
                                <p className={styles.second}>Язык обучения</p>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}>Места</p>
                                <p className={styles.second}>30 бюджетных<br></br> 10 контрактных</p>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}>Учебный план</p>
                                <a className={[styles.second, styles.link].join(" ")}><img alt="link" src={link} /><p>Учебный план. Ссылка</p></a>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}>320 000 руб./год</p>
                                <p className={styles.second}>Стоимость обучения</p>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}><p>МХР</p> <img alt="question" src={question} /></p>
                                <p className={styles.second}>Вступительные экрамены</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainInfo}>
                        <p className={styles.mainInfoTitle}>О программе</p>
                        <p className={styles.mainInfoText}>Инфохимия — это новая область экспериментальной науки на пересечении химии, биологии, компьютерных технологий и математики.
                            <br></br><br></br>Первая и единственная в России программа подготовки высококвалифицированных специалистов, в основе которой лежит принцип образования через науку и междисциплинарного обучения на стыке химии и химических технологий с биологией, биотехнологией, математикой, информатикой и даже робототехникой. Студенты принимают участие в проектах междисциплинарной направленности, в частности, компьютерного моделирования и анализа сложных систем химии и биологии, биотехнологии, создания адаптивных биоматериалов и разработки систем диагностики, моделирования и анализа персонализированного трекинга в медицине и питании.
                        </p>
                    </div>
                    <div className={styles.disciplines}>
                        <p className={styles.disciplinesTitle}>Дисциплины</p>
                        <div className={styles.wrapperAccordons}>
                            <div className={styles.disciplinesAccordions}>
                                {items.map(({ name, text, id }, i: number) => (
                                    !(i % 2) ? <Accordion3 isOpen={id === activeAccordionItem} name={name} text={text} onClick={() => { id === activeAccordionItem ? setActiveAccordionItem(null) : setActiveAccordionItem(id) }} /> : null
                                ))}
                            </div>
                            <div className={styles.disciplinesAccordions}>
                                {items.map(({ name, text, id }, i: number) => (
                                    i % 2 ? <Accordion3 isOpen={id === activeAccordionItem} name={name} text={text} onClick={() => { id === activeAccordionItem ? setActiveAccordionItem(null) : setActiveAccordionItem(id) }} /> : null
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.partners}>
                        <p className={styles.partnersTitle}>Партнеры программы</p>
                        <div className={styles.partnerLogos}>
                            <img alt="partner" src={partner1} />
                            <img alt="partner" src={partner2} />
                            <img alt="partner" src={partner3} />
                            <img alt="partner" src={partner4} />
                        </div>
                    </div>
                    <div className={styles.carier}>
                        <p className={styles.carierTitle}>Карьера</p>
                        <p className={styles.carierText}>Специалисты, работающие на стыке химии и информатики, роботехники, биотехнологии на уровне передовых научных достижений, будут востребованы в ведущих научных учреждениях как в России, так и за рубежом. Примерная заработная плата таких специалистов начинается от 80 тыс. руб.<br></br><br></br>

                            Выпускники имеют широкие перспективы трудоустройства на предприятиях химических, пищевых, фармацевтических и медицинских производств, в лабораториях и клиниках научных центров, ведущих научных центрах в области химии и информационных технологиях, биотехнологии, фармацевтики. Выпускники программы смогут работать в самых перспективных областях науки и техники</p>
                    </div>
                    <div className={styles.manager}>
                        <p className={styles.managerTitle}>Менеджер программы</p>
                        <div className={styles.contacts}>
                            <p className={styles.contactsName}>Анна Андреевна Балдина</p>
                            <div className={styles.mail}>
                                <img alt="mail" src={mail} />
                                <p>aastekolshchikova@itmo.ru</p>
                            </div>
                            <div className={styles.phone}>
                                <img alt="phone" src={phone} />
                                <p>+7-921-596-10-37</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}