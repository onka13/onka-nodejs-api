/* eslint-disable */
const fs = require('fs');
const path = require('path');
var baseDir = '../src/api/routes/';

var apis = '//Generated file! Use command to update: "yarn run fixRoutes"\n' + 'export default {\n\t';
var folders = fs.readdirSync(baseDir).filter(x => x.indexOf('.') == -1);
for (let i = 0; i < folders.length; i++) {
	const folder = folders[i];
	var files = fs
		.readdirSync(baseDir + path.sep + folder)
		.map(x => path.parse(x))
		.filter(x => x.ext == '.ts');
	apis +=
		folder +
		': {\n' +
		files
			.map(x => {
				return `\t\t${x.name}: require("./${folder}/${x.name}").default,`;
			})
			.join('\n') +
		'\n\t},\n\t';
}

apis += '\n}';

fs.writeFileSync(baseDir + '/index.ts', apis);

console.log(apis);
