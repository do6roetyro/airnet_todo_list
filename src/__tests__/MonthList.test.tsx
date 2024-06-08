import React from "react";
import { render, screen, fireEvent } from "../test_utils/test-utils";
import MonthList from "../components/Calendar/MonthList";
import { mockTasksByMonth } from "../test_utils/mocks.js";

describe("MonthList", () => {
  it("рендер списка месяцев и переключение между ними", () => {
    const handleSelectMonth = jest.fn();

    render(
      <MonthList
        currentMonth={0}
        onSelectMonth={handleSelectMonth}
        tasksByMonth={mockTasksByMonth}
      />
    );

    expect(screen.getByText("янв")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("март"));
    expect(handleSelectMonth).toHaveBeenCalledWith(2);
  });
});
