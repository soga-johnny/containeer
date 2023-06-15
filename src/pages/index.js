import client from '@/lib/contentful'
import styles from '../styles/Home.module.scss'
import Card from '../../components/Card'
import Darkmode from '../../components/Darkmode'
import Header from '../../components/Header'
import Head from 'next/head'


export default function Home ({ frame }) {

  return (
  <div>
    <Head>
    <title>Containeer </title>
    <link rel="canonical" href={`https://containeer.space`} />
    <meta name="description" content="Containeer is a inspiration gallery  utilizing XR.
      We showcase Augmented reality, Virtual Reality, Mixed Reality, 
      and more interactive designs in the world." />
    <meta property="og:site_name" content="Containeer " />
    <meta property="og:title" content="Containeer "/>
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://containeer.space"/>
    <meta property="og:image" content="https://containeer.space/ogp.jpg" />
    <meta name="twitter:card" content="summary"/>
        <meta property="twitter:site" content="@Containeer_" />
    </Head>

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