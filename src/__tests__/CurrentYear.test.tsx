import React from 'react';
import { render, screen, fireEvent } from '../test_utils/test-utils';
import CurrentYear from '../components/Calendar/CurrentYear/CurrentYear';

describe('CurrentYear', () => {
  it('рендер текущего года и переключение по стрелкам', () => {
    const handlePrev = jest.fn();
    const handleNext = jest.fn();

    render(<CurrentYear year={2024} onPrev={handlePrev} onNext={handleNext} />);

    expect(screen.getByText('2024')).toBeInTheDocument();

    fireEvent.click(screen.getByText('⟵'));
    expect(handlePrev).toHaveBeenCalled();

    fireEvent.click(screen.getByText('⟶'));
    expect(handleNext).toHaveBeenCalled();
  });
});