import { Alert, Snackbar } from "@mui/material";
import { useReducer } from "react";

type State = {
    setOpen: boolean,
    message: string
};

const initialState: State = {
   setOpen: true,
   message: ""
};
type Action =
  | { type: "setOpen"; payload: boolean }
  | { type: "setMessage"; payload: string };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "setOpen":
        return {
          ...state,
          setOpen: action.payload,
        };
      case "setMessage":
        return {
          ...state,
          message: action.payload,
        };
    }
  };
const Toast = () => {
    const [state,dispatch] = useReducer(reducer, initialState);
  const handleClose = (event: any, reason: any)  => {
    if (reason === "clickaway") {
        return;
      }
      dispatch({
        type: "setOpen",
        payload: false,
      });
  }
    
    return(
        <Snackbar
            open={state.setOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            // message=""
            // action={action}
          >
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              {state.message}
            </Alert>
          </Snackbar>
    );
}

export default Toast;