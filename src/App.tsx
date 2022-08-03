import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Container from './components/ui/container';
import Books from './components/books';
import NewBook from './components/new-book';
import NotFound from './components/not-found';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Container />}>
                    <Route index element={<Books />} />
                    <Route path='books' element={<Books />} />
                    {/*<Route path='edit/:id' element={<EditBook />} /> */}
                    <Route path='books/new' element={<NewBook />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
