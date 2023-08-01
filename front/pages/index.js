import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FCFM</title>
        <meta name="description" content="Indicative manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form className={styles.form} action="/" method="post">
          <h1>Sign in to FCFM</h1>
          <input type="text" placeholder="Indicative" className={styles.inputfield} />
          <input type="password" placeholder="Password" className={styles.inputfield} />
          <input type="submit" text="Submit" className={styles.submit} />
        </form>
      </main>
    </div>
  )
}
