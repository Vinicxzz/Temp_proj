import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react'; // Import act from react
import { Button } from '.'; // Adjust the import path if necessary

describe('<Button />', () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text="Load More" />);

    const button = screen.getByRole('button', { name: /Load More/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', async () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);

    const button = screen.getByRole('button', { name: /Load More/i });

    // Simulate user click event
    await act(async () => {
      await userEvent.click(button);
    });

    // Ensure the function is called once
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    render(<Button text="Load More" disabled={true} />);

    const button = screen.getByRole('button', { name: /Load More/i });

    // Check if the button is disabled
    expect(button).toBeDisabled();
  });
});
