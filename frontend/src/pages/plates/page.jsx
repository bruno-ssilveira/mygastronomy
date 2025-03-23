import { useEffect, useState, useRef } from 'react'
import platesServices from '../../services/plates'
import Loading from '../loading/page'
import styles from './page.module.css'
import { LuArrowUpFromLine, LuShoppingCart } from "react-icons/lu"
import { useCartContext } from '../../contexts/useCartContext'

export default function Plates() {
    const { getAvailablePlates, platesList, platesLoading, refetchPlates } = platesServices()
    const [isVisible, setIsVisible] = useState(false)
    const [isEndPage, setIsEndPage] = useState(false)
    const platesContainerRef = useRef(null)
    const { addToCart } = useCartContext()

    // To a low scrollUp
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

    // Show the button Go To Top when scrolled at certain page height
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY + window.innerHeight
            const documentHeight = document.documentElement.scrollHeight - 100

            if(currentScrollPosition >= documentHeight){
                setIsVisible(true)
                setIsEndPage(true)
            } else if(window.scrollY > 200 && window.innerWidth >= 1020) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }

            if(currentScrollPosition < documentHeight) {
                setIsEndPage(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if(refetchPlates) {
            getAvailablePlates()
        }
    }, [refetchPlates])

    // Animation for card's plates appears when scrolling down the page
    useEffect(() => {
        if (!platesContainerRef.current || platesList.length === 0) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.4 }
        );
    
        const cards = platesContainerRef.current.querySelectorAll(`.${styles.cardsPlates}`);
        
        cards.forEach((card, index) => {
            observer.observe(card);
        });
    
        return () => observer.disconnect();
    }, [platesList]);

    const handleAddToCart = (itemToAdd) => {
        addToCart(itemToAdd)
    }

    if(platesLoading) {
        return ( <Loading /> )
    }

    return (
        <div className={styles.platesPage}>
            <h1> Our Plates</h1>

            <div className={styles.platesContainer} ref={platesContainerRef}>
                {platesList.map((plate) => (
                    <div key={plate._id} className={styles.cardsPlates}>
                        <div className={styles.plateContext}>
                            <img src={plate.imgUrl}/>
                            <div className={styles.plateDescription}>
                                <h2>{plate.name}</h2>
                                <p>{plate.description}</p>
                            </div>
                        </div>
                        <div className={styles.plateCart}>
                            <p className={styles.addCart} onClick={() => { handleAddToCart(plate) }}> Add <LuShoppingCart /> </p>
                            <h3>${plate.price}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <p
            onClick={scrollToTop}
            className={`${styles.goToTop} ${isEndPage ? styles.goToTopAdjusted : ''}`}
            style={{opacity: isVisible ? 1 : 0,
                transition: 'opacity .5s ease-in-out, visibility .5s ease-in-out',
            }}>
                Go to top <LuArrowUpFromLine />
            </p>
        </div>
    )
}