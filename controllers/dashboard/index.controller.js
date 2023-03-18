const renderPageDashboard = async (req, res) => {
    res.render('dashboard', {
        layout: 'layouts/layout2',
        active: 'dashboard',
    })
}

module.exports = {
    renderPageDashboard
}