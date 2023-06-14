import Card from "./Card"
import styles from "./CardSlider.module.scss"

export default function CardSlider ({ frame }) {

    return (
        // <div className={styles.slides}>
        <div>
           <Card key={frame.sys.id} frame={frame} 
           className={styles.slides}
           />
          </div>
            // </div>
      )

}