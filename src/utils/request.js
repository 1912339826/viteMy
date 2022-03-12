import axios from 'axios'


axios.defaults.timeout = 60000;
// axios.defaults.withCredentials = true


// request拦截器
axios.interceptors.request.use(config => {
  // let data = config.data || config.params;
  // config.headers['access-control-allow-origin'] = "*"
  // config.headers['X-Requested-With'] = "XMLHttpRequest";
  // config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/x-www-form-urlencoded;charset=UTF-8';
  // config.headers['X-Client-HashID'] = "96lx83zx7o4ykw5m" //
  config.headers['isDev'] = 1;
  config.headers['org'] = 2;
  if (config.method == 'post') {
    // application/x-www-form-urlencoded
    config.headers['Content-Type'] = "application/json;charset=UTF-8"
    config.headers['Accept'] = "*/*"
  } else {
    // config.data = (config.method === 'post' || config.method === 'put') ? qs.stringify(data) : null;
    config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/x-www-form-urlencoded;charset=UTF-8';
  }
  return config
}, error => {
  Promise.reject(error)
})


const errorHandle = (status, errdata) => {
  const {
    data
  } = errdata
  console.log(data, "errdata")
  if (data.errmsg) console.log('error', data.errmsg) //提示
  switch (status) {
    case 400:
      break;
    case 401:
      break;
    case 403:
      break;
    case 404:
      console.log('error', '请求的资源不存在') //提示
      break;

  }
}

// respone拦截器
axios.interceptors.response.use(
  response => {
    console.log(response, "responseCode")
    if (response.status == 200) { // 成功处理
      return response.data
      // if (response.data.errcode == 0) {
      //   return response.data.data
      // } else {
      //   // 失败要返回处理的
      //   if (response.data.errcode == 11002) {
      //     console.log(response.data.data) //提示
      //     return response.data
      //   } else {
      //     console.log(response.data.data) //提示
      //     return false
      //   }
      // }
    } else { // 错误处理/
      console.log('error', '服务器开小差了~稍后重试') //提示
      return Promise.reject('error')
    }
  },
  error => {
    const {
      response
    } = error

    console.log(response, "error response")
    if (response) {
      errorHandle(response.status, response)
      return Promise.reject(response)
    }
    // errorHandle(error.request.status, error)
  }

);

/**
 * 向url后追加参数 ?name=value&name1=value1
 * 后台只需要用 GetMapping 注解即可，参数上不需要加注解
 * */
/**
 * 向url后追加参数 ?name=value&name1=value1
 * 后台只需要用 GetMapping 注解即可，参数上不需要加注解
 * */
/**
 * post
 * 表单参数是在请求体中，也是name=value&name1=value1的形式在请求体中，
 * 后台只需要用 PostMapping 注解即可，参数上不需要加注解
 * @param url  字符串类型
 * @param data  json类型
 * */
/**
 * 表单参数是在请求体中，也是name=value&name1=value1的形式在请求体中，
 * 后台只需要用 PostMapping 注解即可，参数上不需要加注解
 * @param url  字符串类型
 * @param data  json类型
 * */
/**
 * 参数以json格式传给后， {name:'li',code:'001'}
 * 1. 后台需要用 PostMapping 注解
 * 2. 后台必须是一个参数
 * 3. 参数上必须增加 RequestBody 注解
 * @param url  字符串类型
 * @param data  json类型
 * */

export function singleReq(url, data) {
  console.log(url, data, "singleReq")
  if (!url) throw new Error("请求的url为空");
  let param = url.match(/:[a-zA-Z]+/g);
  if (param) {
    param.forEach(ele => {
      let attr = ele.substr(1);
      url = url.replace(ele, data[attr]);
      delete data[attr];
    });
  }
  let method = url.match(/^(PUT|DELETE|GET|POST|UPLOAD)\s/);
  if (method) {
    url = url.replace(method[0], "");
    method = method[0].trim();
  } else {
    method = "GET";
  }
  console.log(data)
  switch (method.toLowerCase()) {
    case "delete":
      return axios.delete(url, {
        params: data
      });
    case "post":
      return axios.post(url, null, {
        params: data
      });
    case "upload":
      return axios({
        url: url,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: data
      })
    case "put":
      return axios.put(url, data);
    case "patch":
      return axios.patch(url, data);
    default:
      console.log(url, data, "singleReqGET")

      return axios({
        url: url,
        method: 'get',
        params: data
      });
  }
}


/**
 * params urls [] 多个请求的集合
 */
export function multipleReq(options) {
  let arr = [],
    keys = []
  for (let key in options) {
    keys.push(key)
    arr.push(options[key])
  }
  return axios.all(arr).then(
    axios.spread(function () {
      let result = {};
      for (let i = 0; i < arguments.length; i++) {
        let item = arguments[i];
        if (item) {
          if (item.data && item.data.data) {
            result[keys[i]] = item.data.data;
          } else {
            result[keys[i]] = item;
          }
        }
      }
      return result;
    })
  );
}