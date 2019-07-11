import React from "react";

import logo from "../assets/acnbank.png";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Welcome to ACN Bank</h1>

    <p className="lead">
      This is a sample application that demonstrates an authentication flow for
      an SPA, using <a href="https://auth0.com">Auth0</a>
    </p>
  </div>
);

export default Hero;
