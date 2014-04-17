/*jshint node:true, white:true, undef:true, maxlen:100 */

var fs = require('fs');

exports.fixture = function (name) {
	return fs.readFileSync(__dirname + '/../unit/fixtures/' + name).toString();
};
