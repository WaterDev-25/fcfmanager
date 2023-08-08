import styles from '../styles/Navigation.module.css'
import { Cookies } from "react-cookie"
import Link from "next/link"

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
    faBars
} from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();

export default function Navigation() {
    const handleResponsive = () => {
        var x = document.getElementById(styles.nav);

        if (x.className === styles.nav) {
            x.className += ` ${styles.responsive}`;
        } else {
            x.className = styles.nav;
        }
    }

    const handleLogout = async () => {
        if(cookies.get("token"))
            cookies.remove("token");
    }

    return (
        <>
            <div className={styles.nav} id={styles.nav}>
                <Link href="#" className={styles.active}>Home</Link>
                <Link href="#">Account</Link>
                <Link href="#">Admin</Link>
                <Link href="/" onClick={handleLogout}>Logout</Link>
                <Link href="javascript:void(0);" className={styles.icon} onClick={handleResponsive}>
                    <FontAwesomeIcon
                        icon={faBars}
                    />
                </Link>
            </div>
        </>
    )
}