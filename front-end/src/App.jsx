import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import AddBook from "./pages/AddBook.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import EditBook from "./pages/EditBook.jsx";
 
const App = () => {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/edit/:id" element={<EditBook />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
