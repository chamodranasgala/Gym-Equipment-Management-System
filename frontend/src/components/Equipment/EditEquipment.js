import React, { Component } from 'react';
import axios from 'axios';

export default class EditEquipment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      equipmentName: "",
      equipmentCategory: "",
      quantity: "",
      value: "",
      updateDate: "",
      equipmentDetails: ""
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/equipment/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          equipmentName: res.data.equipment.equipmentName,
          equipmentCategory: res.data.equipment.equipmentCategory,
          quantity: res.data.equipment.quantity,
          value: res.data.equipment.value,
          updateDate: res.data.equipment.updateDate,
          equipmentDetails: res.data.equipment.equipmentDetails
        });

        console.log(this.state.equipment);
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  // Validation
  validate = () => {

    let equipmentNameError = "";
    let equipmentCategoryError = "";
    let quantityError = "";
    let valueError = "";
    let updateDateError = "";
    let equipmentDetailsError = "";

    if (!this.state.equipmentName) {
      equipmentNameError = 'This field is required!';
    }
    if (!this.state.equipmentCategory) {
      equipmentCategoryError = 'This field is required!';
    }
    if (!this.state.quantity) {
      quantityError = 'This field is required!';
    }
    if (!this.state.value) {
      valueError = 'This field is required!';
    }
    if (!this.state.updateDate) {
      updateDateError = 'This field is required!';
    }
    if (!this.state.equipmentDetails) {
      equipmentDetailsError = 'This field is required!';
    }

    if (equipmentNameError || equipmentCategoryError || quantityError || valueError || updateDateError || equipmentDetailsError) {
      this.setState({
        equipmentNameError,
        equipmentCategoryError,
        quantityError,
        valueError,
        updateDateError,
        equipmentDetailsError
      });
      return false;
    }
    return true;
  };

  // Edit
  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const { equipmentName, equipmentCategory, quantity, value, updateDate, equipmentDetails } = this.state;

    const isValid = this.validate();
    if (isValid) {

      const data = {
        equipmentName,
        equipmentCategory,
        quantity,
        value,
        updateDate,
        equipmentDetails
      };
      console.log(data);

      axios.put(`/equipment/update/${id}`, data).then((res) => {
        if (res.data.success) {
          alert("Updated Successfully");

          this.setState({
            equipmentName: "",
            equipmentCategory: "",
            quantity: "",
            value: "",
            updateDate: "",
            equipmentDetails: ""
          });

          window.location.href = '/equipmentlist';
        }
      });
    }
  }

  render() {
    return (
      <div className='container' style={{ marginBottom: '75px' }}>
        <div className='col-md-8 mt-4 mx-auto'>
          <center><h1 className='h3 mb-3 font-weight-normal'>Edit Equipment Details</h1></center>

          <form className='needs-validation' noValidate>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Equipment Name</label>
              <input type='text' className='form-control' name='equipmentName' placeholder='Enter Equipment Name' value={this.state.equipmentName} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.equipmentNameError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Equipment Category</label>
              <input type='text' className='form-control' name='equipmentCategory' placeholder='Enter Equipment Category' value={this.state.equipmentCategory} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.equipmentCategoryError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Quantity</label>
              <input type='text' className='form-control' name='quantity' placeholder='Enter Quantity' value={this.state.quantity} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.quantityError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Value (LKR)</label>
              <input type='text' className='form-control' name='value' placeholder='Enter Value' value={this.state.value} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.valueError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Updated Date</label>
              <input type='text' className='form-control' name='updateDate' placeholder='Enter Update Date' value={this.state.updateDate} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.updateDateError}
              </div>
            </div>

            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Equipment Details</label>
              <input type='text' className='form-control' name='equipmentDetails' placeholder='Enter Equipment Details' value={this.state.equipmentDetails} onChange={this.handleInputChange}></input>
              <div style={{ fontSize: 12, color: 'red' }}>
                {this.state.equipmentDetailsError}
              </div>
            </div>

            <button className='btn btn-warning' type='submit' style={{ marginTop: '15px' }} onClick={this.onSubmit}>
              <i className='far fa-check-square'></i>
              &nbsp; Edit
            </button>&nbsp;&nbsp;

            <a href='/equipmentlist'><button type='button' className="btn btn-secondary" style={{ marginTop: '15px' }}><i className="fa-regular fa-circle-xmark"></i>&nbsp;Close</button></a>

          </form>
        </div>
      </div>
    )
  }
}