import React from 'react'
import { firebaseDatabase, isBrowser } from "../utils/auth"


export default function Score(props) {
    if(isBrowser){
    firebaseDatabase.doc(sessionStorage.getItem("userId"))
    .collection(`Scores`)
    .doc(props.title)
    .set({score: props.score})}

    return (
        <div>
            YOU GOT {props.score} {props.title}%
        </div>
    )
}
