const fs = require('fs/promises');
const path = require('path')
module.exports = async (dirPath) => {
	const dir_absolute_path = path.resolve(
		process.cwd(),
		dirPath
	);
	
	const dir = {
		name: path.basename(dir_absolute_path),
		directories:[],
		files:[]
	}

	const contentsNames = await fs.readdir(dir_absolute_path)
	for(const contentName of contentsNames) {
		const contentNamePath = path.resolve(dirPath, contentName);
		const contentStat = await fs.stat(contentNamePath);
		if(contentStat.isFile()) {
			dir.files.push({
				name: contentName,
				size: contentStat.size
			})
			continue
		} 
		dir.directories.push(
			await readdir(path.resolve(dirPath, contentName))
		)
	}
	return dir;
};
