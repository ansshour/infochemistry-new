import Select from "react-select"
import $api from "../../../http";
import { Button2 } from "../../UI/Button2/Button2";
import styles from "./RoboEquipment.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs"

type Props = {
    img: string;
    name: string;
    id: string;
    type: string;
    status: string;
    recordData: any;
}

export const RoboEquipment: React.FC<Props> = ({ recordData, img, name, status, id }) => {




    const [timeSlots, setTimeSlots] = useState([])
    const [activeData, setActiveData] = useState<any>()
    const [activeTime, setActiveTime] = useState<any>()
    const [timeFrom, setTimeFrom] = useState<any>()
    const [recordId, setRecordId] = useState()
    const [haveRecord, setHaveRecord] = useState(false)
    const [equipmentCanBeUsed, setEquipmentCanBeUsed] = useState(false)
    const [hasRecord, setHasRecord] = useState(false)




    useEffect(() => {
        try {
            if (recordData.length) setHasRecord(true)
        } catch (err) { }
    }, [recordData])

    const getCurrentRecord = () => {
        recordData?.forEach((item) => {
            if (item.equipment_id === id) {
                const date = item.time_from.slice(0, 10);
                const time_from_value = item.time_from.slice(11, 16)
                const time_to_value = item.time_to.slice(11, 16);
                setActiveData({ value: date, label: date })
                setActiveTime({ value: time_from_value, label: time_from_value })
                setTimeFrom({ value: time_to_value, label: time_to_value })
                setHaveRecord(true)
                setRecordId(item.id)
            }
        })
    }

    const getRecordId = async () => {
        const { data } = await $api.get("/robo/bookings/");
        data.forEach((item) => {
            if (item.equipment_id === id) {
                setRecordId(item.id)
            }
        })
    }

    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#D6D6D6",
                primary: "#D6D6D6",
                primary50: "#D6D6D6",
            }
        }
    }

    const getTimes = async () => {
        const { data } = await $api.get(`/robo/equipment/${id}/get_avalible_slots/`);
        setTimeSlots(data.days)
    }


    useEffect(() => {
        getTimes()
    }, [])

    const statusParse = {
        not_ready: "Не готов",
        ready: "Готов",
        in_use: "Используется",
    }

    const createRecordOptions = (activeTime) => {
        try {
            if (activeTime) {
                let time = Number(activeTime.value.split(":")[0]);
                const time1 = time += 1;
                const time2 = time += 1;
                const time3 = time += 1;
                const mbTs = []
                timeSlots.forEach(item => {
                    if (item.date_formatted === activeData.label) {
                        item.slots.forEach(({ time_to_formatted }) => {
                            if (time_to_formatted === `${time1 < 10 ? "0" + time1 : time1}:${activeTime.value.split(":")[1]}`) {
                                mbTs.push({ value: `${time1 < 10 ? "0" + time1 : time1}:${activeTime.value.split(":")[1]}`, label: `На 1 час, до ${time1}:${activeTime.value.split(":")[1]}` },)
                            }
                            if (time_to_formatted === `${time2 < 10 ? "0" + time2 : time2}:${activeTime.value.split(":")[1]}`) {
                                mbTs.push({ value: `${time2 < 10 ? "0" + time2 : time2}:${activeTime.value.split(":")[1]}`, label: `На 2 часа, до ${time2}:${activeTime.value.split(":")[1]}` })
                            }
                            if (time_to_formatted === `${time3 < 10 ? "0" + time3 : time3}:${activeTime.value.split(":")[1]}`) {
                                mbTs.push({ value: `${time3 < 10 ? "0" + time3 : time3}:${activeTime.value.split(":")[1]}`, label: `На 3 часа, до ${time3}:${activeTime.value.split(":")[1]}` })
                            }
                        })
                    }
                })
                return mbTs
            }
        } catch (err) { }
    }

    const sendRecord = async () => {
        try {
            const response = await $api.post("/robo/bookings/", {
                "equipment_id": id,
                "time_from": `${activeData.value}T${activeTime.value}:00`,
                "time_to": `${activeData.value}T${timeFrom.value}:00`
            })
            setHaveRecord(true)
            getRecordId()
            toast.success("Вы успешно записались! Дождитесь одобрения записи!")
            window.location.reload()

        } catch (err) {
            console.log(err)
            toast.error("Ошибка записи!")
        }
    }

    const deleteRecord = async () => {
        try {
            const response = await $api.delete(`/robo/bookings/${recordId}/`)
            window.location.reload()
        } catch (err) {

        }
    }

    useEffect(() => {
        try {
            createRecordOptions(activeTime)
        } catch (err) { }
        !haveRecord && setActiveTime([])

    }, [activeData])

    useEffect(() => {
        !haveRecord && setTimeFrom([])
    }, [activeTime])

    useEffect(() => {
        !haveRecord && getCurrentRecord()
    }, [recordData])

    useEffect(() => {
        if (!activeData || !activeTime || !timeFrom) {
            return;
        }
        setEquipmentCanBeUsed(hasRecord && (status === "ready" || status === "in_use") && dayjs(new Date()).isBetween(dayjs(`${activeData.value}, ${activeTime.value}`, 'YYYY-MM-DD, HH:mm'), dayjs(`${activeData.value}, ${timeFrom.value}`, 'YYYY-MM-DD, HH:mm')))
    }, [activeData, activeTime, timeFrom])

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                {img && <img src={img} alt="equipment" />}
            </div>
            <div className={styles.rightInfo}>
                <p className={styles.name}>{name}</p>
                <div className={styles.isActive}>
                    <p>Статус: {statusParse[status]}</p>
                </div>
                <p className={styles.desc}>Используется для создания модульной автоматизированной системы, способной к непрерывному выполнению широкого спектра автоматизируемых химических </p>
                <p className={styles.nearRecord}>Ближайшая свободная запись</p>
                <div className={styles.record}>
                    <Select
                        isDisabled={haveRecord}
                        options={timeSlots.map(({ date_formatted, date }) => ({ value: date, label: date_formatted }))}
                        classNamePrefix="custom-select"
                        placeholder="Дата"
                        className="react-select-container"
                        theme={theme => customTheme(theme)}
                        isMulti={false}
                        noOptionsMessage={({ inputValue }) => !inputValue ? "Список пуст..." : "Список пуст..."}
                        value={activeData}
                        onChange={item => setActiveData(item)}
                    />
                    <Select
                        isDisabled={haveRecord}
                        options={!haveRecord && (activeData) && timeSlots.filter(({ date_formatted }) => date_formatted === activeData.label)[0]["slots"].map(({ time_from_formatted }) => ({ value: time_from_formatted, label: time_from_formatted }))}
                        classNamePrefix="custom-select"
                        placeholder="Дата"
                        className="react-select-container"
                        theme={theme => customTheme(theme)}
                        isMulti={false}
                        noOptionsMessage={({ inputValue }) => !inputValue ? "Список пуст..." : "Список пуст..."}
                        value={activeTime}
                        onChange={item => setActiveTime(item)}
                    />
                    <Select
                        isDisabled={haveRecord}
                        options={createRecordOptions(activeTime)}
                        value={timeFrom}
                        onChange={item => setTimeFrom(item)}
                        classNamePrefix="custom-select"
                        placeholder="Дата"
                        className="react-select-container"
                        theme={theme => customTheme(theme)}
                        isMulti={false}
                        noOptionsMessage={({ inputValue }) => !inputValue ? "Список пуст..." : "Список пуст..."}
                    />
                </div>
                <div className={styles.buttons}>
                    {equipmentCanBeUsed ? <Button2 type={1} >Использовать</Button2> : (
                        haveRecord ? <Button2 type={1} onClick={deleteRecord}>Отменить</Button2> : <Button2 type={1} onClick={sendRecord}>Записаться</Button2>
                    )}
                </div>
            </div>
        </div>
    )
}