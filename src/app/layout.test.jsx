import { render } from '@testing-library/react';
import Layout from './layout';

describe('Layout', () => {
  it('should show background for login page', () => {
    const { container } = render(<Layout pathname="/login" />);
    expect(container.querySelector('.background')).toBeInTheDocument();
  });

  it('should show background for register page', () => {
    const { container } = render(<Layout pathname="/register" />);
    expect(container.querySelector('.background')).toBeInTheDocument();
  });

  it('should not show background for other pages', () => {
    const { container } = render(<Layout pathname="/dashboard" />);
    expect(container.querySelector('.background')).not.toBeInTheDocument();
  });
});