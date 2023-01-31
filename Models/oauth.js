const mongoose = require('mongoose')


let OAuthAccessTokenModel = mongoose.model('OAuthAccessToken', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'OAuthClient' },
    accessToken: { type: String },
    accessTokenExpiresAt: { type: Date },
    refreshToken: { type: String },
    refreshTokenExpiresAt: { type: Date },
    scope: { type: String }
}, {
    timestamps: true
}), 'oauth_access_tokens');

let OAuthCodeModel = mongoose.model('OAuthCode', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'OAuthClient' },
    authorizationCode: { type: String },
    expiresAt: { type: Date },
    scope: { type: String }
}, {
    timestamps: true
}), 'oauth_auth_codes');

let OAuthClientModel = mongoose.model('OAuthClient', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUris: { type: Array },
    grants: { type: Array },
}, {
    timestamps: true
}), 'oauth_clients');


module.exports = {OAuthAccessTokenModel, OAuthCodeModel,  OAuthClientModel }
