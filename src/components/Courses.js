
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
      var htmlReturn = []; 
      {Object.keys(courses).map((index) => {
        var stringNum = "" + courses[index]["number"];
        var dept = courses[index]["dept"];
        var title = courses[index]["title"];
        var description = courses[index]["description"];
        var cross = courses[index]["cross-listed"];
        var pre = courses[index]["prereqs"];
        if(stringNum.charAt(0) === key.charAt(0)) {
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
          <p> {this.state.pre == "" ? '' : "Prerequisites: " + this.state.pre}</p>
          <p>{this.state.cross == "" ? '' : "Cross-Listed As: " + this.state.cross}</p>
        </div>
        {this.state.showAlert && <div className="alert"> You have 7 Courses In Your Cart </div>}
      </div>
  }


  handleAdd() {
    if(this.props.add(this.state.number)) {
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
            {!this.props.selected.includes(this.state.number) ?
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