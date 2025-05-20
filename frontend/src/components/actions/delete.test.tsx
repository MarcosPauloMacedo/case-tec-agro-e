import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DeleteAction } from './delete';

describe('DeleteAction', () => {
  it('deve chamar a função onClick ao clicar no ícone', () => {
    const onClickMock = jest.fn();
    const { container } = render(<DeleteAction onClick={onClickMock} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    if (icon) {
      fireEvent.click(icon);
    }
    expect(onClickMock).toHaveBeenCalled();
  });
});
