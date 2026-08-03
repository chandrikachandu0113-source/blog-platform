import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = () => {

    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password
      })
      .then((response) => {

        localStorage.setItem(
          "token",
          response.data.token
        );

        alert("Login successful");

      })
      .catch((error) => {
        console.log(error);
      });

  };


  return (
    <div className="container">

      <h1>Login</h1>


      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />


      <br /><br />


      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />


      <br /><br />


      <button onClick={login}>
        Login
      </button>


    </div>
  );
}

export default Login;