import styles from "./Main.module.css";
import { Button2 } from "../UI/Button2/Button2";
import bgImage from "./res/bgImage.gif"
import icon1 from "./res/icon1.svg"
import icon2 from "./res/icon2.svg"
import icon3 from "./res/icon3.svg"
import bgAdvantages from "./res/Cube4Transparent.png"
import bottle from "./res/bottle.svg"
import partnersImage1 from "./res/rosnano.png";
import partnersImage2 from "./res/partnersImage2.svg";
import partnersImage3 from "./res/gazprom.png";
import icon1Webp from "./res/icon1.webp"
import icon2Webp from "./res/icon2.webp"
import icon3Webp from "./res/icon3.webp"
import bgAdvantagesWebp from "./res/Cube4Transparent.webp"
import bottleWebp from "./res/bottle.webp"
import partnersImage1Webp from "./res/rosnano.webp";
import partnersImage2Webp from "./res/partnersImage2.webp";
import partnersImage3Webp from "./res/gazprom.webp";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const infoAnim = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
}

const advantagesAnim = {
    hidden: {
        x: 500,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
}


export const Main = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <p className={styles.title}>Infochemistry Scientific Center</p>
                        <p className={styles.titleDesc}>Первый научно-образовательный центр инфохимии на базе Университета ИТМО в России</p>
                        <div className={styles.btn}><Link to={"/about"}><Button2 type={4}>Подробнее</Button2></Link></div>
                        <div className={styles.toggleLang}>
                            <p className={[styles.ru, styles.active].join(" ")}>Ru</p>
                            <p className={styles.en}>En</p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <img alt="bg" src={bgImage} className={styles.gif} />
                        <div className={styles.links}>
                            <div>
                                <div className={[styles.link, styles.first].join(" ")}>
                                    <p>Современная</p>
                                    <p>лаборатория</p>
                                </div>
                            </div>
                            <div>
                                <div className={[styles.link, styles.second].join(" ")}>
                                    <p>Международные</p>
                                    <p>коллаборации</p>
                                </div>
                            </div>
                            <div>
                                <div className={[styles.link, styles.third].join(" ")}>
                                    <p>Перспективные</p>
                                    <p>исследования</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.infochemistryDesc}>
                    <h2 className={styles.infochemistryTitle}>Инфохимия</h2>
                    <p className={styles.infochemistryText}>область экспериментальной
                        химии,  изучающая возможность обработки информации
                        на молекулярном уровне</p>
                </div>
                <div
                    className={styles.pages}>
                    <div className={styles.bgImages}>
                        <picture className={styles.firstBg}>
                            <source srcSet={icon1Webp} type="image/webp" />
                            <img alt="image" src={icon1} />
                        </picture>
                        <picture>
                            <source srcSet={icon2Webp} className={styles.center} type="image/webp" />
                            <img className={styles.center} alt="image" src={icon2} />
                        </picture>
                        <picture className={styles.thirdBg}>
                            <source srcSet={icon3Webp} type="image/webp" />
                            <img alt="image" src={icon3} />
                        </picture>
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.8 }}
                        className={styles.pages__links}>
                        <motion.div className={styles.pagesLink} onClick={() => window.location.href = "/main_directions"} variants={infoAnim}>
                            Исследования
                        </motion.div>
                        <motion.div className={styles.pagesLink} onClick={() => window.location.href = "/aspirantura"} variants={infoAnim}>
                            Образования
                        </motion.div>
                        <motion.div className={styles.pagesLink} onClick={() => window.location.href = "/projects"} variants={infoAnim}>
                            Проекты
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <div className={styles.advantages}>
                <div className={styles.container}>
                    <motion.div className={styles.advantagesWrapp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.8 }}>
                        <img className={styles.advantagesBg} alt="advantages" src={bgAdvantagesWebp} />
                        <motion.div className={styles.advantagesMain} variants={advantagesAnim}>
                            <p className={styles.title}>Преимущества программ</p>
                            <p className={styles.desc}>Здесь изучают фундаментальную и прикладную химию, химические технологий, биотехнологии, микробиологию, математику, информатику, физику и даже искусство. </p>
                        </motion.div>
                        <motion.div className={styles.advantagesInfo} variants={advantagesAnim}>
                            <p className={styles.advantagesTitle}>Уникальность</p>
                            <p className={styles.advantagesDesc}>Уникальная программа по подготовке специалистов в области сложных систем химии и биологии (ближайший аналог - Harvard-MIT Program in Health Sciences and Technology)</p>
                        </motion.div>
                        <motion.div className={styles.advantagesInfo} variants={advantagesAnim}>
                            <p className={styles.advantagesTitle}>Стажировки</p>
                            <p className={styles.advantagesDesc}>Оплачиваемые стажировки 1-5 месяцев в университетах-партнерах по всему миру
                            </p>
                        </motion.div>
                        <motion.div className={styles.advantagesInfo} variants={advantagesAnim}>
                            <p className={styles.advantagesTitle}>Стажировки</p>
                            <p className={styles.advantagesDesc}>Оплачиваемые стажировки 1-5 месяцев в университетах-партнерах по всему миру
                            </p>
                        </motion.div>
                        <motion.div className={styles.advantagesInfo} variants={advantagesAnim}>
                            <p className={styles.advantagesTitle}>Стажировки</p>
                            <p className={styles.advantagesDesc}>Оплачиваемые стажировки 1-5 месяцев в университетах-партнерах по всему миру
                            </p>
                        </motion.div>
                        <motion.div className={styles.advantagesInfo} variants={advantagesAnim}>
                            <p className={styles.advantagesTitle}>Стажировки</p>
                            <p className={styles.advantagesDesc}>Оплачиваемые стажировки 1-5 месяцев в университетах-партнерах по всему миру
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <div className={styles.events}>
                <div className={styles.container}>
                    <div className={styles.eventsInner}>
                        <div className={styles.eventsLeft}>
                            <p className={styles.eventsTitle}>События недели</p>
                            <p className={styles.eventsDesc}>Наш факультет постоянно растёт и развивается. Мы создали раздел новостей, чтобы ты был в курсе всех событий</p>
                            <Button2 type={2} onClick={() => { window.location.href = "/news" }}>Посмотреть события</Button2>
                        </div>
                        <div className={styles.eventsRight}>
                            <img alt="bottle" src={bottle} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.partners}>
                <div className={styles.container}>
                    <div className={styles.partnersInner}>
                        <img className={styles.partnersImage1} alt="rosnano" src={partnersImage1} width={591} />
                        <div className={styles.partnersText}>
                            <p className={styles.partnersTitle}>Работай с нашими партнерам</p>
                            <p className={styles.partnersDesc}>В числе наших партнеров есть такие компании, как «Danone», ПАО «Газпром нефть», АО «Роснано», «Биокад», «Сибур Холдинг», «Эфко» и т. д.</p>
                        </div>
                        <img alt="efko" src={partnersImage2} className={styles.partnersImage2} />
                        <img alt="gazprom" src={partnersImage3} className={styles.partnersImage3} width={442} />
                    </div>
                </div>
            </div>

        </div >
    )
}