import client from '@/lib/contentful'
import styles from '../styles/Home.module.scss'
import Card from '../../components/Card'
import Darkmode from '../../components/Darkmode'
import Header from '../../components/Header'


export default function Home ({ frame }) {

  return (
  <div>
    <div className={styles.container}>
       <Header />
       <div className={styles.slides}>
        {frame.map(frame => (
        <Card key={frame.sys.id} frame={frame} />
         ))}
      </div>
    </div>
    <div className={styles.darkmode}>
    <Darkmode />
    </div>
 </div>
  )
}

// -

export async function getStaticProps() {

  const res = await client.getEntries({ content_type: 'frame' })

  return {
    props: {
      frame: res.items,
    },
    revalidate: 1,
  }
}