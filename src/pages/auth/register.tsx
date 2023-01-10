import Logo from "components/Logo";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";

import useAuth from "app/hooks/useAuth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);
  const { register } = useAuth();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password, name);
    } catch (error: any) {
      setError(error?.message ?? error);
    }
  }

  return (
    <div
      style={{
        marginTop: "5%",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <Logo appName sx={{ margin: "auto" }} />
      <form
        style={{ textAlign: "start" }}
        autoComplete="none"
        onSubmit={handleLoginSubmit}
      >
        <h2 style={{ margin: "auto" }}>Register</h2>
        <NavLink to={"/auth/login"}>Already have an account ? Login</NavLink>
        <div className="igroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="igroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="igroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
