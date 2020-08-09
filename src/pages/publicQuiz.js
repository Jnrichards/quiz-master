import React, { useState } from "react"
import { firebaseDatabase } from "./utils/auth"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from "gatsby"

export default function PublicQuiz(props) {
  const [menuItems, setMenuItems] = useState([])

  const getMarker = async props => {
    const snapshot = await firebaseDatabase
      .doc("public")
      .collection(`Questions`)
    snapshot.get().then(querySnapshot => {
      const tempDoc = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      if (menuItems.length === 0) {
        setMenuItems(tempDoc)
      }
    })
  }
  getMarker()
  console.log(menuItems.details)

  const deleteEntry = item => {
    firebaseDatabase
      .doc(sessionStorage.getItem("userId"))
      .collection(`Questions`)
      .doc(`${item}`)
      .delete()
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
              {item.publisedDetails ? (
                <Link to="/account/quiz/">
                <button
                  onClick={() => props.callBackProps(item.publisedDetails)}
                  class="btn btn-primary"
                >
                  Play
                </button>
                </Link>
              ) : (
                <Link to="/account/quiz/">

                <button
                  onClick={() => props.callBackProps(item.details)}
                  class="btn btn-primary mr-2"
                >
                    Play
                </button>
                </Link>

              )}
              {item.userId === sessionStorage.getItem("userId") ? (
                <button
                  onClick={() => deleteEntry(item.id)}
                  class="btn btn-primary mr-2"
                >
                  Unpublish
                </button>
              ) : null}
              {/* <button
                //   onClick={() => publishEntry(item)}
                  class="btn btn-primary"
                >
                  Publish
                </button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
