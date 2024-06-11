import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grant } from "../assets";
import { LoginComponent } from "../components";
import { setLoading } from "../redux/loading";
import "./style.scss";

const Login = ({changeColorMode}) => {
  const location = useLocation();

  const [auth, setAuth] = useState(false);

  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (location?.pathname === "/login/auth") {
        setAuth(true);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      } else {
        setAuth(false);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      }
    }
  }, [location]);

  return (
    <div className="Auth">
      <p className="toggle-name">Dark Mode</p>
      <button
                onClick={() => {
                  let mode = localStorage.getItem("darkMode");
                  if (mode) {
                    changeColorMode(false);
                  } else {
                    changeColorMode(true);
                  }
                }}
                role="switch"
                type="button"
                className="toggle"
              >
                <div></div>
              </button>
      <div className="inner">
        {auth ? (
          <LoginComponent  changeColorMode={ch}/>
        ) : (
          <div className="suggection">
            <div>
              <Grant />
            </div>
            <div>
              <p>Welcome to GE CoPilot™</p>
              <p>Log in or Sign up with your account to continue</p>
            </div>

            <div className="btns">
              <button
                onClick={() => {
                  navigate("/login/auth");
                }}
                 class="btn btn-2"><span>Log In</span>
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                class="btn btn-2"><span>Sign Up</span>
              </button>
            </div>
          </div>
        )}

        <div className="bottum">
          
        </div>
      </div>
    </div>
  );
};

export default Login;
