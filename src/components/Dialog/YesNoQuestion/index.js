import React from "react";
import { Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function YesNoQuestion({
  dialogTitle,
  dialogDescription,
  isOpen,
  onClickYes,
  onClickNo,
}) {
  const handleOnYes = () => {
    onClickYes();
  };

  const handleOnNo = () => {
    onClickNo();
  };

  return (
    <Dialog open={isOpen} onClose={handleOnNo}>
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogDescription}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnYes} variant="success">
          Đồng ý
        </Button>
        <Button onClick={handleOnNo} variant="primary" autoFocus>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

YesNoQuestion.defaultProps = {
  isOpen: false,
  title: "",
};

YesNoQuestion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClickYes: PropTypes.func,
  onClickNo: PropTypes.func,
};
