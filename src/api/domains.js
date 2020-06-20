let domainsFuc = (env) => {
  let domain, uri = location.href;
  // if (uri.indexOf('jcylyj') > -1) {
  //   domain = 'http://www.jcylyj.icu:8088';
  // }else
  console.log(uri)
  if(uri.indexOf('238') > -1){
    domain = 'http://49.234.238.119:8088';
  }
  else if(uri.indexOf('jcylyj') > -1){
    domain = 'http://www.jcylyj.icu:8088';
  }
  else {
    domain = 'http://localhost:8088';
  }
  
  // domain = 'http://49.234.238.119:8088/';
  return {
    domain: domain,
  }
};
export default domainsFuc