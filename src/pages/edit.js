import React, { Component } from "react"
import { firebaseDatabase, isBrowser } from "../utils/auth"

export default class edit extends Component {
  state = {
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    question: "",
    correctAnswer: "",
    answers: [],
    doc: [],
    index: 0,
    title: "",
  }

  async componentDidMount() {
    const items = []

    const docId = sessionStorage.getItem("editDocId")
    if(isBrowser){

    firebaseDatabase
      .doc(sessionStorage.getItem("userId"))
      .collection(`Questions`)
      .doc(`${docId}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          items.push(doc.data().details)
        }

        console.log()
        this.setState({ doc: items })
      })}
  }

  chooseQuestion = event => {
    const chosenQuestion = this.state.doc[0][event.target.value]
    this.setState({
      option1: chosenQuestion.answers[0],
      option2: chosenQuestion.answers[1],
      option3: chosenQuestion.answers[2],
      option4: chosenQuestion.answers[3],
      question: chosenQuestion.questions,
      correctAnswer: chosenQuestion.correctAnswer,
      index: event.target.value,
      title: chosenQuestion.title,
    })
  }
  handleSubmit = event => {
    const docId = sessionStorage.getItem("editDocId")

    event.preventDefault()
    this.state.answers.push({
      options: [
        this.state.option1,
        this.state.option2,
        this.state.option3,
        this.state.option4,
      ],
    })

    const details = {
      answers: [
        this.state.option1,
        this.state.option2,
        this.state.option3,
        this.state.option4,
      ],
      correctAnswer: this.state.correctAnswer,
      questions: this.state.question,
      title: this.state.title,
    }
    const array = this.state.doc[0]

    array.splice(this.state.index, 1, details)

    console.log(array)
    if(isBrowser){
    firebaseDatabase.doc(sessionStorage.getItem("userId"))
    .collection(`Questions`).doc(`${docId}`).update({
        details: array

    })}
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div>
        <select onChange={this.chooseQuestion}>
          {this.state.doc[0]?.map((doc, index) => (
            <option value={`${index}`}>{doc.questions}</option>
          ))}
        </select>
        <form onSubmit={this.handleSubmit}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputAnswer1">Answer 1</label>
              <input
                class="form-control"
                id="inputAnswer1"
                placeholder="Answer 1"
                name="option1"
                value={this.state.option1}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputAnswer2">Answer 2</label>
              <input
                class="form-control"
                id="inputAnswer2"
                placeholder="Answer 2"
                type="text"
                name="option2"
                value={this.state.option2}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputAnswer3">Answer 3</label>
              <input
                class="form-control"
                id="inputAnswer3"
                placeholder="Answer 3"
                type="text"
                name="option3"
                value={this.state.option3}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputAnswer4">Answer 4</label>
              <input
                class="form-control"
                id="inputAnswer4"
                placeholder="Answer 4"
                type="text"
                name="option4"
                value={this.state.option4}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Edit Question
            </button>
          </div>
        </form>
      </div>
    )}
}
