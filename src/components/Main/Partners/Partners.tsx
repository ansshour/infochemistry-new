import { useEffect, useState } from "react"
import $api from "../../../http"
import styles from "./Partners.module.css"

const PartnersData = [
    { image: "./images/partners/gazprom.png", name: "gazprom" },
    { image: "./images/partners/unilevel.png", name: "unilevel" },
    { image: "./images/partners/BAT.png", name: "BAT" },
    { image: "./images/partners/biccad.png", name: "biccad" },
    { image: "./images/partners/cola.png", name: "cola" },
    { image: "./images/partners/sibur.png", name: "sibur" },
]

export const Partners = () => {

    const [partners, setPartners] = useState([])

    const lang = localStorage.getItem("i18nextLng");

    const getPartners = async () => {
        try {
            const { data } = await $api.get("partners/")
            setPartners(data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getPartners()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.partners__container}>
                {/* {PartnersData.map(({ image, name }) => (
                    <img src={image} key={name} alt={name} />
                ))} */}
                {partners.map(({ logo, logo_eng, id }) => (
                    <img className={styles.image} src={lang === "ru" ? logo : logo_eng} key={id} alt={id} height={100} />
                ))}
            </div>
        </div >
    )
}