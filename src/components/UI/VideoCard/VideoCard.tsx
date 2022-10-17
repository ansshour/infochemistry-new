import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css"

type Props = {
    image: string;
    name: string;
    authorName: string;
    date: string;
    id?: number;
}

export const VideoCard: React.FC<Props> = ({ image, name, authorName, date, id }) => {

    const toTimeAgoFormat = (date: string) => {
        let difference = 0;
        const currentDate = new Date().toLocaleDateString().split(".");
        const dateArr = date.split(".");
        currentDate.forEach((elem: string, i) => {
            if (i === 0) {
                difference += Number(elem) - Number(dateArr[i])
            } else if (i === 1) {
                difference += (Number(elem) - Number(dateArr[i])) * 30
            } else {
                difference += (Number(elem) - Number(dateArr[i])) * 30 * 12;
            }
        })
        if (difference < 7) {
            if (difference === 0) {
                return `Сегодня`
            }
            if (difference === 1) {
                return `${difference} день назад`
            }
            if (difference < 5) {
                return `${difference} дня назад`
            }
            if (difference < 7) {
                return `${difference} дней назад`
            }
        }
        if (difference < 30) {
            let count = Math.floor(difference / 7);
            if (count === 1) {
                return `${count} неделю назад`
            }
            if (count < 5) {
                return `${count} недели назад`
            }
            if (count < 12) {
                return `${count} недель назад`
            }

        }
        if (difference < 30 * 12) {
            let count = Math.floor(difference / 30);
            if (count === 1) {
                return `${count} месяц назад`
            }
            if (count < 5) {
                return `${count} месяца назад`
            }
            if (count < 12) {
                return `${count} месяцев назад`
            }

        }
        if (difference > 30 * 12) {
            let count = Math.floor(difference / (30 * 12));
            if (count === 1) {
                return `${count} год назад`
            }
            if (count < 5) {
                return `${count} года назад`
            }
            if (count < 20) {
                return `${count} лет назад`
            }
            if (count > 19) {
                return `Очень давно`
            }
        }
    }

    return (
        <div className={styles.container}>
            <Link to={`/video_lectures/${id}`}>
                <div className={styles.video} style={{ backgroundImage: `url(${image})` }}>
                </div>
            </Link>
            <Link to={`/video_lectures/${id}`}> <p className={styles.name}>{name}</p></Link>
            <div className={styles.info}>
                <p className={styles.authorName}>{authorName}</p>
                <p className={styles.date}>{toTimeAgoFormat(date)}</p>
            </div>
        </div>
    )
}