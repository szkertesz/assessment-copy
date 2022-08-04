import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookItem from './book-item';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);
let store: any;

beforeEach(() => {
    store = mockStore({
        books: {
            books: [],
            status: 'succeeded',
            error: null,
            filterOptions: {
                status: 'reading',
            },
        },
    });
});
describe('BookItem', () => {
    it('should render component', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <BookItem
                        bookInfo={{
                            id: 1,
                            title: "Harry Potter and the Philosopher's Stone",
                            author: 'J. K. Rowlingswsdfsdf',
                            description:
                                "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday,",
                            reading: true,
                            read: false,
                        }}
                    />
                </MemoryRouter>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });
    it('should display loading message after status is changed', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <BookItem
                        bookInfo={{
                            id: 1,
                            title: "Harry Potter and the Philosopher's Stone",
                            author: 'J. K. Rowlingswsdfsdf',
                            description:
                                "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday,",
                            reading: true,
                            read: false,
                        }}
                    />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText(/Harry Potter/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('radio', {name: 'Read'}));
        expect(await screen.findByText(/Loading.../)).toBeInTheDocument();
    });
});
