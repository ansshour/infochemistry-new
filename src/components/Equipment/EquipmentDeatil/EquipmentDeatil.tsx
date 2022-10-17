import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import $api from '../../../http';
import { Breadcrumbs } from '../../UI/Breadcrumbs/Breadcrumbs';
import { Button2 } from '../../UI/Button2/Button2';
import styles from './EquipmentDetail.module.css'

export const EquipmentDetail = () => {

    const { t } = useTranslation()

    const navigate = useNavigate()

    let { id } = useParams();

    const [equipment, setEquipment] = useState(null)

    const getEquipmentById = async () => {
        const { data } = await $api.get(`/equipment/${id}/`);
        console.log(data)
        setEquipment(data)
    }

    const info = [
        { name: t("equipment.breadcrumbs.main"), link: "/" },
        { name: t("equipment.breadcrumbs.researches"), link: "" },
        { name: t("equipment.breadcrumbs.equipment"), link: "/equipment" },
        { name: equipment?.name, link: `/equipment/${equipment?.id}` },
    ]


    useEffect(() => {
        getEquipmentById()
    }, [])

    return (
        <>
            <Breadcrumbs info={info} />
            <div className={styles.container}>
                <div className={styles.modal__container}>
                    <p className={styles.modal__title}>{equipment?.name}</p>
                    <div className={styles.wrapper}>
                        <div className={styles.modalImageBlock}>
                            <img className={styles.modal__image} src={equipment?.image} alt="equipment" width={415} />
                        </div>
                        <div>
                            <p className={styles.desc__name}>{t("equipment.description")}</p>
                            <div className={styles.descBlock}>
                                <p className={styles.modal__desc}>{equipment?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button2 type={2} onClick={() => navigate(-1)}>Вернуться</Button2>
                    </div>
                </div>
            </div>
        </>
    )
}