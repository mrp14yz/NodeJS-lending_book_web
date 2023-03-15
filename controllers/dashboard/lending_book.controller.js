
const renderPageLendingBook = (req, res) => {
    res.render('dashboard/lending_book', {
        layout: 'layouts/layout2',
        active: 'lending_book',
    })
}

const getAllLendingBook = async (req, res) => {

}

const editStatusLendingBook = async (req, res) => {

}

module.exports = {
    renderPageLendingBook,
    getAllLendingBook,
    
}