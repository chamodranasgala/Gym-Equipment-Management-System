import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Updated Component Imports
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import EquipmentList from './components/Equipment/EquipmentList';
import EditEquipment from './components/Equipment/EditEquipment';
import PostEquipment from './components/Equipment/PostEquipment';

import Dashboard from "./components/Dashboard";

import Getstart from "./components/Getstart";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/equipmentlist" component={Header}></Route>
        <Route path="/equipmentlist" component={Navbar}></Route>
        <Route path="/equipmentlist" component={EquipmentList}></Route>
        <Route path="/equipmentlist" component={Footer}></Route>

        <Route path="/editequipment" component={Header}></Route>
        <Route path="/editequipment" component={Navbar}></Route>
        <Route path="/editequipment/:id" component={EditEquipment}></Route>
        <Route path="/editequipment" component={Footer}></Route>

        <Route path="/postequipment" component={Header}></Route>
        <Route path="/postequipment" component={Navbar}></Route>
        <Route path="/postequipment/:id" component={PostEquipment}></Route>
        <Route path="/postequipment" component={Footer}></Route>

        <Route path="/dashboard" component={Header}></Route>
        <Route path="/dashboard" component={Navbar}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/dashboard" component={Footer}></Route>

        <Route path="/" exact component={Getstart}></Route>

      </BrowserRouter>
    )
  }
}