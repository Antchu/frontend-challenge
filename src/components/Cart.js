import React, { Component } from 'react';

class Cart extends Component { 
  constructor(props) {
    super(props);
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
    
        <p>You cart is currently empty!</p>
      </div>


    )
  }
}

export default Cart;
