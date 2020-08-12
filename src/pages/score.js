import React from 'react'
import { firebaseDatabase } from "../utils/auth"


export default function Score(props) {

    firebaseDatabase
    .doc(sessionStorage.getItem("userId"))
    .collection(`Scores`)
    .doc(props.title)
    .set({score: props.score})

    return (
        <div>
            YOU GOT {props.score} {props.title}%
        </div>
    )
}
