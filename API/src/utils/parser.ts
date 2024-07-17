/* Modules */
import { ParserError } from "./customErrors";
import Doc from "./documentation";

/* Constants */
import { invalidType, invalidDateFormat, notOneOf, invalidLength, invalidRegex, invalidLimit, missingField } from "../constants/server";

/* Interfaces */

interface baseParam<T> {
    type: string,
    required?: boolean,
    default?: T,
    format?: (value: T) => T,
    oneOf?: Array<T>,
}

interface stringParam extends baseParam<string> {
    type: "string",
    matchRegex?: RegExp,
    length?: [number | undefined, number | undefined] | number,
    trim?: boolean,
}

interface numberParam extends baseParam<number> {
    type: "number",
    limits?: [number | undefined, number | undefined],
}

interface dateParam extends baseParam<Date> {
    type: "date",
    limits?: [Date | undefined, Date | undefined],
}

interface anyParam extends baseParam<any> {
    type: "any",
}

type param = stringParam | numberParam | dateParam | anyParam

export interface IParams {
    query?: Record<string, param>,
    body?: Record<string, param>,
    params?: Record<string, param>
}

/* Classes */

class baseMethods<T> {
    public required(value: T, required: boolean) {
            if (required && value === undefined)
                throw new ParserError(missingField)
            return value
        }

    public type(value: T, type: string) {
            if (type == "any")
                return value
            if (typeof value !== type && type != "date")
                throw new ParserError(invalidType, { typeStr: type, wrongType: typeof value })
            else if (type == "date")
                if (!(value instanceof Date) || isNaN(value.getTime()))
                    throw new ParserError(invalidDateFormat, { value: value })
            return value
        }

    public oneOf(value: T, oneOf: Array<T>) {
            if (!oneOf.includes(value))
                throw new ParserError(notOneOf, { value: value, validSet: oneOf })
            return value
        }

    public format(value: T, format: (value: T) => T) {
            return format(value)
        }

    public default(value: T, defaultValue: T) {
            if (value === undefined)
                return defaultValue
            return value
        }
}

class stringMethods extends baseMethods<string> {
    public type(value: string, type: string) {
        value = value.toString()
        return super.type(value, type)
    }
    public matchRegex(value: string, matchRegex: RegExp) {
        if (!matchRegex.test(value as unknown as string)) {
            throw new ParserError(invalidRegex)
        }
        return value
    }
    public length(value: string, length: [number, number] | number) {
        if (typeof length === "number") {
            if ((value as unknown as string).length !== length)
                throw new ParserError(invalidLength, {limits: length})
        } else {
            if ((value as unknown as string).length < length[0] || (value as unknown as string).length > length[1])
                throw new ParserError(invalidLimit, {limits: length})
        }
        return value
    }
    public trim(value: string, trim: boolean) {
        if (trim)
            value = (value as unknown as string).trim()
        return value
    }
}

class numberMethods extends baseMethods<number> {
    public type(value: number, type: string) {
        const tmp = Number(value)
        return super.type(isNaN(tmp) ? value : tmp, type)
    }
    public limits(value: number, limits: [number | undefined, number | undefined]) {
        if (limits[1] !== undefined && limits[0] !== undefined && (value < limits[0] || value > limits[1]))
            throw new ParserError(invalidLimit, {limits: limits})
        return value
    }
}

class dateMethods extends baseMethods<Date> {
    public type(value: Date | string, type: string) {
        value = new Date(value)
        return super.type(value, type)
    }
    public limits(value: Date, limits: [Date | undefined, Date | undefined]) {
        if (limits[1] !== undefined && limits[0] !== undefined && (value < limits[0] || value > limits[1]))
            throw new ParserError(invalidLimit, {limits: limits})
        return value
    }
}

class anyMethods extends baseMethods<any> {}

type sources = keyof IParams

/* Parser */

class Parser {
    private params: IParams
    private req: Record<sources, any>
    private parsedReq: Record<sources, any> = {
        query: {},
        body: {},
        params: {}
    }
    private methods: Record<string, any> = {
        string: new stringMethods(),
        number: new numberMethods(),
        date: new dateMethods(),
        any: new anyMethods()
    }

    constructor(params: IParams, req: Record<sources, any> & {route: {path: string}}) {
        if (process.env.NODE_ENV === 'test') Doc.addPayload(req.route.path, params)
        // console.log((req as any).path)
        // console.log('Parser : ', req.route.path);
        this.params = params
        this.req = req
    }

    public static query(params: IParams['query'], req: Record<'query', any> & {route: {path: string}}) {
        return new Parser({ query: params }, {query: req.query, body: {}, params: {}, route: req.route})
    }

    public static body(params: IParams['body'], req: Record<'body', any> & {route: {path: string}}) {
        return new Parser({ body: params }, {query: {}, body: req.body, params: {}, route: req.route})
    }

    public static params(params: IParams['params'], req: Record<'params', any> & {route: {path: string}}) {
        return new Parser({ params }, {query: {}, body: {}, params: req.params, route: req.route})
    }

    private parseParams() {
        const paramsSources: Array<sources> = Object.keys(this.params) as Array<sources>
        for (const source of paramsSources) {
            const fields = Object.keys(this.params[source]!)
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i]
                try {
                    Object.keys(this.params[source]![field]).map((key) => {
                            let mem = this.parsedReq[source][field] ?? this.req[source][field];
                            if (key in this.methods[this.params[source]![field].type] && key in this.params[source]![field])
                                mem = this.methods[this.params[source]![field].type][key](mem, (this.params[source]![field] as any)[key])
                            this.parsedReq[source][field] = mem
                    })
                } catch (error: any) {
                    if (!this.params[source]![field].required) {
                        if (this.params[source]![field]?.default)
                            this.parsedReq[source][field] = this.params[source]![field].default
                        continue
                    } if (!this.req[source][field])
                        throw new ParserError(missingField, { key: field, source: source })
                    else if (error instanceof ParserError)
                        error.options = { ...error.options, key: field, source: source }
                    throw error
                }
            }
        }
    }

    public parsed() {
        this.parseParams()
        return this.parsedReq
    }
}

export default Parser