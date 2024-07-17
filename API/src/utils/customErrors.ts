export class CustomError extends Error {
    options?: Record<string, any>;
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

export class FilteredQueryError extends CustomError {
    constructor(message: string, public options?: Record<string, any>) {
        super(message);
        this.name = "FilteredQueryError";
        this.options = options ?? {};
        Object.setPrototypeOf(this, FilteredQueryError.prototype);
    }
}

export class ParserError extends CustomError {
    constructor(message: string, public options?: Record<string, any>) {
        super(message);
        this.name = "ParserError";
        this.options = options ?? {};
        Object.setPrototypeOf(this, ParserError.prototype);
    }
}