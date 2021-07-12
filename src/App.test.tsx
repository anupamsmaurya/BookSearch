import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const store = configureStore();

test('renders table and search', () => {
  render(<Provider store={store}><App /></Provider>);
  const tableHeader = screen.getByText(/Title/i);
  expect(tableHeader).toBeInTheDocument();

  const searchButton = screen.getByRole('button', { name: 'Search' })
  expect(searchButton).toBeInTheDocument();
});

test('fetches table rows on load', async () => {
  render(<Provider store={store}><App /></Provider>);
  await screen.findByTestId('1')
});

test('fetches table data on search input', async () => {
  render(<Provider store={store}><App /></Provider>);
  const inputNode = screen.getByPlaceholderText('Enter search term')
  const searchButton = screen.getByRole('button', { name: 'Search' })

  userEvent.type(inputNode, 'dan brown')
  expect(inputNode).toHaveValue('dan brown')

  fireEvent.click(searchButton)
  await screen.findByTestId('1')

});
