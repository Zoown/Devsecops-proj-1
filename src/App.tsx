// React Rules
//  1. Functions cannot return multiple elements (ONLY 1) {WORKAROUND: Wrap all elements inside a <div> element or something else}
//  2. Hooks are component-based (All components has their own states, so you can make copies of same component that each keeps their own state)
//  3. Props are parameters, can destructure if only interested in specific data inside the whole prop (Exmple if interested only in var a, put this in parameter for a function) --- {var a}: Props
//  4. Benefit of prop destructuring is you skip having to use the additional scope example var a inside props can just use a.data instead of props.a.data
//  5. Treat props as inmutable(Read-only), conventional coding. (if you need to change something, make it a state because it needs the DOM updating functionality)
//  6. States are like using local function variables.
//  7.
//  8.
//  9.
// 10.

// JSX Rules
//  1. Does not have for loops
//  2. Can only contain HTML or react components (Cannot render dynamically like items.map(item => ))
//  3.
//  4.
//  5.
//  6.
//  7.
//  8.
//  9.
// 10.

// Improvements that this code could benefit from
// 1. Avoiding "Prop drilling" (Passing props down multiple layers of components, better way is either through "Redux" or "React context" which keeps a centralized storage place for all states)

// Shortcuts
// CTRL+D will create multiple cursors that matches the string you have selected (Good for changing many identical strings)

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // Enables navbar toggler functionality
import "./myCustomStyles.css";

import ListGroup from "./components/ListGroup";
import Header from "./components/Header1-bootstrap";
import Footer from "./components/footer1";
import SidePanel from "./components/side-panel1";
import Content from "./components/content1";
import Card from "./Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import houseImage from "./assets/images/test_house_5.jpg";
import FilterBar from "./components/content-filter-bar1";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewApartmentForm from "./NewApartmentForm";
import DeleteApartment from "./DeleteApartment";

//Auth
import { Navigate } from "react-router-dom";
import Login from "./login";


function handleSelectCity(item: string) {
  console.log(item);
}

type StreetFilter = "Street 1" | "Street 2" | "Street 3";
type CityFilter = "City A" | "City B" | "City C" | "City D";

interface Apartment {
  id?: number;
  street: string;
  address: string;
  apartment_number: number;
  size_sq_m: number;
  rent_cost: number;
  city: string;
}

// Token lasts forever does not check expiraton time
//const isAuthenticated = () => {
//  return !!localStorage.getItem("token"); // Checks if user is authenticated
//};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
    return exp * 1000 > Date.now(); // Check if expiration is still valid
  } catch (error) {
    return false; // Prevent crashes if token is invalid
  }
};


const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />; //Reroute ProtectedRoutes to /login if not authenticated
};

function App() {

  const [apartments, setApartments] = useState<Apartment[]>([]);

  //useEffect(() => {
  //  axios.get("http://localhost:5000/apartments")  // Backend API URL
  //    .then(response => setApartments(response.data))  // Store data in state
  //    .catch(error => console.error("Error fetching apartments:", error));
  //}, []);

  useEffect(() => {
    fetch("/api/apartments") // Make sure this matches your API route!
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched apartments:", data); // Debugging
        setApartments(data);
        setLoading(false);
      })
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  const [streetFilters, setStreetFilters] = useState<
    Record<StreetFilter, boolean>
  >({
    "Street 1": false,
    "Street 2": false,
    "Street 3": false,
  });

  const [cityFilters, setCityFilters] = useState<Record<CityFilter, boolean>>({
    "City A": false,
    "City B": false,
    "City C": false,
    "City D": false,
  });

  const handleStreetFilterChange = (filter: StreetFilter) => {
    setStreetFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const handleCityFilterChange = (filter: CityFilter) => {
    setCityFilters((prevFilters) => ({ 
      ...prevFilters, 
      [filter]: !prevFilters[filter],
    }));
  };
  
  //HANDLE CRUD METHODS
  const handleApartmentAdded = (newApartment: Apartment) => {
    setApartments([...apartments, newApartment]); // Dynamically update list
  };

  const handleApartmentDeleted = (id: number) => {
    setApartments(apartments.filter((apt) => apt.id !== id)); // Remove from UI after deletion
  };

  const filteredCards = apartments.filter(
    (apartment) =>
      (streetFilters[apartment.street as StreetFilter] ||
        !Object.values(streetFilters).some(Boolean)) &&
      (cityFilters[apartment.city as CityFilter] ||
        !Object.values(cityFilters).some(Boolean))
  );

  return (
    <div>
      <Header />
      <div className="d-flex">
        <SidePanel />
        <div className="flex-grow-1">
          <Content>
            <Routes>
              <Route
                path="*"
                element={
                  <div>
                    <p>
                      Welcome! You can find available apartments in the
                      **"Apartments"** tab at the top.
                      <br />
                      <br />
                      Here is a list of the cities we provide
                      apartments in:
                    </p>
                    <ListGroup
                      items={[...new Set(apartments.map((apt) => apt.city))]} // Extract unique cities
                      //items={["City A", "City B", "City C", "City D"]} // Hardcoded list
                      heading="Cities"
                      onSelectItem={handleSelectCity}
                    />
                  </div>
                }
              />

              <Route path="/about" element={
                <div>
                  <div className="container mt-5">
                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h2 className="text-primary text-center border-bottom pb-2">About This Project</h2>
                        <p className="text-muted text-center">
                          Built by <strong>Andre Persson</strong> as a learning project to explore web development technologies and best practices.
                        </p>
                        <p>
                          This site provides a structured layout for showcasing available apartments, incorporating modern UI/UX principles with future potential for interactive features.
                          <br/>
                          <br/>
                          The focus of this project has been to establish the backend coupled with responsive design. Integrate a database, authentication and filtering apartments. Hence the lack of frontend design.
                        </p>

                        <h3 className="text-primary mt-4">Technologies & Libraries Used</h3>
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="text-dark">Frontend</h5>
                            <ul className="list-unstyled">
                              <li><strong>React.js</strong> – Component-based UI development and state management.</li>
                              <li><strong>Bootstrap</strong> – Responsive design and predefined styling.</li>
                              <li><strong>CSS & Styled Components</strong> – Enhances customizability.</li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <h5 className="text-dark">Backend (Potential Future Expansion)</h5>
                            <ul className="list-unstyled">
                              <li><strong>Node.js & Express.js</strong> – API-based interactions for listings.</li>
                              <li><strong>PostgreSQL</strong> – Storing rental listings and user data.</li>
                            </ul>
                          </div>
                        </div>

                        <h3 className="text-primary mt-4">Other Tools & Enhancements</h3>
                        <ul className="list-unstyled">
                          <li><strong>JWT Authentication</strong> – Secure login sessions using tokens and bcrypt for hashing password. (1 Minute tokens for showcase purposes)</li>
                          <li><strong>Cloud Hosting - Vercel</strong> – Deployment and scalability.</li>
                          <li><strong>RESTful APIs</strong> – Possible real estate database integration.</li>
                        </ul>

                        <h4 className="text-center mt-4 text-secondary">Future Potential</h4>
                        <p className="text-center">
                          While the side panel, footer and Search serve as visual prototypes, they set the groundwork for an evolving rental platform with enhancements like tenant applications, booking management, and real-time availability updates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              } 
              />
              
              <Route
                path="/apartments"
                element={
                  <div>
                    <FilterBar
                      streetFilters={streetFilters}
                      cityFilters={cityFilters}
                      onStreetFilterChange={handleStreetFilterChange}
                      onCityFilterChange={handleCityFilterChange}
                    />

                  <div className="d-flex flex-wrap">
                    {apartments.length === 0 ? (
                      <p>Loading apartments...</p>  // Shows when backend is still loading
                    ) : filteredCards.length === 0 ? (
                      <p>No apartments found with the selected filters.</p>  // Shows when filtering results in zero matches
                    ) : (
                      filteredCards.map((apt) => (
                        <Card
                          key={apt.id} // Must have - Used for API delete
                          image={houseImage} // Placeholder image
                          title={`Apartment ${apt.apartment_number}`}
                          description={apt.address}
                          link="/about"
                          street={apt.street}
                          city={apt.city}
                          size={apt.size_sq_m}
                          rent={apt.rent_cost}
                        />
                      ))
                    )}
                    </div>
                  </div>
                }
              />
              
              <Route path="/admin" element=
              {
                <ProtectedRoute element={
                  <div>Admin Page
                  <NewApartmentForm onApartmentAdded={handleApartmentAdded} />

                  {/* List of Apartments with Delete Option */}
                  {
                    apartments.map((apt) => (
                      <div key={apt.id} className="apartment-card">
                        <DeleteApartment apartmentId={apt.id ?? 0} apartmentNumber={apt.apartment_number} onApartmentDeleted={handleApartmentDeleted} />
                      </div>
                    ))
                  }

                  </div>
                }
                />
              }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Content>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

