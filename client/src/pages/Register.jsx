import { useState } from "react";
import axios from "axios";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const register = () => {

    axios
      .post("http://localhost:5000/auth/register", {
        username,
        email,
        password
      })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

  };


  return (
    <div className="container">

      <h1>Register</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

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

      <button onClick={register}>
        Register
      </button>

    </div>
  );
}

export default Register;