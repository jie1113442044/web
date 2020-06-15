let domainsFuc = (env) => {
  let domain, uri = location.href;
  if (uri.indexOf('jcylyj') > -1) {
    domain = 'http://www.jcylyj.icu:8080';
  } else {
    domain = 'http://localhost:8080';
  }
  // domain = 'http://localhost:8080';
  return {
    domain: domain,
  }
};
export default domainsFuc