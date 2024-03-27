import React, { Component } from 'react';
import '../styles/css/navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <div className='navb'>
        <ul className='navbar nav justify-content-center ul'>
          <li className='li'><a href="/dashboard">Dashboard</a></li>
          <li className='li'><a href="/equipmentlist">Inventory</a></li>
        </ul>
      </div>
    )
  }
}
