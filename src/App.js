import React, { Component } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import img from './images/cart.png'
import Nav from './components/Nav'
import Courses from './components/Courses'
import Cart from './components/Cart'
import { Tabs, Tab, FormControl, Form, Badge } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);

    //state contains a key which is passed to courses to determine the buttons to display 
    this.state = {
      clickedCart: false,
      key: "",
      criteria: "course",
      selected: new Array(),
      info: []
    }

    this.addCourse.bind(this);
  }

  handleSelect(selectedTab) {

    this.setState({ key: selectedTab });
  }

  addCourse(newCourse) {

    //TO DO: MAKE AN ALERT WHEN THERES ALREADY 7 COURSES 
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
    
    //checks if the list has the item first 
    if (this.state.selected.includes(newCourse)) {

      //assigns a copy and removes the value
      var newList = [];
      for(var i = 0; i < this.state.selected.length; i++) {
        if(this.state.selected[i] === newCourse) {
          continue; 
        } else {
          newList.push(this.state.selected[i])
        }
      }
      var newInfoState = this.fetchData(newList);
      this.setState({ selected: newList, info: newInfoState});
    }
  }

  fetchData(toChange) {
    var newInfoState = [];
    for (var i = 0; i < toChange.length; i++) {
      //call another function to make sure items are saved due to async
      var newCourse = {};
      var course = toChange[i];
      var num = toChange[i].substring(toChange[i].length - 3);
      this.fetchIter(newInfoState, newCourse, course, num);
    }

    //set state
    return newInfoState;
    
    

  }

  fetchIter(newInfoState, newCourse, key, link) {
    fetch('https://api.pennlabs.org/registrar/search?q=cis-' + link)
    .then(response => response.json())
    .then(data => {
      //extract open status, max enrollment, credits, etc 
      var relevantInfo = data["courses"][0];
      if (relevantInfo === undefined) {
        newCourse["open"] = "-";
        newCourse["size"] = "-";
        newCourse["cu"] = "-";
        newCourse["key"] = key;
        newInfoState.push(newCourse);

      } else {
        newCourse["key"] = key;
        newCourse["open"] = relevantInfo["course_status_normalized"] === "Open" ? "Y" : "N";
        newCourse["size"] = relevantInfo["max_enrollment"];
        newCourse["cu"] = relevantInfo["maximum_credit"];
        newInfoState.push(newCourse);
      }

    });
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
            onClick={() => this.setState({ clickedCart: !this.state.clickedCart })}>

            Cart <Badge variant="light">{this.state.selected.length}</Badge>
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


          <img src={img} className="logo" />


          <div >
            {this.state.clickedCart ?
              <Cart className="cart"
                items={this.state.selected}
                fetched={this.state.info}
                remove={this.removeCourse.bind(this)} /> :
              <div>
                <div className="checkBoxes">
                  <div> Search By:  </div>

                  <Form.Check
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
                <Form>
                  <Form.Control placeholder="Search for a Course" onChange={(value) => { this.handleSelect(value.target.value) }} />
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
      </div>
    );
  }
}

export default App
