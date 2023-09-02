import Head from 'next/head'
import styles from '../styles/Dashboard.module.css'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import Router from "next/router"
import { Cookies } from "react-cookie"
import axios from "axios"

let cookies = new Cookies();

export default function Home() {
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const tokenFromCookies = cookies.get("token");

    setToken(tokenFromCookies);

    if(!tokenFromCookies)
      Router.push("/");

    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenFromCookies}`;
    axios.get("/api/user/")
    .then((res) => {
      setUsers(res.data);
    });

    axios.get("/api/user/@me")
    .then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>FCFM</title>
        <meta name="description" content="Indicative manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Navigation user={user} />
          <h1 className={styles.title}>List of users</h1>
          {users.length !== 0 && <table className={styles.users}>
            {users.map((e, index) => (
              <tr key={index} className={e.ranks == 1 ? styles.user : styles.admin}>
                <th>{e.id}</th>
                <th>{e.indicative}</th>
                <th>{e.city}</th>
                <th>{e.address}</th>
                <th>{e.description}</th>
              </tr>
            ))}
          </table>}
      </main>
    </>
  )
}
