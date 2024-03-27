import React from "react";
import "../styles/css/dashboard.css";

function Dashboard() {
    return (
        <div className="adminhome">
            <div className="box-container">

                <div className="box box1">
                    <div className="text">
                        <center>
                            <i class="fa-solid fa-dumbbell fa-2xl"></i>
                            <br></br>
                            <br></br>
                            <h2 className="topic">Total Equipments</h2>
                            <h2 className="topic-heading">150</h2>
                        </center>
                    </div>
                </div>

                <div className="box box2">
                    <div className="text">
                        <center>
                            <i class="fa-solid fa-sack-dollar fa-2xl"></i>
                            <br></br>
                            <br></br>
                            <h2 className="topic">Total Value</h2>
                            <h2 className="topic-heading">300,000 LKR</h2>
                        </center>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <center>
                <a className='btn btn-dark btn-lg' href='/equipmentlist'>
                    Manage Inventory&nbsp;&nbsp;<i class="fa-solid fa-angles-right fa-lg"></i>
                </a>
            </center>

        </div>
    );
}

export default Dashboard;