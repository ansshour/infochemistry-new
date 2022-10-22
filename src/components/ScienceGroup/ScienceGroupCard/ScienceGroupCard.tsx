import styles from "./ScienceGroupCard.module.css";


export const ScienceGroupCard: React.FC<any> = ({ items }) => {
    return (
        <div className={styles.container}>
            <p className={styles.name}></p>
            <div className={styles.top}>
                <div className={styles.left}>
                    <p className={styles.directionsTitle}>Направления</p>
                    <ul className={styles.groupPrograms}>
                        {items?.projects?.map(({ name }) => <li>{name}</li>)}
                    </ul>
                </div>
                <div className={styles.right}>
                    <p className={styles.mainPersonTitle}>Ответственный за научную группу</p>
                    <div className={styles.person}>
                        <img alt="avatar" src={items.leader.avatar} width={40} className={styles.avatar} />
                        <div className={styles.personInfo}>
                            <p className={styles.nameLeader}>{`${items.leader.last_name} ${items.leader.first_name} ${items.leader.middle_name}`}</p>
                            <p className={styles.phone}>{items.leader.phone}</p>
                            <p className={styles.email}>{items.leader.contact_email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={styles.directionsTitleBottom}>Направления работ</p>
                <ul className={styles.bottomList}>
                    {items.projects.map(({ name, description }) => (
                        <li className={styles.bottomListItem}>
                            <p className={styles.projectsTitle}>{name}</p>
                            <p className={styles.projectsDesc}>{description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}