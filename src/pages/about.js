import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/about.module.scss'
import Darkmode from '../../components/Darkmode'
import { useTheme } from 'next-themes'
import Spline from '@splinetool/react-spline'


export default function About () {

  const { resolvedTheme } = useTheme()
  let src

  switch (resolvedTheme) {
      case 'light':
        src = '/logoLightmode.png'
        break
      case 'dark':
        src = '/logoDarkmode.png'
        break
        default: 
          src = '/logoDarkmode.png'
        break
  }

  return (
  <div>
    <div className={styles.container}>
      <div className={styles.header}>
      <Image src={ src } alt="logo" width={82} height={19.5} 
      className={styles.logo}/>
      <h2>XR Inspiration Gallery</h2>
      <Link href="/"
      className={styles.home}
      >
         <p> Back to Home </p>
      </Link>
      </div>
      <div className={styles.description}>
        <p>
        Containeer is a inspiration gallery that 
        showcase interactive designs utilizing XR 
        (Augmented reality, Virtual Reality, Mixed Reality, 
        and more interactive contents) of the world.<br/>
        You can discover the best of design to spark creative idea.<br/>
        <br/>
        Established in 2023, by Johnny Soga
        </p>
      </div>
      <div className={styles.content}>
        <Spline scene="https://prod.spline.design/oLJigZ7HfDvWAt1k/scene.splinecode"/>
      </div>
    </div>
    <div className={styles.darkmode}>
    <Darkmode />
    </div>
 </div>
  )
}
