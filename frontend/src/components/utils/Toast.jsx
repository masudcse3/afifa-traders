/** @format */

import Snackbar from "@mui/material/Snackbar";

// eslint-disable-next-line react/prop-types
const ToastMessage = ({ message, open, handleClose }) => {
  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={2000}
      />
    </div>
  );
};
export default ToastMessage;
