
import courses from '../data/courses'
import React, { Component } from 'react';
import '../App.css'
import { Button, Modal} from 'react-bootstrap';

class Courses extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      description: "", 
      show: false,
      department: "", 
      title: "",
      cross: "",
      pre: "", 
      showAlert: false
    }
  }

  renderCourses(key) {
    var self = this;
    key = key.toLowerCase();
    key = key.replace(/\s/g, '');
    
      var htmlReturn = []; 
      {Object.keys(courses).map((index) => {
        
        var stringNum = "" + courses[index]["number"];
        var dept = courses[index]["dept"];
        var title = courses[index]["title"];
        var description = courses[index]["description"];
        var cross = courses[index]["cross-listed"];
        var pre = courses[index]["prereqs"];

        var searchCriteria = ""; 
        var filter = self.props.filter; 

        var match = false; 

        //depending on the tick, we change what searchCriteria is 
        if(filter === "course") {
          searchCriteria = dept + stringNum;
          match = cross !== undefined && this.handleFilterList(cross, key);
        } else if (filter === "title") {
          searchCriteria = title; 
        } else if(filter === "prereqs") {
          match = pre !== undefined && this.handleFilterList(pre, key); 
        }

        //if we haven't hit the two cases where we selected a cross list or prereq 
        searchCriteria = searchCriteria.toLowerCase();
        searchCriteria = searchCriteria.replace(/\s/g, '');

        if(!match) {
          match = searchCriteria.includes(key) && key !== "";
        }
        if(match) {
          //Button that changes what is previewed 
          htmlReturn.push(
            <Button className="course" onClick={() => this.handleShow(stringNum,
             dept, title, description, cross, pre)}>
          {courses[index]["dept"]} {stringNum}
        </Button>
          )
        }
      })}
      
      return htmlReturn;
  }

  handleFilterList(list, searchFor) {

    //checks if the textbox is blank 
    if(searchFor === "") {
      return false;
    }

    //checks for a match in a list 
    for(var i = 0; i < list.length; i++) {
      var current = list[i]; 
      current = current.toLowerCase();
      current = current.replace(/\s/g, '');
      if(current.includes(searchFor)) {
          return true;
      }
    }
    return false; 
  }

  handleShow(num, dept, name, descr, cross, pre) {
    this.setState({
      number: num, 
      department: dept,
      show: true,
       description: descr,
      title: name, 
    cross: this.formatList(cross), 
  pre: this.formatList(pre)});
  }

  handleClose() {

    //resets everything 
    this.setState({
      number: "", 
      department: "",
      show: false,
       description: "",
      title: "", 
    cross: "", 
  pre: "", 
  showAlert: false
    });
  }

  formatList(list) {
    //takes in a list and turns it into a formatted string
    if(list === undefined) {
      return "";
    } 
    var returnString = ""; 
    
    for(var i = 0; i < list.length; i++) {
      if(i === list.length - 1) {
        returnString += list[i]
      } else {
       returnString += list[i]+ ", ";
      } 
    }
    return returnString;
  }

  renderModalBody() {
    return <div>
      <div className="title"> {this.state.title} </div>
        <div className="classDescr">
          {this.state.description}
        </div>
        <div className="smallerItems">
          {this.state.pre == "" ? '' : <span > <span className="smallHeader"> Prerequisites: </span>  {this.state.pre}</span>}
          {this.state.cross == "" ? '' : <span > <span className="smallHeader"> Cross-Listed As: </span>  {this.state.cross}</span>}
        </div>
        {this.state.showAlert && <div className="alert"> You have 7 Courses In Your Cart </div>}
      </div>
  }


  handleAdd() {
    if(this.props.add(this.state.department + " " + this.state.number)) {
      this.handleClose();
    } else {
      //show an alert, which will be set back to false when you close out
      this.setState({showAlert: true})
    }
  }
  render() {
      return (
      <div className="courseContainer">
        <div className="currentCourses">
          {this.renderCourses(this.props.group)} 

          <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.department} {this.state.number} </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.renderModalBody()}</Modal.Body>
          <Modal.Footer>
            {!this.props.selected.includes(this.state.department + " " + this.state.number) ?
            <Button variant="primary" onClick={()=> {
              this.handleAdd();
            }}>
              Add to Cart
            </Button> : 

            <Button variant="primary" disabled>
              Already in Cart
            </Button>
            }
          </Modal.Footer>
        </Modal>
        </div>
      </div>
      )
  }

}
export default Courses;