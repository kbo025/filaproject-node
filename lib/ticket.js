'use strict'

module.export = function(TicketModel) {
    function findById(id) {
        return TicketModel.findById(id)
    }

    return {
        findById
    }
}