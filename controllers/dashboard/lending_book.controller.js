const Burrow_Book = require('../../models/borrow_book')
const User = require('../../models/user')
const Book = require('../../models/book')

const renderPageLendingBook = (req, res) => {
    res.render('dashboard/lending_book', {
        layout: 'layouts/layout2',
        active: 'lending_book',
    })
}

const getAllLendingBook = async (req, res) => {
    const lend_record = await Burrow_Book.findAll({
        include: [
            { 
                model: User,
                attributes: ['id', 'name']
            },
            {
                model: Book,
                attributes: ['id', 'title'],
            }
        ]
    })

    res.json({
        data: lend_record
    })
}

const editStatusLendingBook = async (req, res) => {
    await Burrow_Book.update(req.body, {
        where:{
            id: req.params.id
        }
    })

    res.json({
        status: 'Berhasil Mengubah status peminjaman buku'
    })
}

module.exports = {
    renderPageLendingBook,
    getAllLendingBook,
    editStatusLendingBook   
}