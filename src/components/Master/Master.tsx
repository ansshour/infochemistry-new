import { Breadcrumbs } from "../UI/Breadcrumbs/Breadcrumbs"
import styles from "./Master.module.css"
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

export const Master = () => {

    const items = [
        { id: 0, name: "Онлайн-форум «Тебе решать!»", text: `Онлайн-форум «Тебе решать» о том, как пандемия изменила мир IT, роботехники, машинного обучения, кибербезопасности и техпреда` },
        { id: 1, name: "МегаОлимпиада ИТМО", text: "Моделирование и проведение численных расчетов при описании различных видов химических и фазовых равновесий и свойст веществ в растворах. Знания о взаимосвязи физических и химических процессов. Данный курс формирует фундаментальный подход к анализу химических и биохимических процессов" },
        { id: 2, name: "Конкурс стажировки Infochemistry Individual Intensive", text: "Если вы являетесь победителем или призером Мегаолимпиады ИТМО, нужно сравнить соответствие направления олимпиады с направлением подготовки в ИТМО. Если направление олимпиады совпадает с выбранной вами программой вы можете поступить на нее без экзаменов" },
        { id: 3, name: "Конкурс докладов «Конгресс молодых ученых»", text: "Для подачи заявки на стажировку необходмо CV и мотивационное письмо. Победители конкурса определяются по результатам проектной научной работы выполненной во время стажировки в научно-образовательном центре Инфохимии ИТМО" },
        { id: 4, name: "Вступительный экзамен", text: "Участники всероссийского конгресса молодых ученых могут принять участие в конкурсе докладов, победители и призеры конкурса могут поступить в магистратуру без экзаменов" },
        { id: 5, name: "Конкурс «Портфолио» Университета ИТМО", text: "Вступительные испытания будут проводиться с применением дистанционных технологий. Результаты вступительных испытаний действительны при приеме на очередной учебный год. Одно вступительное испытание проводится в различные сроки для различных групп поступающих. Экзамен можно сдавать единожды" },
        { id: 6, name: "Перезачет результатов итоговой государственной аттестации", text: "Конкурс портфолио позволяет мотивированным абитуриентам с научными достижениями (минимум 1 статья или 1 выступление на всероссийской или международной конференции) поступить в магистратуру без сдачи вступительного экзамена. В портфолио следует перечислить сами достижения, а в приложении к портфолио следует добавить подтверждающие документы (сканы сертификатов и дипломов, скриншоты, ссылки на статьи и т.д.)" },
        { id: 7, name: 'Медалист/победитель "Я-профессионал"', text: "По перезачету итогов ГИА поступление возможно на соответствующие и смежные направления подготовки. В каждом конкретном случае решение о перезачете принимает экзаменационная комиссия магистерской программы. О возможности перезачета можно уточнить у контактного лица соответствующей программы магистратуры" },
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
        { name: "Магистратура", link: "/masters" },
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
                    <p className={styles.title}>Магистратура «Инфохимия» 18.04.01</p>
                    <div className={styles.mainInfo1}>
                        <p className={styles.mainTitle}>Основная информация</p>
                        <div className={styles.programInfoBlock}>
                            <div className={styles.point}>
                                <p className={styles.first}>2 года</p>
                                <p className={styles.second}>Очное обучение</p>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}>Английский</p>
                                <p className={styles.second}>Язык обучения</p>
                            </div>
                            <div className={styles.point}>
                                <p className={styles.first}>Места</p>
                                <p className={styles.second}>26 бюджетных <br></br>10 контрактных<br></br> 6 целевых</p>
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
                                <p className={styles.first}><p>МОП</p> <img alt="question" src={question} /></p>
                                <p className={styles.second}>Дополнительные возможности</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainInfo}>
                        <p className={styles.mainInfoTitle}>О программе</p>
                        <p className={styles.mainInfoText}>Программа готовит магистров с углубленными знаниями химии, биотехнологии, компьютерных технологий, математики, информатики и предлагает расширенный вариативный набор курсов по современной химии и смежным областям знаний, таких как хемоинформатика, хемометрика, трибоинформатика и инфохимия.

                            <br></br><br></br>Вы будете участвовать в проектах междисциплинарной направленности, в частности, компьютерного моделирования, анализа и предсказания сложных химических систем. Сможете разрабатывать новые адаптивные биоматериалы и мультифункциональные материалы, системы диагностики. Программа совмещает IT и химию, особое внимание уделяется применению искусственного интеллекта и нейронных сетей в химии и химических технологиях, для анализа новых материалов и систем. Благодаря работе с зарубежными преподавателями (Германия, Израиль, Сингапур) и стажировок в ведущих мировых университетах и научных центрах, вы совершенствуете знания иностранных языков.
                        </p>
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
                        <p className={styles.carierText}>Выпускники могут построить карьеру на предприятиях химических, пищевых, фармацевтических и медицинских производств, в лабораториях и клиниках научных центров, ведущих научных центрах в области химии и информационных технологиях, биотехнологии, фармацевтики.</p>
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