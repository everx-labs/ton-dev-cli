const path = require('path');
const os = require('os');

const config = {
    localNode: {
        // image: 'tonlabs/local-node:0.11.0',
        image: 'tonlabs/startup-edition-node:release-candidate',
        container: 'tonlabs-local-node',
    },
    compilerKit: {
        // image: 'tonlabs/compiler-kit:0.11.0',
        image: 'tonlabs/compiler-kit:v0.10.0',
        container: 'tonlabs-compiler-kit',
        mountSource: path.join(os.homedir(), '.tonlabs', 'compiler-kit', 'projects'),
        mountDestination: '/projects',

    }
};

export default config;


