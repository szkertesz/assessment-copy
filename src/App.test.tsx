import React from 'react';
import { screen, render, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

it('Should render the main container element', () => {
  render(
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  );

  expect(screen.getByTestId('container')).toBeInTheDocument();
});
