import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.scss'
import { useTheme } from 'next-themes'

export default function Header () {

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
      <header className={styles.header}>
          <Image src={ src } alt="logo" width={82} height={19.5} 
          className={styles.logo}/>
          <h1>XR Inspiration Gallery</h1>
        <Link href="/about" className={styles.btn}><p>About</p></Link>
      </header>
    )
  }