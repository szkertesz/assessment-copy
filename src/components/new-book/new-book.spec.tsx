import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import NewBook from './new-book'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const mockStore = configureStore([])
let store: any

beforeEach(() => {
    store = mockStore({
        books: {
            books: [],
            status: 'idle',
            error: null,
            filterOptions: {
                status: undefined,
            },
        },
    })
})
describe('NewBook', () => {
    it('should render component', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <NewBook />
                </MemoryRouter>
            </Provider>
        )
        expect(container).toMatchSnapshot()
    })
    it('should render component', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NewBook />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByLabelText(/Title*/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Author*/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()

        fireEvent.change(screen.getByRole('textbox', { name: 'Title*' }), {
            target: { value: 'Test Title' },
        })
        fireEvent.change(screen.getByRole('textbox', { name: 'Author*' }), {
            target: { value: 'Test Author' },
        })
        screen.debug()
        userEvent.click(await screen.findByRole('button', { name: 'Submit' }))
        await waitFor(() => {
            const actions = store.getActions()
            console.log(actions)
            // expect(actions).toHaveLength(2);
        })
    })
})
