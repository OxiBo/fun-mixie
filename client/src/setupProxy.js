// https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/12072146#content

const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy(['/api', '/auth/facebook', '/auth/twitter', '/auth/instagram'], {
      target: 'http://localhost:4070',
    }) // server localhost port
  );
};
// const { createProxyMiddleware } = require("http-proxy-middleware");
// module.exports = (app) => {
//   app.use(
//     ["/api", "/auth/facebook", "/auth/twitter"],
//     createProxyMiddleware({
//       target: "http://localhost:4070",
//       changeOrigin: true,
//     })
//   );
// };

// or
/* 

const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
};
*/
