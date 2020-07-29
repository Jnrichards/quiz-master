import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "./utils/auth"
import { Link } from "gatsby"

const Home = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}
const Settings = () => <p>Settings</p>
const Quiz = () => <p>Quiz</p>

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

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
        <Quiz path="/account/quiz" />
      </Router>
    </>
  )
}

export default Account