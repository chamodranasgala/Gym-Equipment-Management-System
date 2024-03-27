import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

export default class EquipmentList extends Component {
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

    this.state = {
      equipments: []
    };
  }

  componentDidMount() {
    this.retrieveEquipments();
  }

  retrieveEquipments() {
    axios.get("/equipments").then(res => {
      if (res.data.success) {
        this.setState({
          equipments: res.data.existingEquipments
        });

        console.log(this.state.equipments);
      }
    });
  }

  // Delete Button
  onDelete = (id) => {
    axios.delete(`/equipment/delete/${id}`).then((res) => {
      alert("Deleted Successfully.");
      this.retrieveEquipments();
    });
  }

  // Search
  filterData(equipments, searchKey) {
    const result = equipments.filter((equipment) =>
      equipment.equipmentName.toLowerCase().includes(searchKey) ||
      equipment.equipmentCategory.toLowerCase().includes(searchKey)
    );

    this.setState({ equipments: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/equipments").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingEquipments, searchKey);
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

  // Add Button
  onSubmit = (e) => {
    e.preventDefault();

    const { equipmentName, equipmentCategory, quantity, value, updateDate, equipmentDetails } = this.state;

    const isValid = this.validate();
    if (isValid) {

      const data = {
        equipmentName: equipmentName,
        equipmentCategory: equipmentCategory,
        quantity: quantity,
        value: value,
        updateDate: updateDate,
        equipmentDetails: equipmentDetails
      }

      console.log(data)

      axios.post("/equipment/save", data).then((res) => {
        if (res.data.success) {
          alert("Added Successfully");
          this.setState(
            {
              equipmentName: "",
              equipmentCategory: "",
              quantity: "",
              value: "",
              updateDate: "",
              equipmentDetails: ""
            }
          );

          window.location.href = '/equipmentlist';
        }
      });
    }
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
        equipmentNameError, equipmentCategoryError, quantityError, valueError, updateDateError, equipmentDetailsError
      });
      return false;
    }
    return true;
  };

  // Report
  createPDF = (equipmentName, equipmentCategory, quantity, value, updateDate, equipmentDetails) => {

    console.log(equipmentName);
    console.log(equipmentCategory);
    console.log(quantity);
    console.log(value);
    console.log(updateDate);
    console.log(equipmentDetails);

    const unit = "pt";
    const size = "A4"; // page size
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size); // create document
    const title = `| POWERZONE | `;

    const equipmentNames = `Equipment Name:  ${equipmentName} `;
    const equipmentCategorys = `equipment Category:  ${equipmentCategory} `;
    const quantities = `Quantity:  ${quantity} `;
    const values = `Value:  Rs.${value}.00 `;
    const updateDates = `Update Date:  ${updateDate} `;
    const equipmentDetailss = `equipment Details:  ${equipmentDetails} `;

    const image = "https://res.cloudinary.com/dnonvyjrq/image/upload/v1651654099/gym_logo_vndrpz.jpg";

    const left = 50;
    const top = 50;
    const imgWidth = 75;
    const imgHeight = 75;

    doc.setFontSize(15);

    doc.text(150, 93, title);

    doc.text(50, 200, equipmentNames);
    doc.text(50, 240, equipmentCategorys);
    doc.text(50, 280, quantities);
    doc.text(50, 240, values);
    doc.text(50, 320, updateDates);
    doc.text(50, 320, equipmentDetailss);

    doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);

    doc.save(`EquipmentReport-${equipmentName}.pdf`);
  }

  render() {
    return (
      <div className='container' style={{ marginBottom: '70px', marginTop: '20px' }}>

        <div className='row'>
          <div className='col-lg-9 mt-2 mb-2'>
            <h4>Gym Equipment Inventory</h4>
          </div>

          <div className='col-lg-3 mt-2 mb-2'>
            <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
          </div>
        </div>

        <table className='table table-hover' style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Equipment Name</th>
              <th scope='col'>Equipment Category</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Value (LKR)</th>
              <th scope='col'>Updated Date</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.equipments.map((equipment, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{equipment.equipmentName}</td>
                <td>{equipment.equipmentCategory}</td>
                <td>{equipment.quantity}</td>
                <td>{equipment.value}</td>
                <td>{equipment.updateDate}</td>
                <td>
                  <a className='btn btn-success' href={`/postequipment/${equipment._id}`}>
                    <i class="fa-regular fa-eye"></i>&nbsp;View
                  </a>
                  &nbsp;&nbsp;

                  <a className='btn btn-warning' href={`/editequipment/${equipment._id}`}>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;&nbsp;

                  <button type="button" className="btn btn-danger" onClick={() => this.onDelete(equipment._id)}>
                    <i className='far fa-trash-alt'></i>&nbsp;Delete
                  </button>&nbsp;&nbsp;

                  <button className="btn btn-info" onClick={() => this.createPDF(equipment.equipmentName, equipment.equipmentCategory, equipment.quantity, equipment.value, equipment.updateDate, equipment.equipmentDetails)} >
                    <i className="fa-solid fa-file-pdf"></i>&nbsp;Get Report
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* Add New Equipment */}
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addequipment"><i className='far fa-check-square'></i>&nbsp;Add New Equipment</button>

        <div className="modal fade" id="addequipment" tabIndex="-1" aria-labelledby="addequipmentLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="addequipmentLabel">Add New Equipment</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

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
                    <input type="number" className='form-control' name='quantity' placeholder='Enter Quantity' value={this.state.quantity} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.quantityError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Value</label>
                    <div className="input-group">
                      <input type="text" className='form-control' name='value' placeholder='Enter Value' value={this.state.value} onChange={this.handleInputChange}></input>
                      <div className="input-group-prepend">
                        <span className="input-group-text">LKR</span>
                      </div>
                    </div>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.valueError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Updated Date</label>
                    <input type="date" className='form-control' name='updateDate' value={this.state.updateDate} onChange={this.handleInputChange}></input>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.updateDateError}
                    </div>
                  </div>

                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Equipment Details</label>
                    <textarea className='form-control' name='equipmentDetails' placeholder='Enter Equipment Details' value={this.state.equipmentDetails} onChange={this.handleInputChange}></textarea>

                    <div style={{ fontSize: 12, color: 'red' }}>
                      {this.state.equipmentDetailsError}
                    </div>
                  </div>

                </form>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                <button className='btn btn-success' type='submit' onClick={this.onSubmit}>Add</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}