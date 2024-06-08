import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  info: string;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ isOpen, onClose, title, info }) => {
  useEffect(() => {
    if (isOpen) {
      console.log("ModalSuccess is open:", title, info);
    }
  }, [isOpen, title, info]);

  return (
    <Dialog
      className="form__modal-success modal-success"
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle className="modal-success__title title" data-testid="modal-title">{title}</DialogTitle>
      <DialogContent className="modal-success__container">
        <DialogContentText className="modal-success__description description" data-testid="modal-info">
          {info}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="modal-success__button button"
          onClick={onClose}
          color="primary"
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSuccess;
