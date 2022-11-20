import styles from '../styles/MapBox.module.css'

export const Graph = (props: { prefecture: string; x: number; y: number }) => {
    const { prefecture, x, y } = props

    return (
        <div className={styles.tooltip} style={{ left: x, top: y }}>
            {prefecture}
        </div>
    )
}
