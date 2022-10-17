import styles from "./Loader.module.css"

export const Loader = () => {
    return (
        <div>
            <div className={styles.blur}>

            </div>
            <div className={styles.loader}>
                <div className={styles.loaderInner}>
                    <div className={styles.preloader}>
                        <div className={styles.preloader__row}>
                            <div className={styles.preloader__item}></div>
                            <div className={styles.preloader__item}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}