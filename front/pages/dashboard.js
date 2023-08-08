import Head from 'next/head'
import styles from '../styles/Dashboard.module.css'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import Router from "next/router"
import { Cookies } from "react-cookie"

let cookies = new Cookies();

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromCookies = cookies.get("token");

    setToken(tokenFromCookies);

    if(!tokenFromCookies)
      Router.push("/");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>FCFM</title>
        <meta name="description" content="Indicative manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Navigation />
      </main>
    </div>
  )
}
