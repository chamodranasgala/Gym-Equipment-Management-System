import React from "react";

function Header() {
  return (

    <div >
      <nav class="navbar navbar-expand-md navbar-light bg-coral">
        <div style={{ marginLeft: '8px', marginRight: '10px' }}>
          <img src="" class="me-1" height="50" alt="Logo" loading="lazy" />
        </div>

        <small className="navbar-brand mb-0 h1">Gym Management System</small>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

      </nav>
    </div>

  )
}

export default Header;