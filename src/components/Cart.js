import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Table, Modal } from 'react-bootstrap'
import YouTube from 'react-youtube';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      alert: ""
    }
  }

  handleCheckOut() {
    if (this.errorCheck()) {
      this.handleShow();
    }
  }

  errorCheck() {
    for (var i = 0; i < this.props.fetched.length; i++) {
      //check if any courses are closed
      if (this.props.fetched[i][2] === "N") {
        return false;
      }
    }
    return true;
  }

  renderAdded() {
    var self = this;
    var i = 0;
    var rows = (self.props.fetched).map((index) => {
      i++;
      var cName = self.props.items[i - 1];
      return (
        <tr>
          <td> {i} </td>
          <td> {cName} </td>
          <td> {index[1]} </td>
          <td> {index[2]} </td>
          <td> {index[3]} </td>
          <td>< Button onClick={() => {
             self.props.remove(cName) 
            self.props.toggle();
           }}> Remove </Button></td>
        </tr>)
    }
    )
    return rows;
  }

  renderSummary() {
    var j = 0;
    for (var i = 0; i < this.props.fetched.length; i++) {
      if (this.props.fetched[i][3] !== "-") {
        j += parseInt(this.props.fetched[i][3]);
      }
    }
    return <div>
      <p>Total Credits: {j}</p>
      <Button onClick={() => this.handleCheckOut()}> Check Out </Button>
      {this.state.alert && <div className="alert"> At Least One of Your Selected Courses is Full </div>}
    </div>
  }

  handleVideo() {
    //credits to github user I pulled this plugin from 
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };


    var item = links[Math.floor(Math.random() * links.length)];
    item = item.substring(item.indexOf("=") + 1);
    return <YouTube
      videoId={item}
      opts={opts}
      onReady={this._onReady}
    />

  }

  showCourses() {
    var htmlReturn = [];
    Object.keys(this.props.items).map((key) => htmlReturn.push(
      <p> {this.props.items[key]} </p>))

    return htmlReturn;
  }

  renderModalBody() {
    return <div>
      <p> The following courses have been added to your schedule: </p>
      {this.showCourses()}
      <p> Hmm looks like you added a lot of rough classes... this'll get
        you through the hard times </p>
      {this.handleVideo()}

    </div>
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleClose() {
    this.setState({
      show: false
    });

  }


  render() {
    return (
      <div style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '4px',
        backgroundColor: 'white',
        boxShadow: `0px 2px 10px 3px #f2f2f2`
      }}>
        <h4>Course Cart</h4>

        {this.props.items.length === 0 ?
          <p>You cart is currently empty!</p> :
          <div>
            <Table responsive>
              <thead>
                <th> Rank </th>
                <th> Course </th>
                <th> Open? </th>
                <th> Class Size </th>
                <th> CU </th>
                <th> </th>
              </thead>
              {this.renderAdded()}
            </Table>
            {this.renderSummary()}

            <Modal
              style={{ textAlign: "center" }}
              show={this.state.show}
              onHide={() => this.handleClose()}
              centered
              size="lg">
              <Modal.Header closeButton>
                <Modal.Title>  Success! </Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.renderModalBody()}</Modal.Body>
            </Modal>
          </div>

        }

      </div>


    )
  }
}

var links = ["https://www.youtube.com/watch?v=LDU_Txk06tM",
  "https://www.youtube.com/watch?v=u155ncSlkCk",
  "https://www.youtube.com/watch?v=kN29b1-hhZ0",
  "https://www.youtube.com/watch?v=gO8N3L_aERg",
  "https://www.youtube.com/watch?v=ssIY8NYwvh4"
];
export default Cart;
