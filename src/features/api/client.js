// A wrapper around fetch(), based on
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
// with simplifications

export async function client(endpoint, { body, ...customConfig } = {}) {
    const config = {
        ...customConfig,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    let data
    try {
        const response = await window.fetch(endpoint, config)
        data = await response.json()
        if (response.ok) {
            // Return a result object similar to Axios
            return {
                status: response.status,
                data,
                headers: response.headers,
                url: response.url,
            }
        }
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = function (endpoint) {
    return client(endpoint, { method: 'GET' })
}

client.post = function (endpoint, body) {
    return client(endpoint, { body, method: 'POST' })
}
client.put = function (endpoint, body) {
    return client(endpoint, { body, method: 'PUT' })
}
client.delete = function (endpoint) {
    return client(endpoint, { method: 'DELETE' })
}