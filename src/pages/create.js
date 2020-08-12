import React, { Component } from "react"
import { firebaseDatabase } from "../utils/auth"

export default class create extends Component {
  state = {
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    questions: [],
    question: "",
    answer: "",
    details: { details: [] },
    title: "",
    array: [],
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
    console.log(this.state.question)
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state.option1)
    console.log(this.state.answer, "s")
    this.state.array.push({
      options: [
        this.state.option1,
        this.state.option2,
        this.state.option3,
        this.state.option4,
      ],
    })
    this.state.questions.push(this.state.question)

    var detail = {
      title: this.state.title,
      questions: this.state.question,
      answers: [
        this.state.option1,
        this.state.option2,
        this.state.option3,
        this.state.option4,
      ],
      correctAnswer: this.state.answer,
    }

    this.state.details.details.push(detail)

    this.setState({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      question: "",
      answer: "",
    })
    console.log(this.state.details)

    if (this.state.details.details.length > 2) {
      firebaseDatabase
        .doc(sessionStorage.getItem("userId"))
        .collection(`Questions`)
        .doc(`${this.state.title}`)
        .set(this.state.details)
      this.setState({
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        questions: [],
        question: "",
        answer: "",
        details: { details: [] },
        title: "",
        array: [],
      })
    }
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <div class="form-row" >
          <div class="form-group col-md-6">
            <label for="inputTitle">Title</label>
            <input
              class="form-control"
              id="inputTitle"
              placeholder="Title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputQuestion">Question</label>
            <input
              class="form-control"
              id="inputQuestion"
              placeholder="Question"
              name="question"
              value={this.state.question}
              onChange={this.handleInputChange}
            />

          </div>
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
          <div class="form-group col-md-4">
            <label for="inputCorrectAnswer">Choose correct answer</label>
            <select
              class="form-control"
              id="inputCorrectAnswer"
              name="answer"
              onChange={this.handleInputChange}
              value={this.state.answer}
            >
              <option selected>Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    )
  }
}
