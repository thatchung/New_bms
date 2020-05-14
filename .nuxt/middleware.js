const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['role'] = require('..\\middleware\\role.js')
middleware['role'] = middleware['role'].default || middleware['role']

export default middleware
