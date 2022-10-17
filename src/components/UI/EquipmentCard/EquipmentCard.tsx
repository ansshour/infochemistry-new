import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button"
import { Button2 } from "../Button2/Button2";
import { Modal } from "../Modal/Modal";
import styles from "./EquipmentCard.module.css"

type Props = {
    image: string;
    title: string;
    description: string;
    fullDesc?: string;
    id: number;
}

export const EquipmentCard: React.FC<Props> = ({ image, title, description, fullDesc, id }) => {

    const { t } = useTranslation()

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={image} alt="equipment" />
                </div>
                <div className={styles.info}>
                    <div className={styles.top}>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.desc}>{description}</p>
                        <div className={styles.btn}>
                            <Link to={`/equipment/${id}`}><Button2 type={2}>{t("equipment.detail")}</Button2></Link>
                        </div>
                    </div>
                </div>
            </div >
            <Modal active={isModalOpen} setActive={setIsModalOpen} withCloseBtn={true}>
                <div className={styles.modal__container}>
                    <p className={styles.modal__title}>{title}</p>
                    <div className={styles.modalImageBlock}>
                        <img className={styles.modal__image} src={image} alt="equipment" width={415} />
                    </div>
                    <p className={styles.desc__name}>{t("equipment.description")}</p>
                    <div className={styles.descBlock}>
                        <p className={styles.modal__desc}>{fullDesc}</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}