import styles from "./Robo.module.css"
import back from "./res/back.svg";
import equipment1 from "./res/equipment1.svg"
import { RoboEquipment } from "./RoboEquipment/RoboEquipment";
import { useEffect, useState, useReducer } from "react"
import $api from "../../http";
import { useNavigate } from "react-router-dom";

export const Robo = () => {

    const lang = localStorage.getItem("i18nextLng");

    const [equipments, setEquipments] = useState([])
    const [activeRecord, setActiveRecord] = useState<any>()


    const navigate = useNavigate()


    const getEquipment = async () => {
        try {
            const { data } = await $api.get("/robo/equipment/");
            setEquipments(data)
        } catch (err) {

        }
    }

    const getRecordInfo = async () => {
        try {
            const { data } = await $api("/robo/bookings/");
            setActiveRecord(data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getEquipment()
        getRecordInfo()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <img alt="back" src={back} onClick={() => { navigate(-1) }} />
                <p>INFOCHEM ROBO</p>
            </div>
            <p className={styles.description}>В этом разделе вы можете записаться на работу с обоорудованием НОЦ Инфохимии</p>
            <div className={styles.record}>
                {equipments.map(({ image, name, name_eng, equipment_id, type, status }) => <RoboEquipment recordData={activeRecord} key={equipment_id} img={image} name={lang === "ru" ? name : name_eng} id={equipment_id} type={type} status={status} />)}
            </div>
        </div>
    )
}