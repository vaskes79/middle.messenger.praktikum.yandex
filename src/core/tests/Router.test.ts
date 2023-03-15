import { expect } from 'chai';
import { JSDOM } from 'jsdom';

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" type="image/svg+xml" href="/ypr.svg" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YPR messenger</title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
`;

describe('Router', () => {
  const dom = new JSDOM(html, {
    url: 'http://locahost/'
  });

  describe('Init Router', () => {
    it('path should equal /signin', () => {
      expect(dom.window.location.pathname).to.equal('/');
    });
  });
});
