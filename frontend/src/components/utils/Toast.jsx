/** @format */

import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ToastMessage = ({ message }) => {
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={message}
        key={state.Transition.name}
        autoHideDuration={1200}
      />
    </div>
  );
};
export default ToastMessage;
