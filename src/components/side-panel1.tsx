import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function SidePanel() {
  return (
    //<div
    //  className="bg-white text-dark border shadow-sm"
    //  style={{ width: "250px", minHeight: "100vh", padding: "15px" }}
    //>
    <div className="bg-white text-dark border shadow-sm flex-shrink-0" style={{ width: "15%", minWidth: "200px" }}>

      <h5 className="text-center border-bottom pb-2 text-primary">Test AB</h5>
      <ul className="list-unstyled mt-3">
        <li>
          <a href="#" className="text-dark d-block py-2 px-3 rounded hover-bg-primary">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-dark d-block py-2 px-3 rounded hover-bg-primary">
            My Account
          </a>
        </li>
        <li>
          <a href="#" className="text-dark d-block py-2 px-3 rounded hover-bg-primary">
            Rental Criteria
          </a>
        </li>
        <li>
          <a href="#" className="text-dark d-block py-2 px-3 rounded hover-bg-primary">
            Contact Us
          </a>
        </li>
        <li>
          <a href="#" className="text-dark d-block py-2 px-3 rounded hover-bg-primary">
            The side panel is currently a visual prototype and does not yet contain functional elements
          </a>
        </li>
        <li>
          <a href="#" className="text-dark d-block py-2 px-3 rounded hover-bg-primary">
            It was designed with future usability in mind, serving as a conceptual framework for potential interactive features
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SidePanel;
