'use stricy'

const admin = {
	id: 1,
	uuid: 'admin-a',
	name: 'admin Test 10',
	createAd: new Date(),
	updatedAd: new Date()
}

const admins = [
	admin,
	extend(obj, {id: 2, uuid: 'admin-e', name: 'admin Test 1'}),
	extend(obj, {id: 3, uuid: 'admin-b', name: 'admin Test 2'}),
	extend(obj, {id: 4, uuid: 'admin-c', name: 'admin Test 3'}),
	extend(obj, {id: 5, uuid: 'admin-d', name: 'admin Test 4'}),
	extend(obj, {id: 6, uuid: 'admin-f', name: 'admin Test 5'}),
	extend(obj, {id: 7, uuid: 'admin-g', name: 'admin Test 6'}),
	extend(obj, {id: 8, uuid: 'admin-h', name: 'admin Test 7'}),
	extend(obj, {id: 9, uuid: 'admin-i', name: 'admin Test 8'}),
	extend(obj, {id: 10, uuid: 'admin-j', name: 'admin Test 9'})
]

function extend (obj, values) {
	const clone = Object.assign({}, obj)
	return  Object.assign(clone, values)
}

module.exports = {
	single: admin,
	all: admins,
	byUuid: id => admins.filter(a => a.uuid === id).shift(),
	byId: id => admins.filter(a => a.id === id).shift()
}