import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Успешная регистрация</DialogTitle>
      <DialogContent>
        <DialogContentText>Поздравляем! Вы можете начать пользоваться приложением!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationSuccessModal;