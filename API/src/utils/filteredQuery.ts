/* Modules */
import mongoose from "mongoose";
import moment from "moment";
import { FilteredQueryError } from "./customErrors";

/* Constants */
import { isEmpty, isNotEmpty, isAnyOf, eqSign, neSign, gtSign, gteSign, ltSign,
    lteSign, contains, equals, doesntEqual, doesntContains, startsWith, endsWith,
    is, isNot, isAftr, isOnOrAfter, isBefre, isOnOrBefore } from "../constants/queryFilters";
import { mixed, date, string, caret, dollar, empty } from "../constants/general";
import { error } from "../constants/I18n";

/* Filters used to build queries. Must be added to a type filter to be used. */
const ParsedFilters = {
    /* generics */
    [isEmpty]: (value: any) => (Array.isArray(value) ? { $empty: 0 } : {$in: [ undefined, null, empty ]}),
    [isNotEmpty]: (value: any) => ({$not: ParsedFilters[isEmpty](value)}),
    [isAnyOf]: (value: any) => ({ $in: value }), // not tested
    /* numbers */
    [eqSign]: (value: any) => ({ $eq: value }),
    [neSign]: (value: any) => ({ $ne: value }),
    [gtSign]: (value: any) => ({ $gt: value }),
    [gteSign]: (value: any) => ({ $gte: value }),
    [ltSign]: (value: any) => ({ $lt: value }),
    [lteSign]: (value: any) => ({ $lte: value }),
    /* strings */
    [contains]: (value: any) => ({ $regex: value }),
    [equals]: (value: any) => ({ $eq: value }),
    [doesntEqual]: (value: any) => ({ $ne: value }),
    [doesntContains]: (value: any) => ({ $not: { $regex: value } }),
    [startsWith]: (value: any) => ({ $regex: caret + value }),
    [endsWith]: (value: any) => ({ $regex: value + dollar }),
    /* dates */ //none tested
    [is]: (value: any) => ({ $eq: moment(value).toDate() }),
    [isNot]: (value: any) => ({ $ne: moment(value).toDate() }),
    [isAftr]: (value: any) => ({ $gt: moment(value).toDate() }),
    [isOnOrAfter]: (value: any) => ({ $gte: moment(value).toDate() }),
    [isBefre]: (value: any) => ({ $lt: moment(value).toDate() }),
    [isOnOrBefore]: (value: any) => ({ $lte: moment(value).toDate() }),
}

/* filters : */
export type filters = Stringfilter | Numberfilter | Booleanfilter | Datefilter;

interface Ifilters {
    field: string;
}

export interface Stringfilter extends Ifilters {
    value: string | string[] | null;
    operator?: 'contains' | 'equals' | 'doesn\'t equal' | 'doesn\'t contains' | 'starts with' | 'ends with'
    | 'is empty' | 'is not empty' | 'is any of';
}

export interface Numberfilter extends Ifilters {
    value: number | number[] | null;
    operator?: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'is empty' | 'is not empty' | 'is any of';
}

export interface Booleanfilter extends Ifilters {
    value: boolean | null;
    operator?: 'is' | 'is not';
}

export interface Datefilter extends Ifilters {
    value: `${number}-${number}-${number}T${number}:${number}:${string}` | `${number}-${number}-${number}` | null,
    operator?: 'is' | 'is not' | 'is after' | 'is on or after' | 'is before' | 'is on or before' | 'is empty'
    | 'is not empty';
}

/* FilteredQuery class */

/**
 * Create Mongoose queries from MUI filters
 * @param model mongoose model to query on
 * @param toParse (optional) filters to parse
 * 
 * toParse = [[A, B], [x, y]] =>
 * { $and: [ {$or: [A, B]}, { $or: [x, y]} ] }
 * 
 * Accepted date format: "YYYY-MM-DDTHH:mm:ss.sssZ" or "YYYY-MM-DD"
 * 
 * Example:
 * @example
 * const f = new FilteredQuery(account)
 * f.addAndFilter([{field: "email", operator: "ends with", value: "trackap.com"}])
 * console.log(await f.find())
*/
export default class FilteredQuery {
    private obj: filters[][]; // array of array of unparsed filters
    private $and: {}[] = []; // array of parsed filters
    private model: mongoose.Model<any>; // mongoose model to query on (base & discriminators)
    private fields: Record<string, string>; // fields of the model as {field: type}

    constructor(model: mongoose.Model<any>, toParse: filters[][] = []) {
        this.model = model;
        this.obj = toParse;
        this.fields = {};
        /* add model's fields types */
        this.addFields(this.model.schema.paths);
        /* add discriminator's fields types if present */
        this.model.prototype.$__schema.discriminators &&
        Object.keys(this.model.prototype.$__schema.discriminators).map((discriminator) => {
            this.addFields(this.model.prototype.$__schema.discriminators[discriminator].paths);
        });
        /* build query */
        this.buildQuery();
        return this;
    }

    private addFields(fields: Record<string, {instance: string}>) {
        const keys = Object.keys(fields)
        for (let i = 0; i < keys.length; i++)
            this.fields = {
                ...this.fields,
                [keys[i]]: fields[keys[i]].instance.toLowerCase()
            };
    }

    /* returns the query promise, so can be chained with .lean() */
    public find() {
        return this.model.find(this.query(), null, { strictQuery: false })
    }

    public findOne() {
        return this.model.findOne(this.query(), null, { strictQuery: false })
    }

    /* returns the parsed query (can be used with aggregate) */
    public query() {
        return this.$and.length ? { $and: this.$and } : {};
    }

    /* adds a AND filter to the query */
    public addAndFilter(filter: filters[]) {
        this.obj.push(filter);
        this.buildQuery();
        return this;
    }

    private typeCheck(field: string, operator: string, value: any) {
        /* Check that field exists on model */
        if (Object.keys(this.fields).indexOf(field) === -1)
            throw new FilteredQueryError(error[400].parser.unknownField, { key: field, source: this.model.modelName });
        switch (true) {
            /* If type invalid, will check for special cases. Else, break*/
            case !(this.fields[field] !== typeof value && this.fields[field] !== mixed):
                break;
            /* If date, format to use in query */
            case (this.fields[field] === date && typeof value === string):
                value = new Date(value);
                break;
            /* If operator expects array, check all members are of the rigth type */
            case (operator === isAnyOf && Array.isArray(value)):
                for (let i = 0; i < value.length; i++)
                    if (this.fields[field] !== typeof value[i])
                        throw new FilteredQueryError(error[400].parser.invalidFieldInArray, { key: field, source: this.model.modelName, typeStr: this.fields[field] });
                    break;
            /* If type invalid & not a special case, throw error */
            default:
                throw new FilteredQueryError(error[400].parser.invalidType, { typeStr: this.fields[field], key: field, source: this.model.modelName, wrongType: typeof value});
        }
    }

    /* builds a mongo query according to the filters */
    public buildQuery() {
        this.obj.map((filters) => {
            this.$and.push({$or:
                filters.map((filter) => {
                    const { field, operator, value } = filter;
                    // check that field is of the right type
                    this.typeCheck(field, operator ?? equals, value);
                    // parse the filter according to ParsedFilters
                    if (this.model.schema.paths[field].instance === "Date" && typeof value === string)
                        return {[field]: value};
                    const parsed = mongoose.trusted(ParsedFilters[operator ?? equals](value)); // allow query to use operators
                    return {[field]: parsed};
                })
            })
        });
        return this;
    }
}