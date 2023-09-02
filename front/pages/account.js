import Head from 'next/head'
import styles from '../styles/Account.module.css'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import Router from "next/router"
import { Cookies } from "react-cookie"
import axios from "axios"

let cookies = new Cookies();

export default function Account() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [indicative, setIndicative] = useState();
  const [password, setPassword] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [ranks, setRanks] = useState();

  const handleIndicative = (e) => setIndicative(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePostalCode = (e) => setPostalCode(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleRanks = (e) => setRanks(e.target.value);

  useEffect(() => {
    const tokenFromCookies = cookies.get("token");

    setToken(tokenFromCookies);

    if(!tokenFromCookies)
      Router.push("/");

    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenFromCookies}`;
    axios.get("/api/user/@me")
    .then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let rank = ranks;
    if(ranks)
      rank = parseInt(ranks);

    await axios.patch("/api/user/@me", {
      indicative: indicative,
      password: password,
      city: city,
      postalCode: postalCode,
      address: address,
      description: description,
      ranks: rank
    })
    .then((res) => {
      console.log(res.data);
    })
  }

  return (
    <>
      <Head>
        <title>FCFM</title>
        <meta name="description" content="Indicative manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Navigation user={user} />
          <h1 className={styles.title}>Update informations</h1>
          <div className={styles.form_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              { user.ranks == 99 && <input className={styles.inputfield} type="text" placeholder="Indicative" value={indicative} onChange={handleIndicative} /> }
              <input className={styles.inputfield} type="password" placeholder="Password" value={password} onChange={handlePassword} />
              <input className={styles.inputfield} type="text" placeholder="City" value={city} onChange={handleCity} />
              <input className={styles.inputfield} type="text" placeholder="Postal code" value={postalCode} onChange={handlePostalCode}  />
              <input className={styles.inputfield} type="text" placeholder="Address" value={address} onChange={handleAddress} />
              <input className={styles.inputfield} type="text" placeholder="Description" value={description} onChange={handleDescription} />
              { user.ranks == 99 && <input className={styles.inputfield} type="text" placeholder="Ranks" value={ranks} onChange={handleRanks} /> }
              <input type="submit" value="Update" className={styles.submit} />
            </form>
          </div>
      </main>
    </>
  )
}
