/*global describe,it*/
'use strict';

require('shelljs/global');
var assert = require('assert')
    , nodeEmbeddedMongodb = require('../lib/node-embedded-mongodb.js')
    , mongoose = require('mongoose')
    , path = require('path');

var localMongoDbLogPath = path.join(process.cwd(), 'embeddedMongoDb', 'log');
var localMongoDbPath = path.join(process.cwd(), 'embeddedMongoDb', 'data', 'db');

describe('embedded mongodb tests', function () {

    nodeEmbeddedMongodb.silentMode(true);

    var port = 27018;
    it('must start if asked for', function (done) {
        
        nodeEmbeddedMongodb.start(null, null, port, function (err, res) {
            assert.ifError(err);

            mongoose.connect('mongodb://localhost:27017', null, function (connectMongooseError) {
                assert.ifError(connectMongooseError);
                assert.strictEqual(mongoose.connection.readyState, 1);
                done();
            });
        });
    });

    it('must stop if asked for', function (done) {

        nodeEmbeddedMongodb.stop(port, false, function (err, res) {
            mongoose.connection.close();

            mongoose.connect('mongodb://localhost:27017', null, function (connectMongooseError) {

                assert.equal(connectMongooseError, undefined);
                done();
            });
        });
    });
});
