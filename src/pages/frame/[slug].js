import client from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
// import Loading from '../../../components/Loading'
import Link from 'next/link'
import Spline from '@splinetool/react-spline'
import Darkmode from '../../../components/Darkmode'
import styles from '../../styles/slug.module.scss'
// import React, { Suspense } from 'react'


const render0ptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]:( node ) => {
            if (node.data.target.sys.contentType.sys.id === "embedUrl") {
                // const Spline = React.lazy(() => import('@splinetool/react-spline'));
                return (
                    // <Suspense fallback={<div className={styles.loadingItem}>Loading</div>}>
                    <Spline 
                    scene={node.data.target.fields.url} 
                    className={styles.spline}/>
                    // </Suspense>
                )
            }
        }
    }
}

export default function Frame ({ frame }) {
    // if(!frame ) return <Loading />

const { title, date, description, created, links, body } = frame.fields

return (
    <div className={styles.container}>
          <div className={styles.detail}>
            <Link href="/"
            className={styles.home}>
              <div>
                Back to Home
                </div>
            </Link>
            <details>
                <summary>
                </summary>
                <p>{ date }</p>
                <h2>{ title }</h2>
                <p>{ description }</p>
                <div className={styles.creator}>
                    <p>Created by</p>
                    {/* { created && created.fields.name} */}
                </div>
                <div className={styles.links}>
                    <p>Visit via</p>
                </div>
            </details>
            <div className={styles.darkmode}>
            <Darkmode />
            </div>
        </div>
        <div className={styles.content}>
        {/* {documentToReactComponents(body, render0ptions )} */}
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