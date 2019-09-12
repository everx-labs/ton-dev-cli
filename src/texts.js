const texts = {
    agreementConfirmation: `
This Agreement takes effect when you input a “YES” and press Enter 
or, if earlier, when you use any of the TON DEV Software: `,
    agreementRejected: '\n\nLicense terms were not accepted.\n',
    agreementAccepted: '\n\nLicense terms were accepted.\n',
    dockerVersionRequired: "Docker version required ^17",
    containerDoesNotExists(name) {
        return `Container [${name}] does not exists. Creating...`;
    },
    done: ' Done.',
    imageDoesNotExists(name) {
        return `Image [${name}] is missing. Pulling (please wait)...`;
    },
    containerCanNotBeCreated(name) {
        return `Container [${name}] can not be created`;
    }
};

export {texts};
