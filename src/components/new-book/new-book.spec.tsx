import { render, screen, waitFor } from '@testing-library/react'
import NewBook from './new-book'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import thunk from 'redux-thunk'

const mockStore = configureStore([thunk])
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
        const user = userEvent.setup()
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

        await user.type(screen.getByLabelText(/Title*/), 'Test Title')
        await user.type(
            screen.getByRole('textbox', { name: 'Author*' }),
            'Test Author'
        )
        const textarea = screen.getByLabelText(
            /Description/i
        ) as HTMLTextAreaElement
        // textarea.focus()
        await userEvent.type(textarea, 'Test')
        // expect(textarea.value).toBe('Test')
        expect(textarea).toHaveValue('Test')

        const submitButton = await screen.findByRole('button', {
            name: 'Submit',
        })
        await user.click(submitButton)
        const actions = await store.getActions()
        console.log('actions: ', actions)
        expect(actions).toHaveLength(2)
        // expect(await screen.getByText(/Add new book/i)).toBeInTheDocument()
        // const warning = await screen.getByText('Author is required')
        // expect(warning).toBeInTheDocument()
        // await waitFor(() => {
        //     expect(screen.getByText('Author is required')).toBeInTheDocument()
        // })
    })
})
