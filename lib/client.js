'use strict'

module.export = function(ClientModel) {
    function findById(id) {
        return ClientModel.findById(id)
    }

    return {
        findById
    }
}