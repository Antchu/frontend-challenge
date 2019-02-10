import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      info: {}
    }
  }



  handleCheckOut() {
    if (this.errorCheck()) {

    } else {
      //show alert 
    }
  }

  errorCheck() {

  }



  renderAdded() {
    var self = this;
    var i = 0; 
    console.log(Array.isArray(self.props.fetched));
    var rows = (self.props.fetched).map( (index) => {
      console.log("dickballs"); 
    return( <tr>
          <td> {i + 1} </td>
          <td> {index["key"]} </td>
          <td> {index["open"]} </td>
          <td> {index["size"]} </td>
          <td> {index["cu"]} </td>
          <td>< Button onClick={() => self.props.remove(index["key"])}> Remove </Button></td>
        </tr>)
    }
)
   return rows; 
  }

  render() {
    return (
      <div style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        marginBottom: '1.5rem',
        borderRadius: '4px',
      }}>
        <h4>Course Cart</h4>

        {this.props.items.length === 0 ?
          <p>You cart is currently empty!</p> :

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
        }
      </div>


    )
  }
}

var links = ["https://www.youtube.com/watch?v=LDU_Txk06tM",
  "https://www.youtube.com/watch?v=Dxv0BTWxEq4"
];
export default Cart;
