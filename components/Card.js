import Link from 'next/link'
import Image from 'next/image'
import styles from '../components/Card.module.scss'

export default function Card({ frame }) {
    const { title, slug, date, thumbnail } = frame.fields
  
    return (
      <div className={styles.body}> 
            <Link href={'/frame/' + slug }
            className={styles.btn}
            >
          <Image 
            src={'https:' + thumbnail.fields.file.url}
            width={thumbnail.fields.file.details.image.width}
            height={thumbnail.fields.file.details.image.height}
            alt={ title }
            priority={false}
            className={styles.thumbnail}
          />
          <div className={styles.description}>
            <h2>{ title }</h2>
            <p> { date } </p>
          </div>
          </Link>
     </div>
    )
  }