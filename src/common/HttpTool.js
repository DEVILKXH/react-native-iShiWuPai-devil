import Storage from  '../store/MyStorage'

const delay = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('请求超时'), timeout * 1000)
    })
}

const get = ({url, params = {}, timeout}) => {
    const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    const urlStr = `${url}?${paramArr.join('&')}`

    if (timeout === undefined) {
        return fetch(urlStr)
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)])
    }
}

const post = ({url, params = {}, timeout}) => {
    let formData = new FormData()
    let token = null;
    Storage.load('data',data => token = data.token)
    formData.append('token',token)
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.append(`${key}`,`${params[key]}`)
        }
    }
    let options = {
        method: 'POST',
        headers: {},
        body: formData
    }
    return fetch(url,options)
}

export { get,post }