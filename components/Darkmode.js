import { useTheme } from 'next-themes'
import { useState,useEffect } from 'react'
import styles from './Darkmode.module.scss'

export default function Darkmode () {

    const [ mounted, setMounted ] = useState(false);
    const { setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if (!mounted) {
        return null;
    }

    return (
        <div className={styles.container}>
         <button onClick={() => setTheme("dark")}><p className={styles.dark}>Dark</p></button> /
        <button onClick={() => setTheme("light")}><p className={styles.light}>Light</p></button>  
      </div>
    )
}