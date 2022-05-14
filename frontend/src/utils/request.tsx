import { SERVER_URL } from '@/config/constants';

/*
interface Options extends Object {
    headers: object;
}
*/


export function url(uri: string, queryParams: object | null = null) {
  const baseUrl = `${SERVER_URL}${uri}`;
  console.log("Base url: ", baseUrl)
    return queryParams
    ? `${baseUrl}?${JSON.stringify(queryParams)}`
    : baseUrl
}


export async function get(url: string, options: object = {}) {
    const defaults = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };
    return await request(url, _mergeOptions(defaults, options))
  }


export async function post(url: string, data: Object, options = {}) {
    const defaults = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
    return await request(url, _mergeOptions(defaults, options))
  }


  export async function put(url: string, data: Object, options = {}) {
    return await post(url, data, _setMethod(options, 'PUT'))
  }
  
  export async function patch(url: string, data: Object, options = {}) {
    return await post(url, data, _setMethod(options, 'PATCH'))
  }
  
  export async function delete_(url: string, options = {}) {
    return await get(url, _setMethod(options, 'DELETE'))
  }
/*
export async function request(url: string, options: object) {
    return await fetch(url, options);
}
*/

export function request(url: string, options: object) {
  console.log(url)
  return fetch(url, options)
    .then(_checkStatusAndParseJSON)
    .catch((e) => {
      return new Promise((_, reject) => {
        if (e.response) {
          reject(e)
        } else {
          // should only end up here if the backend has gone away
          e.response = {
            status: -1,
            statusText: e.message,
            error: e.message,
          }
          reject(e)
        }
      })
    })
}

function _setMethod(options: Object, method: Object) {
  return Object.assign({}, options, { method })
}

function _checkStatusAndParseJSON(response: any) {
  return new Promise((resolve, reject) => {
    response.json()
      // response with json body
      // @ts-ignore
      .then((json) => {
        if (_checkStatus(response)) {
          // success response with json body
          resolve(json)
        } else {
          // error response with json error message
          reject(_responseError(response, json))
        }
      })
      // response with no body (response.json() raises SyntaxError)
      .catch(() => {
        if (_checkStatus(response)) {
          // success response with no body (most likely HTTP 204: No Content)
          resolve(null)
        } else {
          // error response, create generic error message from HTTP status
          reject(_responseError(response, { error: response.statusText }))
        }
      })
  })
}


function _checkStatus(response: any) {
  return response.status >= 200 && response.status < 300
}

function _responseError(response: any, json: any) {
  //const error = new Error(response.statusText)
  const error = new Error("Error")
  // @ts-ignore
  const responseIt = Object.assign({
    status: response.status,
    statusText: response.statusText,
  }, json)
  return {response: responseIt}
}

function _mergeOptions(defaults: Object, options: Object) {
    return Object.assign({}, defaults, {
      ...options,
      headers: {
        // @ts-ignore
        ...defaults.headers,
        // @ts-ignore
        ...options.headers,
      }
    })
  }