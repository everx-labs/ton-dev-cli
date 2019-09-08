const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString()).version;
const root = process.cwd();

function showUsage(usage) {
    console.log(`TON Labs Dev Tools ${version}`);
    console.log(usage);
}

const spawnEnv = {
    ...process.env,
};

function run(name, ...args) {
    return new Promise((resolve, reject) => {
        try {
            const spawned = spawn(name, args, { env: spawnEnv });
            const errors = [];
            const output = [];

            spawned.stdout.on('data', function (data) {
                output.push(data.toString());
            });

            spawned.stderr.on('data', (data) => {
                errors.push(data.toString());
            });

            spawned.on('error', (err) => {
                reject(err);
            });

            spawned.on('close', (code) => {
                if (code === 0) {
                    resolve(output.join(''));
                } else {
                    reject(errors.join(''));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function versionToNumber(s) {
    const parts = `${s || ''}`.split('.').map(x => Number.parseInt(x)).slice(0, 3);
    while (parts.length < 3) {
        parts.push(0);
    }
    return parts[0] * 1000000 + parts[1] * 1000 + parts[2];
}

function forceRmDir(dir) {
    fs.readdirSync(dir).forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (itemPath === "." || itemPath === "..") {
        } else if (stat.isDirectory()) {
            forceRmDir(itemPath);
        } else {
            fs.unlinkSync(itemPath);
        }
    });
    fs.rmdirSync(dir);
}

function ensureCleanDirectory(path) {
    if (fs.existsSync(path)) {
        forceRmDir(path);
    }
    fs.mkdirSync(path, { recursive: true });
}

function findOptionName(arg, types) {
    if (arg.startsWith('--')) {
        const name = arg.substr(2);
        const optionName = Object.keys(types).find(x => x.toLowerCase() === name.toLowerCase());
        if (!optionName) {
            throw `Invalid option: ${arg}`;
        }
        return optionName;
    }
    if (arg.startsWith('-')) {
        const name = arg.substr(1);
        const optionEntry = Object.entries(types).find(([_, type]) => `${type.short || ''}`.toLowerCase() === name.toLowerCase());
        if (!optionEntry) {
            throw `Invalid option: ${arg}`;
        }
        return optionEntry[0];
    }
    return null;
}

function argsToOptions(args, types) {
    const options = {
        files: [],
    };
    Object.entries(types).forEach(([name, type]) => {
        if ((type.valueCount || 0) > 1) {
            options[name] = [];
        } else {
            options[name] = type.def;
        }
    });
    let pendingOption = null;
    args.forEach((arg) => {
        if (pendingOption) {
            const type = types[pendingOption];
            if ((type.valueCount || 0) > 1) {
                options[pendingOption].push(arg);
            } else {
                options[pendingOption] = arg;
            }
            pendingOption = null;
        } else {
            const optionName = findOptionName(arg, types);
            if (optionName) {
                const type = types[optionName];
                if ((type.valueCount || 0) > 0) {
                    pendingOption = optionName;
                } else {
                    options[optionName] = true;
                }
            } else {
                options.files.push(arg);
            }
        }
    });
    return options;
}

function rootPath(...items) {
    return path.join(root, ...items);
}

export {
    version,
    showUsage,
    run,
    versionToNumber,
    forceRmDir,
    ensureCleanDirectory,
    argsToOptions,
    rootPath,
}
