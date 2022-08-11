import { Link } from 'react-router-dom'
import Container from 'components/ui/container'

const NotFound = () => {
    return (
        <Container>
            <header>
                <h1>404 Page Not Found</h1>
            </header>
            <main>
                <p>
                    Maybe you should navigate to the{' '}
                    <Link to="/books">Reading List page</Link>
                </p>
            </main>
        </Container>
    )
}

export default NotFound
