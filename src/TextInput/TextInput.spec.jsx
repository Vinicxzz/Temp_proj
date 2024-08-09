import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    const searchValue = 'testando';
    render(<TextInput handleChange={fn} searchValue={searchValue} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe(searchValue);
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
    expect(fn).toHaveBeenCalledWith(value); // Add this line
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} />);
    expect(container).toMatchSnapshot();
  });

  it('should not throw an error if handleChange is not provided', () => {
    expect(() => render(<TextInput />)).not.toThrow();
  });

  it('should not throw an error if searchValue is not a string', () => {
    expect(() => render(<TextInput searchValue={123} />)).not.toThrow();
  });
});