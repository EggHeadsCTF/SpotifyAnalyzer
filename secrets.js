class secrets {
    constructor() {
        this.clientID = process.env.ID;
        this.clientSecret = process.env.SECRET;
        this.redirectURI = process.env.URI;
    }
}

module.exports.secrets = secrets;
