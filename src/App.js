import React, { Component } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import img from './images/cart.png'
import Courses from './components/Courses'
import Cart from './components/Cart'
import { FormControl, Form, Badge, Modal } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);

    //state contains a key which is passed to courses to determine the buttons to display 
    this.state = {
      clickedCart: false,
      key: "",
      criteria: "course",
      selected: new Array(),
      info: [],
      show: false
    }

    this.addCourse.bind(this);
  }

  
  handleSelect(selectedTab) {

    this.setState({ key: selectedTab });
  }

  addCourse(newCourse) {

    //checks if we have not selected this course already
    if (!this.state.selected.includes(newCourse) && this.state.selected.length < 7) {

      //creates a copy of selected's contents 
      var newList = Object.assign([], this.state.selected);
      newList.push(newCourse);
      var newInfoState = this.fetchData(newList);
      this.setState({ selected: newList, info: newInfoState });
      return true;
    } else {
      return false;
    }
  }

  removeCourse(newCourse) {
    console.log(newCourse)

    //checks if the list has the item first 
    if (this.state.selected.includes(newCourse)) {

      //assigns a copy and removes the value
      var newList = [];
      for (var i = 0; i < this.state.selected.length; i++) {
        if (this.state.selected[i] === newCourse) {
          continue;
        } else {
          newList.push(this.state.selected[i])
        }
      }

      var newInfoState = this.fetchData(newList);
      this.setState({ selected: newList, info: newInfoState });
      //console.log("is this before the []")
    }
  }

  fetchData(toChange) {
    var cred = 0;
    var newInfoState = [];
    for (var i = 0; i < toChange.length; i++) {
      //call another function to make sure items are saved due to async
      var newCourse = [];
      var course = toChange[i];
      var num = toChange[i].substring(toChange[i].length - 3);
      cred = this.fetchIter(newInfoState, newCourse, course, num, cred);
    }

    //set state
    return newInfoState;
  }

  fetchIter(newInfoState, newCourse, key, link, creds) {
    fetch('https://api.pennlabs.org/registrar/search?q=cis-' + link)
      .then(response => response.json())
      .then(data => {
        //extract open status, max enrollment, credits, etc 
        var relevantInfo = data["courses"][0];
        if (relevantInfo === undefined) {
          newCourse.push("-");
          newCourse.push("-");
          newCourse.push("-");
          newCourse.push("-");
          newInfoState.push(newCourse);

        } else {
          newCourse.push(key);
          newCourse.push(relevantInfo["course_status_normalized"] === "Open" ? "Y" : "N");
          newCourse.push(relevantInfo["max_enrollment"]);
          newCourse.push(relevantInfo["maximum_credit"]);
          creds += parseInt(relevantInfo["maximum_credit"]);
          newInfoState.push(newCourse);
          return creds;
        }

      });
  }

  toggle() {
    this.setState({show:true, clickedCart: false});
  }

  handleClose() {
    this.setState({show: false, clickedCart: true});
  }

  render() {
    return (
      <div className="appbody">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
        />

        {this.state.clickedCart ?
          <Button variant="primary"
            className="cartButton"
            onClick={() => {
              this.setState({ clickedCart: !this.state.clickedCart })
              this.handleSelect("")
            }}>

            Close Cart <Badge variant="light">{this.state.selected.length}</Badge>
          </Button> :
          <Button variant="outline-primary"
            className="cartButton"
            onClick={() => this.setState({ clickedCart: !this.state.clickedCart })}>
            Cart <Badge variant="light">{this.state.selected.length}</Badge></Button>}

        <div style={{
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 calc(1rem + 10%)',
          zIndex: '-1'
        }}>


          <img src={img} className="logo" alt=""/>


          <div >
            {this.state.clickedCart ?
              <Cart className="cart"
                toggle={() => {this.toggle()}}
                items={this.state.selected}
                fetched={this.state.info}
                remove={this.removeCourse.bind(this)} /> :
              <div>
                <div className="checkBoxes">
                  <div className="header"> Search By:  </div>

                  <Form.Check
                    defaultChecked
                    type="radio"
                    inline
                    label="Course"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onClick={() => this.setState({ criteria: "course" })}
                  />
                  <Form.Check
                    type="radio"
                    inline
                    label="Prereqs"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onClick={() => this.setState({ criteria: "prereqs" })}
                  />
                  <Form.Check
                    type="radio"
                    inline
                    label="Title"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onClick={() => this.setState({ criteria: "title" })}
                  />
                </div>
                <Form className="textEntry">
                  <Form.Control
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      boxShadow: `0px 2px 10px 3px #f2f2f2`
                    }}
                    size="lg"
                    placeholder="Search for a Course"
                    onChange={(value) => { this.handleSelect(value.target.value) }}
                  />
                </Form>
                <Courses
                  filter={this.state.criteria}
                  group={this.state.key}
                  add={this.addCourse.bind(this)}
                  selected={this.state.selected}
                />
              </div>

            }
          </div>
        </div>

        <Modal
              style={{ textAlign: "center" }}
              show={this.state.show}
              onHide={() => this.handleClose()}
              centered>
              <Modal.Header closeButton>
                <Modal.Title>  Course Removed </Modal.Title>
              </Modal.Header>
              <Modal.Body></Modal.Body>
            </Modal>

      </div>
    );
  }
}

export default App
