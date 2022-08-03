import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';
import { IBookItem } from '../../components/book-item/book-item.interface';
import { RootState } from '../../app/store';

interface BooksState {
    books: IBookItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    filterOptions: {
        status: 'reading' | 'read' | undefined;
    };
}
const initialState: BooksState = {
    books: [],
    status: 'idle',
    error: null,
    filterOptions: {
        status: undefined
    }
}

type BookToAdd = Omit<IBookItem, 'id'>;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await client.get('http://localhost:3004/books');
    return response.data;
});

export const addBook = createAsyncThunk(
    'books/addBook',
    async (newBookData: BookToAdd, { rejectWithValue }) => {
        try {
            const response = await client.post(
                'http://localhost:3004/books',
                newBookData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (bookId: number, { rejectWithValue }) => {
        try {
            const response = await client.delete(
                `http://localhost:3004/books/${bookId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const editBook = createAsyncThunk(
    'books/editBook',
    async (newBookData: IBookItem, { rejectWithValue }) => {
        try {
            const response = await client.put(
                `http://localhost:3004/books/${newBookData.id}`,
                newBookData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setStatusFilter: (state, action) => {
            state.filterOptions.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBooks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = state.books.concat(action.payload);
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter(
                    (book) => book.id !== action.payload.id
                );
            })
            .addCase(editBook.fulfilled, (state, action) => {
                const index = state.books.findIndex(
                    (book) => book.id === action.payload.id
                );
                state.books[index] = action.payload;
            });
    }
})

export const { setStatusFilter } = booksSlice.actions

export default booksSlice.reducer

export const selectBookById = (state: RootState, bookId: number) =>
    state.books.books.find(book => book.id === bookId);