import styles from "./ScienceGroupTable.module.css"

type Area = {
    title: string;
    desc: string;
    id: number;
}

type Props = {
    groupName: string;
    photo: string;
    name: string;
    email: string;
    tasks: string[];
    area: Area[];
    icon: string;
    id: number;
}

const classnames = [styles.first, styles.second, styles.third, styles.fourth]

export const ScienceGroupTable: React.FC<Props> = ({ groupName, photo, name, email, tasks, area, icon }) => {


    return (
        <div className={styles.container}
            style={area.length === 3 ? {
                gridTemplateAreas: ` "main first second" "main third third" `
            } : {}}>
            <div className={styles.main}>
                <img className={styles.icon} src={icon} />
                <p className={styles.groupName}>{groupName}</p>
                <div className={styles.representative}>
                    <div className={styles.image} style={{ backgroundImage: `url(${photo})` }}></div>
                    <div className={styles.info}>
                        <p className={styles.name}>{name}</p>
                        <div className={styles.email} style={!email ? { display: "none" } : {}}>
                            <img alt="email icon" src="./images/scienceGroup/email.svg" />
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <ul className={styles.tasksList}>
                    {tasks.map(({ name, id }: any) => <li key={`${name} ${id}`}>{name}</li>)}
                </ul>
            </div>
            {area.map(({ title, desc, id }: Area, i: number) => {
                return (
                    <div className={[styles.area, classnames[i]].join(" ")} key={`${title} ${desc}`}>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.desc}>{desc}</p>
                    </div>
                )
            })}
        </div>
    )
}