import React, { useReducer, useEffect } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import AuthService from "../../Services/auth-service";
import LoginModel from "../../models/LoginModel";

//state type

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    var data: LoginModel = {
      usernameOrEmail: state.username,
      password: state.password,
    };

    AuthService.login(data)
      .then((response: any) => {
        if (response.data.success) {
          dispatch({
            type: "loginSuccess",
            payload: "Login Successfully",
          });
          window.location.href='/itemList';
          console.log(response.data);
        } else {
          dispatch({
            type: "loginFailed",
            payload: "Incorrect username or password",
          });
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  return (
    <>
      <Grid
        item
        xs={5}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card sx={{ minWidth: 400, minHeight: 300 }} variant="outlined">
          <form noValidate autoComplete="off">
            <CardHeader title="Login App" />
            <CardContent>
              <div>
                <TextField
                  error={state.isError}
                  fullWidth
                  id="username"
                  type="email"
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={handleUsernameChange}
                  onKeyDown={handleKeyPress}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  helperText={state.helperText}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleLogin}
                disabled={state.isButtonDisabled}
                style={{ margin: "10px" }}
              >
                Login
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
