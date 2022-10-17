import { useTranslation } from "react-i18next";
import styles from "./Specializations.module.css"
import { Table } from "./Table/Table"


const lang = localStorage.getItem("i18nextLng");


const dataTable1 = [
    {
        title: "#1 Фундаментальные основы молекулярно-организованных систем и инфохимии",
        desc: [
            "Специализация базируется на современных подходах к системной химии и охватывает вопросы хранения и передачи на молекулярном уровне.",
            "В рамках данной специализации рассматриваются закономерности поведения открытых физико-химических систем со значительными отклонениями от равновесия.",
            "Большое внимание уделяется вопросам неравновесной термодинамики, формированию диссипативных структур."
        ]
    },
    {
        title: "Возможные професии",
        desc: [
            "инженеры-исследователи",
            "аналитики в крупных исследовательских центрах и инновационных стартапах,",
            "научные сотрудники в академической среде в ведущих мировых и российских вузах"
        ]
    },
    {
        title: "Дисциплины специализации",
        desc: [
            { title: "Сонохимия и фотохимические методы в химии", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
            { title: "Математические основы описания нелинейных химических систем", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
            { title: "Теория перколяции", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
            { title: "Нелинейные химические системы и химический компьютер", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
        ]
    },
]

const dataTable2 = [
    {
        title: "#2 Цифровизация химических технологий",
        desc: [
            "Специализация базируется на современных подходах к системной химии и охватывает вопросы хранения и передачи на молекулярном уровне.",
            "В рамках данной специализации рассматриваются закономерности поведения открытых физико-химических систем со значительными отклонениями от равновесия.",
            "Большое внимание уделяется вопросам неравновесной термодинамики, формированию диссипативных структур."
        ]
    },
    {
        title: "Возможные професии",
        desc: [
            "сотрудники R&D-подразделений индустриальных химических и биотехнологических компаний",
            "исследователи в области применения и адаптации роботизированных систем в химии и биологии",
        ]
    },
    {
        title: "Дисциплины специализации",
        desc: [
            { title: "Синхронизация электрохимических и биологических осцилляторов", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
            { title: "Математические основы описания нелинейных химических систем", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
            { title: "Теория перколяции", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
            { title: "Нелинейные химические системы и химический компьютер", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate cumque ad vitae totam explicabo, quo quibusdam inventore nam aliquam rerum magni libero cum tenetur fugit sint ducimus amet animi." },
        ]
    },
]

export const Specializations = ({ spec }) => {
    const lang = localStorage.getItem("i18nextLng");
    const { t } = useTranslation()
    return (
        <div className={styles.container}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>{t("masters.spec")}</h2>
                <p className={styles.titleDesc}>{t("masters.secsem")}</p>
            </div>
            <div className={styles.tables}>
                {spec?.map((item, i) => (
                    <Table
                        key={i}
                        data={[
                            {
                                title: lang === "ru" ? item.name : item.name_eng,
                                desc: lang === "ru" ? item.description : item.description_eng,
                            },
                            {
                                title: lang === "ru" ? "Возможные професии" : "Possible professions",
                                desc: lang === "ru" ? item.professions : item.professions_eng,
                            },
                            {
                                title: lang === "ru" ? "Дисциплины специализации" : "Disciplines of specialization",
                                desc: lang === "ru" ? item.disciplines : item.disciplines_eng,
                            },
                        ]}
                    />
                ))}
            </div>
        </div>
    )
}