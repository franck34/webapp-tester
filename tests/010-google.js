const https = require('https');
const tap = require('../tap');

const url = 'https://google.fr';
const expectedStatusCode = 301;
const expectedLocation = 'https://www.google.fr/';

function run() {
    tap.test(
        url,
        { timeout:2000 },
        test => {
            https.get(url, (resp) => {
                let data = '';

                // Concatenate chunked data received
                resp.on('data', (chunk) => { data += chunk; });

                // The whole response has been received. Start the test
                resp.on('end', () => {
                    test.deepEqual(resp.statusCode, expectedStatusCode, `should return ${expectedStatusCode}`);
                    test.deepEqual(resp.headers.location, expectedLocation, `should return ${expectedLocation}`);
                    test.end();
                });
            }).on('error', (err) => {
                console.log('Error: ' + err.message);
            });
        }
    );
}

module.exports = { run };
