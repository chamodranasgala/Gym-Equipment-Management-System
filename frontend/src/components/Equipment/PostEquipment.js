import React, { Component } from 'react';
import axios from 'axios';

export default class PostEquipment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            equipment: {}
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`/equipment/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    equipment: res.data.equipment
                });
                console.log(this.state.equipment);
            }
        });
    }

    render() {

        const { equipmentName, equipmentCategory, quantity, value, updateDate, equipmentDetails } = this.state.equipment;

        return (
            <div className='container' style={{ marginBottom: '50px' }}>
                <div className='main'>
                    <div style={{ marginTop: '20px' }}>
                        <h4>{equipmentName}</h4>
                        <hr></hr>

                        <dl className='row'>
                            <dt className='col-sm-3'>Equipment Name: </dt>
                            <div className='col-sm-9'>
                                <p className='font-weight-normal'>{equipmentName}</p>
                            </div>

                            <dt className='col-sm-3'>Equipment Category: </dt>
                            <div className='col-sm-9'>
                                <p className='font-weight-normal'>{equipmentCategory}</p>
                            </div>

                            <dt className='col-sm-3'>Quantity: </dt>
                            <div className='col-sm-9'>
                                <p className='font-weight-normal'>{quantity}</p>
                            </div>

                            <dt className='col-sm-3'>Value: </dt>
                            <div className='col-sm-9'>
                                <p className='font-weight-normal'>{value} LKR</p>
                            </div>

                            <dt className='col-sm-3'>Updated Date: </dt>
                            <div className='col-sm-9'>
                                <p className='font-weight-normal'>{updateDate}</p>
                            </div>

                            <dt className='col-sm-3'>Equipment Details: </dt>
                            <div className='col-sm-9'>
                                <p className='font-weight-normal'>{equipmentDetails}</p>
                            </div>
                        </dl>

                        <a href='/equipmentlist'><button type='button' className="btn btn-outline-success" style={{ marginTop: '15px' }}><i className="fa-solid fa-angle-left"></i>&nbsp;Back</button></a>
                    </div>
                </div>
            </div>
        )
    }
}