import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Browser } from '@sheetbase/testing';

import * as App from '../src/index';

const browser = new Browser(App);

describe('Home routes', () => {

    it('GET /', () => {
        const { body } = browser.get('/');
        expect(body).to.contain('Sheetbase Backend');
    });

    it('POST /', () => {
        const { body } = browser.post('/');
        expect(body.data).to.eql({ title: 'Sheetbase Backend' });
    });

});
