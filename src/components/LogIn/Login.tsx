import React, { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import stylesLogin from "./Login.module.css";
import { useUserStore, User } from "../../store/user-store";
import CreateAccountBtn from "./SingUp/createAccountBtn/CreateAccountBtn";

const Login: React.FC = () => {
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
        console.log("Fetched users:", data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Input email:", email);
    console.log("Input password:", password);

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setErrorMessage("");
      navigate(
        "/movies"
        
      );
    } else {
      setErrorMessage("Invalid email or password");
    }
  };
  return (
    <div className={stylesLogin.loginBg}>
      <div
        className={`container ${stylesLogin.bgLogIn} ${stylesLogin.centerItems} ${stylesLogin.roundedCorner}`}
      >
        <div className="row">
          <div className={`col-6 ${stylesLogin.logoLogIn}`}>
            <p className={stylesLogin.logoText}>
              KINO<span className={stylesLogin.logoTextSpam}>MOE</span>
            </p>
          </div>
          <div className={`col-6 ${stylesLogin.costumeP}`}>
            <div className="row">
              <div className="col-10 offset-1 text-center ">
                <h2 className="text-white">Welcome!</h2>
                <p className="text-white">Join us!</p>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input
                      type="email"
                      className={`form-control rounded-pill bg-transparent text-white ${stylesLogin.input}`}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <small
                      id="emailHelp"
                      className={`form-text text-muted text-center ${stylesLogin.input}`}
                    ></small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1"></label>
                    <input
                      type="password"
                      className={`form-control rounded-pill bg-transparent  text-white ${stylesLogin.input}`}
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn w-100 rounded-pill mt-4 ${stylesLogin.button} ${stylesLogin.bgGreen}`}
                  >
                    Log In
                  </button>
                </form>
                <div className={stylesLogin.orContainer}>
                  <hr className={stylesLogin.lineOne} />
                  <p className="text-center text-white">or</p>
                  <hr className={stylesLogin.lineTwo} />
                </div>
                <button
                  type="button"
                  className={`btn border border-white text-white w-100 rounded-pill mt-2 bg-transparent ${stylesLogin.googleLogo} ${stylesLogin.button}`}
                  onClick={handleLogin}
                >
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className={`login-with-facebook-btn-logo btn border border-white text-white w-100 rounded-pill mt-3 mb-3 bg-transparent ${stylesLogin.facebookLogo} ${stylesLogin.button}`}
                  onClick={handleLogin}
                >
                  Sign in with Facebook
                </button>
                <Link to="/logIn/createAccount">
                  <CreateAccountBtn />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
