import React, {useState} from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile, firebaseDatabase } from "./utils/auth"
import { Link } from "gatsby"

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}
const Settings = () => <p>Settings</p>
const Quiz = ({userData}) => <p>{userData.options[0].answer}</p>


const Account = () => {
    const [userData, setUserData] = useState();

  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  const getData = async () => {
    const doc = await firebaseDatabase.doc(`${user.sub}`).get()
    return doc.exists? doc.data() : null; 
  }

    getData().then((value)=> {setUserData(value)})




  return (
    <>
      <nav>
        <Link to="/account/">Home</Link>{" "}
        <Link to="/account/settings/">Settings</Link>{" "}
        <Link to="/account/quiz/">Quiz</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Home path="/account/" user={user} />
        <Settings path="/account/settings" />
        <Quiz path="/account/quiz" userData={userData} />
      </Router>
    </>
  )
}

export default Account