import styles from "../Modal/Modal.module.css"
import { GrClose } from "react-icons/gr";
import { useEffect } from "react";
type Props = {
    active: boolean;
    setActive: (arg: boolean) => void;
    children?: React.ReactNode;
    withCloseBtn?: boolean;
}


export const Modal = ({ active, setActive, children, withCloseBtn }: Props) => {


    useEffect(() => {
        active ? document.querySelector("body").style.overflowY = "hidden" : document.querySelector("body").style.overflowY = "auto"
    }, [active])

    return (
        <>
            <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`} onClick={() => setActive(false)}>
                <div className={active ? `${styles.content} ${styles.active}` : `${styles.content}`} onClick={e => e.stopPropagation()}>
                    {/* <div className={styles.close}><GrClose size={45} /></div> */}
                    <div className={styles.close} onClick={() => { setActive(false) }} style={!withCloseBtn ? { display: "none" } : {}}>
                        <div className={[styles.line, styles.first].join(" ")}></div>
                        <div className={[styles.line, styles.second].join(" ")}></div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}