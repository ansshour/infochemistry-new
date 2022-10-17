import styles from "./PersonalityCard.module.css"
import phoneI from "./res/phone.png"
import mailI from "./res/mail.png"
import resumeImg from "./res/resume.png"
import noavatar from "./res/noavatar.png"

type Props = {
    avatar: string;
    name: string;
    bio: string;
    resume: string;
    phone: string;
    email: string;
}

export const PersonalityCard: React.FC<Props> = ({ avatar, name, bio, resume, phone, email }) => {
    return (
        <div className={styles.container}>
            {avatar ? <img alt="avatar" src={avatar} className={styles.avatar} /> : <img alt="noavatar" src={noavatar} className={styles.avatar} />}
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.persInfo}>{bio}</p>
                {phone && <a className={styles.withIcon}>
                    <img alt="phone" src={phoneI} />
                    <p>{phone}</p>
                </a>}
                {email && <div className={styles.withIcon}>
                    <img alt="mail" src={mailI} />
                    <p>{email}</p>
                </div>}
                {resume && <a className={styles.withIcon} href={resume} target="_blank">
                    <img alt="phone" src={resumeImg} />
                    <p>Резюме</p>
                </a>}
            </div>
        </div>
    )
}