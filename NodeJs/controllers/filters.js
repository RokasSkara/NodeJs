const filters = {
    sortBy: 'id',
    order: 'ASC',
}

let checkFilters = (req) =>{
    req.order === 'ASC' ? filters.order = 'ASC' : filters.order = 'DESC';
    req.sortBy === 'id' ? filters.sortBy = 'id' : req.sortBy === 'title' ? filters.sortBy = 'title' : filters.sortBy = 'content';
}

export default filters
export { checkFilters }