const fs = require('fs/promises');
const path = require('path')

function calcDirSize(dir) {
	let sum = 0;
	sum += dir.files.reduce((partial_size, file) => partial_size + file.size, 0)
	if(dir.directories.length)
		sum += dir.directories.reduce((partial_sum, subDir) => partial_sum + calcDirSize(subDir), 0)
	return sum;
}


module.exports = async function readdir(dirPath) {
	const dir_absolute_path = path.resolve(
		process.cwd(),
		dirPath
	);

	const dir = {
		name: path.basename(dir_absolute_path),
		directories: [],
		files: []
	}

	const contentsNames = await fs.readdir(dir_absolute_path)
	for (const contentName of contentsNames) {
		const contentNamePath = path.resolve(dirPath, contentName);
		const contentStat = await fs.stat(contentNamePath);
		if (contentStat.isFile())
			dir.files.push({
				name: contentName,
				size: contentStat.size
			})
		else
			dir.directories.push(
				await readdir(path.resolve(dirPath, contentName))
			)
	}
	return {
		...dir,
		size: calcDirSize(dir)
	};
};
