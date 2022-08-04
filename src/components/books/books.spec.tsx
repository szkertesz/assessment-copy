import React from 'react';
import { render, screen } from '@testing-library/react';
import Books from './books';
import {  MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store, AnyAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);
let store: Store<any, AnyAction>;

beforeEach(() => {
    store = mockStore({
        books: {
            books: [
                {
                    id: 1,
                    title: "Harry Potter and the Philosopher's Stone",
                    author: 'J. K. Rowlingswsdfsdf',
                    description:
                        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday,",
                    reading: true,
                    read: false,
                },
            ],
            status: 'succeeded',
            error: null,
            filterOptions: {
                status: undefined,
            },
        },
    });
  });
describe('Books', () => {
    it('should render component', () => {
        const {container} = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Books />
                </MemoryRouter>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });
    it('should render one component', () => {
        const {container} = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Books />
                </MemoryRouter>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });
});
