import Logo from "components/Logo";
import React, { useState } from "react";
import "./login.css";
import { NavLink } from "react-router-dom";
import useAuth from "app/hooks/useAuth";

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
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
        <h2 style={{ margin: "auto", marginBottom: 10 }}>Login to continue</h2>
        <NavLink to={"/auth/register"}>New to Notes App ? Register</NavLink>
        {error && (
          <h6
            style={{ margin: 0, background: "red", color: "#eff", padding: 4 }}
          >
            {error}{" "}
          </h6>
        )}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
