import client from '@/lib/contentful'
import Head from 'next/head'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Link from 'next/link'
import Spline from '@splinetool/react-spline'
import Darkmode from '../../../components/Darkmode'
import styles from '../../styles/slug.module.scss'
import React, { Suspense } from 'react'
import Loading from '../../../components/Loading'


const render0ptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]:( node ) => {
            if (node.data.target.sys.contentType.sys.id === "embedUrl") {
                const Spline = React.lazy(() => import('@splinetool/react-spline'));
                return (
                    <Suspense 
                    fallback={<Loading />}>
                    <Spline 
                    scene={node.data.target.fields.url} 
                    className={styles.spline}/>
                    </Suspense>
                )
            }
        }
    }
}

export default function Frame ({ frame }) {
    if(!frame ) return <Loading />

const { slug, title, date, description, created, links, thumbnail, body } = frame.fields

return (
    <div className={styles.container}>
      <Head>
      <title>{ title } | Containeer </title>
				<link rel="canonical" href={`https://containeer.space/frame/${ slug }`} />
				<meta name="description" content={ description }></meta>
				<meta property="og:title" content={`${ title } | Containeer `} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://containeer.space/frame/${ slug }`} />
				<meta property="og:image" content={`https://images.ctfassets.net/${ thumbnail }`} />
				<meta property="og:site_name" content="Containeer" />
				<meta property="og:description" content={ description } />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:site" content="@Containeer_" />
      </Head>
          <div className={styles.detail}>
            <div className={'p-3 bg-white dark:bg-black'}>
            <Link href="/"
            className={styles.home}>
              <div>
                Back to Home
                </div>
            </Link>
            <details>
                <summary>
                </summary>
                <p className={styles.date}>{ date }</p>
                <h2>{ title }</h2>
                <p>{ description }</p>
                <div className={styles.creator}>
                    <p>Created by</p>
                    { created && created.fields.name}
                </div>
                <div className={styles.links}>
                    <p>Visit via</p>
                   - { documentToReactComponents(links) }
                </div>
                <div className={styles.darkmodeSP}>
                <Darkmode />
                </div>
            </details>
            <div className={styles.darkmode}>
            <Darkmode />
            </div>
            </div>
        </div>
        <div className={styles.content}>
        {documentToReactComponents(body, render0ptions )}
        </div>
    </div>
)
}

// -

export const getStaticPaths = async () => {
    const res = await client.getEntries({ 
      content_type: "frame" 
    })
  
    const paths = res.items.map(item => {
      return {
        params: { slug: item.fields.slug }
      }
    })
  
    return {
      paths,
      fallback: true
    }
  }

  export const getStaticProps = async ({ params }) => {
    
    const { items } = await client.getEntries({
      content_type: 'frame',
      'fields.slug': params.slug
    }) 
  
    if (!items.length) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: { frame: items[0] },
      revalidate: 1
    }
  }