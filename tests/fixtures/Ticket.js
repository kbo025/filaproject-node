'use stricy'

const ticket = {
	id: 1,
	uuid: 'ticket-a',
	number: 8,
	status: 0,
	createAd: new Date(),
	updatedAd: new Date()
}

const tickets = [
	ticket,
	extend(obj, {id: 2, uuid: 'ticket-b', number: 80, status: 0}),
	extend(obj, {id: 3, uuid: 'ticket-c', number: 180, status: 0}),
	extend(obj, {id: 4, uuid: 'ticket-d', number: 280, status: 1}),
	extend(obj, {id: 5, uuid: 'ticket-e', number: 380, status: 1}),
	extend(obj, {id: 6, uuid: 'ticket-f', number: 480, status: 0}),
	extend(obj, {id: 7, uuid: 'ticket-g', number: 580, status: 2}),
	extend(obj, {id: 8, uuid: 'ticket-h', number: 680, status: 2}),
	extend(obj, {id: 9, uuid: 'ticket-i', number: 780, status: 3}),
	extend(obj, {id: 10, uuid: 'ticket-j', number: 880, status: 4})
]

function extend (obj, values) {
	const clone = Object.assign({}, obj)
	return  Object.assign(clone, values)
}

module.exports = {
	single: ticket,
	all: tickets,
	connected: status => tickets.filter(a => a.status == status),
	byUuid: id => tickets.filter(a => a.uuid === id).shift(),
	byId: id => tickets.filter(a => a.id === id).shift()
}