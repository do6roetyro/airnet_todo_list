import React from "react";
import { Modal, Button } from "@mui/material";
import LegendItem from "./LegendItem";

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose} className="legend">
      <div className="legend__content">
        <h4 className="legend__title">Легенда</h4>
        <ul className="legend__list list">
          <LegendItem
            text=""
            description="Неделя без задач"
            type="week"
            color="grey"
          />
          <LegendItem
            text=""
            description="Неделя с задачами (кликни)"
            type="week"
            color="yellow"
          />
          <LegendItem
            text="дек"
            description="Месяц с задачами"
            type="month"
            color="yellow"
          />
          <LegendItem
            text="24"
            description="День с задачами"
            type="day"
            color="yellow"
          />
          <LegendItem
            text="25"
            description="Выходной или праздничный день"
            type="day"
            color="red"
          />
        </ul>
        <Button variant="contained" onClick={onClose}>
          Закрыть
        </Button>
      </div>
    </Modal>
  );
};

export default LegendModal;
