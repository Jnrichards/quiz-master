import React, { useState, useCallback } from "react"
import { Router } from "@reach/router"
import {
  login,
  logout,
  isAuthenticated,
  getProfile,
  firebaseDatabase,
  isBrowser
} from "../utils/auth"
import { Link } from "gatsby"
import Quiz from "./quiz"
import Create from "./create"
import Menu from "./menu"
import PublicQuiz from "./publicQuiz"
import Edit from "./edit"

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

const Settings = () => (
  <p>
    <button>t</button>
  </p>
)
// const Quiz = ({userData}) => <p>{userData.options[0].answer}</p>

const Account = () => {
  const [questions, setQuestions] = useState()

  const callBackProps = useCallback(props => setQuestions(props))
  const [userData, setUserData] = useState()

  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()
  const getData = async () => {
    if(isBrowser){
    const doc = await firebaseDatabase.doc(`${user.sub}`).get()
    return doc.exists ? doc.data() : null
    } 
  }

  getData().then(value => {
    value = !userData ? setUserData(value) : null
  })
  console.log(sessionStorage.getItem("isLoggedIn"))

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          QUIZ MASTER
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link className="nav-item nav-link" to="/account/">
              Home
            </Link>{" "}
            <Link className="nav-item nav-link" to="/account/public/">
              Public
            </Link>{" "}
            <Link className="nav-item nav-link" to="/account/menu/">
              Menu
            </Link>{" "}
            <Link className="nav-item nav-link" to="/account/create/">
              Create
            </Link>{" "}
            <a
            className="nav-item nav-link"
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a> 
          </div>
        </div>
      </nav>
      <main style={{minHeight: "85vh"}}>
      <Router>
        <Home path="/account/" user={user} />
        <Settings path="/account/settings" />
        <Quiz path="/account/quiz" userData={questions} />
        <Create path="/account/create" />
        <Menu path="/account/menu" callBackProps={callBackProps} />
        <PublicQuiz path="/account/public" callBackProps={callBackProps} />
        <Edit path="/account/edit/"/>
      </Router>
      </main>
      <footer class="footer py-3">
        <div class="container">
          <span class="text-muted">&copy; Joel Richards 2020</span>
        </div>
      </footer>
    </div>
  )
}

export default Account
