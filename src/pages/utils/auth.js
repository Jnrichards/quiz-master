import auth0 from "auth0-js"
import { navigate } from "gatsby"
import * as firebase from "firebase"

const isBrowser = typeof window !== "undefined"

firebase.initializeApp({
  apiKey: "AIzaSyCnKC0wF9ThsfZKJITVvm-rYq0AwBr2m5w",
  authDomain: "quiz-master-3fc0a.firebaseapp.com",
  databaseURL: "https://quiz-master-3fc0a.firebaseio.com",
  projectId: "quiz-master-3fc0a",
  storageBucket: "quiz-master-3fc0a.appspot.com",
  messagingSenderId: "829516799201",
  appId: "1:829516799201:web:0a62a1270d65a7ec0c6ba0",
  measurementId: "G-VZWXNQTP9P",
})
const db = firebase.firestore()

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/account")
    cb()
  }
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  auth.checkSession({}, setSession(callback))
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  const userData = {
    userName: user.name,
    email: user.email,
    nickname: user.name,
    options: [
      { questions: ["test1", "test2", "test3", "test4"], answer: "test2" },
      { questions: ["test5", "test6", "test7", "test8"], answer: "test8" },
    ],
  }
  db.collection("users")
    .doc(`${user.sub}`)
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        db.collection("users").doc(`${user.sub}`).set(userData)
      }
    })

  return user
}

export const firebaseDatabase = db.collection('users')


export const logout = () => {
  localStorage.setItem("isLoggedIn", false)
  auth.logout()
}
