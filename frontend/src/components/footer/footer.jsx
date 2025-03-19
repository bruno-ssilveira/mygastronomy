import styles from './footer.module.css'
import { Link } from 'react-router-dom'
import { LuMousePointerClick } from "react-icons/lu"

export default function Footer() {
	return (
		<footer className={styles.footerContainer}>
			<div className={styles.creator}>
				<img src="/imgs/logo.png" alt="" />
				<p>Developed by</p>
				<a href='https://www.linkedin.com/in/bruno-santos-silveira/' target='_blank'> Bruno S. Silveira <LuMousePointerClick /> </a>
			</div>
		</footer>
	)
}