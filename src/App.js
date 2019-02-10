import React, { Component } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import img from './images/cart.png'
import Nav from './components/Nav'
import Courses from './components/Courses'
import Cart from './components/Cart'
import {Tabs, Tab} from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);

    //state contains a key which is passed to courses to determine the buttons to display 
    this.state = {
      clickedCart: false,
      key: "1xx",
      selected: new Array(),
    }

    this.addCourse.bind(this);
  }

  handleSelect(selectedTab) {
    
    this.setState({key: selectedTab});
  }

  addCourse(newCourse) {
    
    //TO DO: MAKE AN ALERT WHEN THERES ALREADY 7 COURSES 
    //checks if we have not selected this course already
    if(!this.state.selected.includes(newCourse) && this.state.selected.length < 7) {

      //creates a copy of selected's contents 
      var newList = Object.assign([], this.state.selected); 
      newList.push(newCourse); 
      this.setState({selected: newList});
      return true;
    } else {
      return false;
    }
  }

  removeCourse(newCourse) {
    //checks if the list has the item first 
    if(this.state.selected.includes(newCourse)) {

      //assigns a copy and removes the value
      var newList = Object.assign([], this.state.selected); 
      newList.splice( newList.indexOf(newCourse), 1 );
      this.setState({selected: newList});
    }
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
        <div style={{
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 calc(1rem + 10%)',
        }}>
        
        <img src={img} className="logo"/>
        <div >
      <Tabs 
        className="courseTabs"
        activeKey={this.state.activeTab} 
        onSelect= {(activeKey) => this.handleSelect(activeKey)}>
        <Tab eventKey={"100x"} title="100x"></Tab>
        <Tab eventKey={"200x"} title="200x"></Tab>
        <Tab eventKey={"300x"} title="300x"></Tab>
        <Tab eventKey={"400x"} title="400x"></Tab>
      </Tabs>
          <Courses 
            group={this.state.key} 
            add={this.addCourse.bind(this)} 
            remove={this.removeCourse}
            selected={this.state.selected}
            />
          {this.state.clickedCart && <Cart className="cart"/>}
          </div>
        </div>
      </div>
    );
  }
}

export default App
