/** @format */

import Snackbar from "@mui/material/Snackbar";

const ToastMessage = ({ message, open }) => {
  return (
    <div>
      <Snackbar open={open} message={message} autoHideDuration={1200} />
    </div>
  );
};
export default ToastMessage;
