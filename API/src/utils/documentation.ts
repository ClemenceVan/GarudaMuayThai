interface pl {
    query?: Record<string, {}>,
    body?: Record<string, {}>,
    params?: Record<string, {}>
}

interface rt {
    [status: number]: string | object
}

interface doc {
    source: string,
    method: string,
    title: string,
    description: string,
    payload: Record<string, Record<string, any>>,
    returns: rt
}

class Doc {
    private routes: Record<string, doc> = {}
    
    constructor() {
    }

    public addRoute(name: string, method: string, route: string) {
        if (!this.routes[route]) {
            this.routes[route] = {
                source: name,
                method: method,
                title: '',
                description: '',
                payload: {},
                returns: {}
            }
        } else {
            throw new Error('Route already exists')
        }
    }

    public addDescription(name: string, title: string, description: string) {
        const rt = Object.values(this.routes).filter((r) => r.source === name)[0]
        rt.title = title
        rt.description = description
    }

    public addPayload(route: string, payload: {}) {
        if (!this.routes[route])
            return
        this.routes[route].payload = payload
    }

    public addReturn(route: string, ret: rt) {
        if (!this.routes[route]) 
            return
        this.routes[route].returns = {...this.routes[route].returns, ...ret}
    }

    public get() {
        let ret: Record<string, Record<string, doc>> = {}
        for (const route in this.routes) {
            const index: string = this.routes[route].source.split('.')[0]
            if (!ret[index])
                ret[index] = {}
            ret[index][route] = this.routes[route]
        }
        return ret
    }

    public saveMd() {
        const fs = require('fs')
        const path = require('path')
        if (!fs.existsSync(path.join(__dirname, '../../doc')))
            fs.mkdirSync(path.join(__dirname, '../../doc'))
        if (!fs.existsSync(path.join(__dirname, '../../doc', 'documentation.md')))
            fs.writeFileSync(path.join(__dirname, '../../doc', 'documentation.md'), '')
        const md = path.join(__dirname, '../../doc', 'documentation.md')
        let content = ''
        for (const route in this.routes) {
            content += `## ${this.routes[route].title}\n`
            content += `#### v1${route}\n`
            content += `${this.routes[route].description}\n`
            content += `#### Payload\n`

            for (const field in this.routes[route].payload) {
                content += `##### ${field}\n`
                content += `|Field|Type|Required|Additional informations|\n`
                content += `|---|:-:|:-:|---|\n`
                for (const key in this.routes[route].payload[field]) {
                    content += `|**${key}**|${this.routes[route].payload[field][key].type}|${this.routes[route].payload[field][key].required ?? 'false'}|`
                    delete this.routes[route].payload[field][key].type
                    delete this.routes[route].payload[field][key].required
                    content += `${JSON.stringify(this.routes[route].payload[field][key])}|\n`
                }
            }
            content += `#### Returns\n`
            for (const status in this.routes[route].returns) {
                content += `##### ${status}\n`
                content += '```json\n'
                content += JSON.stringify(this.routes[route].returns[status], null, 2)
                content += '\n```\n'
            }
            content += `###### source: ${this.routes[route].source}\n`
            content += '---\n'
        }
        fs.writeFileSync(md, content)
    }
}

const documentation = new Doc()

export default documentation;