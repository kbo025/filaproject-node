'use strict'

module.export = function(AdminModel) {
    function findById(id) {
        return AdminModel.findById(id)
    }

    return {
        findById
    }
}