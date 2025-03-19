import { useEffect, useState } from 'react'
import platesServices from '../../services/plates'
import Loading from '../loading/page'
import styles from './page.module.css'
import { LuArrowUpFromLine } from "react-icons/lu"

export default function Plates() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices()
    const [isVisible, setIsVisible] = useState(false)

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / 30
        const scrollAnimation = () => {
            if(window.scrollY !== 0) {
                window.scrollBy(0, scrollStep)
                requestAnimationFrame(scrollAnimation)
            }
        }
        requestAnimationFrame(scrollAnimation)
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY + window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - 100

            if(currentScrollPosition >= documentHeight){
                setIsVisible(true)
            } else if(window.scrollY > 200 && window.innerWidth >= 1020) {
                console.log('entrou')
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /*useEffect(() => {
        const scrollEnd = () => {
            setScrollPosition(window.scrollY + window.innerHeight)
        }

        window.addEventListener('scroll', scrollEnd)
        return () => window.removeEventListener('scroll', scrollEnd)
    }, [])*/

    useEffect(() => {
        if(refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates])

    if(platesLoading) {
        return ( <Loading /> )
    }

    return (
        <div className={styles.platesPage}>
            <h1> Our Plates</h1>

            <div className={styles.platesContainer}>
                {platesList.map((plate) => (
                    <div key={plate._id} className={styles.cardsPlates}>
                        <img src={plate.imgUrl}/>
                        <div className={styles.plateDescription}>
                            <h2>{plate.name}</h2>
                            <p>{plate.description}</p>
                        </div>
                        <h3>${plate.price}</h3>
                    </div>
                ))}
            </div>

            <p onClick={scrollToTop} className={styles.goToTop} style={{opacity: isVisible ? 1 : 0, transition: 'opacity .5s ease-in-out, visibility .5s ease-in-out'}}> Go to top <LuArrowUpFromLine /> </p>
        </div>
    )
}