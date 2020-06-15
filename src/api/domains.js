let domainsFuc = (env) => {
  let domain, uri = location.href;
  // if (uri.indexOf('zhdtnet') > -1) {
  //   domain = 'https://manage.i31.com/elevator/maintain';
  // } else {
  //   domain = 'https://test.i31.com/elevator/maintain';
  // }
  // domain = 'http://192.168.1.101:8081/elevator/maintain';
  // domain = 'http://192.168.1.113:8081/elevator/maintain'; // 云飞本地
  domain = 'http://localhost:8080';
  return {
    domain: domain,
  }
};
export default domainsFuc