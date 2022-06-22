const pkg = require("./lerna.json");

module.exports = {
    root: "./nibiru-book",
    title: "Nibiru Chain Documentation",

    // Enforce use of HonKit v3
    gitbook: "3.1.1",
    variables: {
        version: pkg.version,
    },
};
