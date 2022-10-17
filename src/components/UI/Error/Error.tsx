import styles from "./Error.module.css"
import { motion } from "framer-motion"

type Props = {
    text: string;
    onClick?: any;
}

export const Error: React.FC<Props> = ({ text, onClick }) => {
    return (
        <motion.div
            className={styles.error}
            initial={{
                opacity: 0.5,
                x: 1000,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                delay: 0.2,
            }}>
            <div className={styles.close} onClick={onClick}>
            </div>
            {text}
        </motion.div>
    )
}