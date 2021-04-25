const readdir = require('./lib/readdir.js')
const formatBytes = require('./lib/formatBytes.js')



function showdir(dir, spaces = 0) {
	const TAB = ' '.repeat(spaces)
	let result = TAB + `${dir.name}\n`

	dir.directories.forEach(subDir => {
		result += showdir(subDir, spaces + 4)
	})

	dir.files.forEach(file => {
		result += ' '.repeat(spaces + 4) + `${file.name} ${formatBytes(file.size)} \n`
	})
	return result;
}

async function main() {
	console.clear()
	console.log("Loading...")
	const dirPath = process.argv[2] || './'
	const dir = await readdir(dirPath);
	console.clear()
	console.log(showdir(dir))
}

main()
