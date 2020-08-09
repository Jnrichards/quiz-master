import React, { useState } from "react"
import Score from "./score"

export default function Quiz({ userData }) {
  const [begin, setBegin] = useState(0)
  const [score, setScore] = useState(0)
  const details = userData?.details[begin]
  const [title, setTitle] = useState(null)
  if(details && title === null){
    setTitle(details.title)
  }

  const chosen = answer => {
    if (answer === details.correctAnswer) {
        setScore(score + 1)
        console.log("yo")
    }
    setTimeout(function () {
      setBegin(begin + 1)
    }, 2000)
  }
    if (begin === 3){return(<Score score={score} title={title}></Score>)}
  
  else if (details === undefined){return(<p>loading</p>)}
  else{
  return (
    <section style={{backgroundColor: "black", display: "flex", flexFlow: "column"}}>
      <p style={{textAlign: "center", color: "wheat", fontWeight: 800, fontSize: "xx-large"}}>{details.questions}</p>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            height: "40vh",
            width: "80vh",
            backgroundColor: "purple",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            textAlignLast: "center",
            fontWeight: "bold",
            fontSize: "xxx-large"
          }}
          onClick={() => chosen("1")}
        >
          {details.answers[0]}
        </div>
        <div
          style={{
            display: "flex",
            height: "40vh",
            width: "80vh",
            backgroundColor: "blue",
            cursor: "pointer",
            marginLeft: "10px",
            alignItems: "center",
            justifyContent: "center",
            textAlignLast: "center",
            fontWeight: "bold",
            fontSize: "xxx-large"
          }}
          onClick={() => chosen("2")}
        >
          {details.answers[1]}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            height: "40vh",
            width: "80vh",
            backgroundColor: "green",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            textAlignLast: "center",
            fontWeight: "bold",
            fontSize: "xxx-large"
          }}
          onClick={() => chosen("3")}
        >
          {details.answers[2]}
        </div>
         <div
          style={{
            display: "flex",
            height: "40vh",
            width: "80vh",
            backgroundColor: "yellow",
            cursor: "pointer",
            marginLeft: "10px",
            marginBottom: "72px",
            alignItems: "center",
            justifyContent: "center",
            textAlignLast: "center",
            fontWeight: "bold",
            fontSize: "xxx-large"

          }}
          onClick={() => chosen("4")}
        >
          {details.answers[3]}
        </div>
        </div>
      </div>
      {/* <button onClick={reset}>Reset</button> */}
    </section>
  )}
}
