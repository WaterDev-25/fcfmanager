import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cookies } from "react-cookie"
import Router from "next/router"

let cookies = new Cookies();

export default function Home() {
  const [indicative, setIndicative] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const handleIndicative = (e) => setIndicative(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/login", { indicative, password })
    .then((res) => {
      cookies.set("token", res.data.token, { maxAge: 60 * 60 * 24, sameSite: "lax" });

      Router.push("/dashboard");
    })
    .catch((err) => {
      if(err.response.data.error) {
        setError([err.response.data]);
      } else {
        setError(err.response.data);
      }
    })
  }

  useEffect(() => {
    if(cookies.get("token"))
      Router.push("/dashboard")
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>FCFM</title>
        <meta name="description" content="Indicative manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Sign in to FCFM</h1>
          <input type="text" placeholder="Indicative" value={indicative} onChange={handleIndicative} className={styles.inputfield} />
          <input type="password" placeholder="Password" value={password} onChange={handlePassword} className={styles.inputfield} />
          {error.length !== 0 && <div className={styles.error}>
            {error.map(err => (
              <p key={err}>{err.error}</p>
            ))}
          </div>}
          <input type="submit" value="Login" className={styles.submit} />
        </form>
      </main>
    </div>
  )
}
