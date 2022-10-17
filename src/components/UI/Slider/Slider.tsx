import { useState } from "react";
import styles from "./Slider.module.css"


type Props = {
    data: {
        image: string;
        text: string[] | string;
        link: string;
        linkName: string;
    }[]
    type?: number;
}


type Data = {
    image: string;
    text: string[] | string;
    link: string;
    linkName: string;
}

export const Slider: React.FC<any> = ({ data, type }) => {

    const dangerTextEnter = (text: string) => {
        return { __html: text };
    }


    const [elementOffset, setElementOffset] = useState(0);
    let [activeElement, setActiveElement] = useState(0);


    const nextHandler = () => {
        if (elementOffset > -(data.length - 1) * 100) {
            setElementOffset(elementOffset - 100)
            setActiveElement(activeElement + 1)
        } else {
            setElementOffset(0)
            setActiveElement(0)
        }
    }

    const prevHundler = () => {
        if (elementOffset < 0) {
            setElementOffset(elementOffset + 100)
            setActiveElement(activeElement - 1)
        } else {
            setElementOffset(-(data.length - 1) * 100)
            setActiveElement(data.length - 1)
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.prev} onClick={prevHundler} style={data.length > 1 ? {} : { display: "none" }}></div>
            <div className={styles.slider}>
                <div className={styles.activeElement} style={{ transform: `translateX(${elementOffset}%)` }}>
                    {data.map((elem: any, i: number) => {
                        return (
                            <div className={styles.slide} key={i}>
                                <div className={styles.image} style={{ backgroundImage: `url(https://new.infochemistry.ru/${elem.image})` }}></div>
                                <div className={styles.text}>
                                    {
                                        type === 2 ? <p dangerouslySetInnerHTML={dangerTextEnter(elem.text)}></p> : elem.text.map((text: string) => <p key={text}>{text}</p>)
                                    }
                                    <a className={styles.link} href={elem.link} download>{elem.linkName}</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.next} onClick={nextHandler} style={data.length > 1 ? {} : { display: "none" }}></div>
            <div className={styles.points} style={data.length > 1 ? {} : { display: "none" }}>
                {data.map((elem: Data, id: number) => (
                    id === activeElement ? <div className={styles.point} style={{ backgroundColor: "black" }} key={id}></div> : <div className={styles.point} key={id}></div>
                ))}
            </div>
        </div >
    )
}