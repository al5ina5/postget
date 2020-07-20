import { useState, useEffect } from 'react'

export const parseHeaders = (string) => {
    var headers = {}
    try {
        var headerLines = string.split('\n')
        for (var i in headerLines) {
            if (headerLines[i].trim() == '') continue
            var key = headerLines[i].substr(0, headerLines[i].indexOf(':')).trim()
            var value = headerLines[i].substr(headerLines[i].indexOf(':') + 1).trim()

            headers[key] = value
        }
        return headers
    } catch (e) {
        return null
        console.warn('Error parsing request headers.')
        console.log(e)
    }
}


export const parseData = (string) => {
    try {
        return JSON.parse(string)
    } catch (e) {
        console.warn('Error parsing request data.')
        console.log(e)
        return null
    }
}

export const useDb = () => {
    const [db, setDB] = useState(null);

    const mutateDb = () => {
        const low = window.require('lowdb')
        const FileSync = window.require('lowdb/adapters/FileSync')

        const adapter = new FileSync('./data/db.json')
        const lowdb = low(adapter)

        lowdb.defaults({ requests: [] })
            .write()

        setDB(lowdb)
    }

    useEffect(() => {
        mutateDb()
    }, []);

    return [db, mutateDb]
}