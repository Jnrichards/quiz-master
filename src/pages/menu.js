import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { firebaseDatabase, isBrowser } from "../utils/auth"
import { Link } from "gatsby"

export default function Menu(props) {
  const [menuItems, setMenuItems] = useState([])
  const [quizAmount, setQuizAmount] = useState()

  const getMarker = async () => {
    if(isBrowser){

    const snapshot = await firebaseDatabase
      .doc(sessionStorage.getItem("userId"))
      .collection(`Questions`)
    snapshot.get().then(querySnapshot => {
      const tempDoc = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      if (menuItems.length === 0) {
        setMenuItems(tempDoc)
        setQuizAmount(menuItems.length)
      }
    })
  }}
  getMarker()
  console.log(menuItems)
  const deleteEntry = item => {
    console.log(item)
    if(isBrowser){
    firebaseDatabase
      .doc(sessionStorage.getItem("userId"))
      .collection(`Questions`)
      .doc(`${item}`)
      .delete()
      .then(() => setQuizAmount(quizAmount - 1))}
  }
  //   publishEntry
  const publishEntry = item => {
    if(isBrowser){
    firebaseDatabase
      .doc("public").collection("Questions").doc(`${item.id}`).set({publisedDetails: item, userId: `${sessionStorage.getItem("userId")}`})
  }}

  const editEntry = item => {
    sessionStorage.setItem("editDocId", `${item.id}`)
  }

  return (
    <div class="row">
      {menuItems.map(item => (
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{item.id}</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <Link to="/account/quiz/">
              <span
                onClick={() => props.callBackProps(item)}
                class="btn btn-primary mr-2"
              >
                Play
              </span>
              </Link>
              <button
                onClick={() => deleteEntry(item.id)}
                class="btn btn-primary mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => publishEntry(item)}
                class="btn btn-primary mr-2"
              >
                Publish
              </button>
              <Link to="/account/edit/">
              <button
                onClick={() => editEntry(item)}
                class="btn btn-primary mr-2"
              >
                Edit
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
