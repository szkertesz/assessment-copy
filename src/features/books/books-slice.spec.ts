import reducer, { BooksState, initialState, selectBookById, setStatusFilter } from './books-slice'

describe('booksSlice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({
            books: [],
            status: 'idle',
            error: null,
            filterOptions: {
                status: undefined,
            },
        });
    });
    it('should set the status filter to the \'read\' option', () => {
        const previousState = initialState;
        expect(reducer(previousState, setStatusFilter('read'))).toEqual({
            books: [],
            status: 'idle',
            error: null,
            filterOptions: {
                status: 'read',
            },
        });
    });
    it('should select the book w/ the id of 2', () => {
        const currentState = {
            books: {
                books: [
                    {
                        id: 1,
                        title: "Harry Potter and the Philosopher's Stone",
                        author: 'J. K. Rowlingswsdfsdf',
                        description:
                            "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday,",
                        reading: false,
                        read: true,
                    },
                    {
                        id: 2,
                        title: 'Foundation',
                        author: 'Isaac Asimov',
                        description: '',
                        reading: true,
                        read: false,
                    },
                ],
                status: 'idle',
                error: null,
                filterOptions: {
                    status: undefined,
                }
            }
        }

        expect(selectBookById(currentState, 2)).toEqual(
            {
                id: 2,
                title: 'Foundation',
                author: 'Isaac Asimov',
                description: '',
                reading: true,
                read: false,
            }
        );
    });
});