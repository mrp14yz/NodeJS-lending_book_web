const User = require('../../models/user')
const Borrow_Book = require('../../models/borrow_book')
const Book = require('../../models/book')

const renderPageProfile = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ['name', 'email', 'photo', 'phone', 'address'],
        include: [
            { 
                model: Borrow_Book, 
                attributes: ['due', 'status', 'isLate', 'createdAt'],
                include: [
                    { model: Book, attributes: ['slug', 'title'] }
                ]
            }
        ]
    })

    res.render('pages/user', {
        data : user
    })
}

const editProfile = async (req, res) => {

}

module.exports = {
    renderPageProfile,
    editProfile
}