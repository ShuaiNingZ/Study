const isType = (function () {
    const toString = Object.prototype.toString;
    return function (val: unknown, type: string): boolean {
        return toString.call(val) === `[object ${type}]`
    }
})()

const isString = (val: unknown): val is string => {
    return isType(val, 'String');
}

const isNumber = (val: unknown): val is number => {
    return isType(val, 'Number');
}

const isBoolean = (val: unknown): val is boolean => {
    return isType(val, 'Boolean');
}

const isUndefined = (val: unknown): val is undefined => {
    return isType(val, 'Undefined');
}

const isNull = (val: unknown): val is null => {
    return isType(val, 'Null');
}

const isArray = (val: unknown): val is Array<unknown> => {
    return isType(val, 'Array');
}

const isObject = (val: unknown): val is Object => {
    return isType(val, 'Object');
}

const isFunction = (val: unknown): val is Function => {
    return isType(val, 'Function');
}

const isDate = (val: unknown): val is Date => {
    return isType(val, 'Date');
}

const isRegExp = (val: unknown): val is RegExp => {
    return isType(val, 'RegExp');
}

const isMap = (val: unknown): val is Map<unknown, unknown> => {
    return isType(val, 'Map');
}

const isSet = (val: unknown): val is Set<unknown> => {
    return isType(val, 'Set');
}

const isPromise = (val: unknown): val is Promise<Function> => {
    return isType(val, 'Promise');
}

function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }
    if (isMap(val) || isSet(val)) {
        return val.size === 0;
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }
    return false
}

function isFalse<T = unknown>(val: T): val is T {
    if (isNull(val) || isUndefined(val)) return true;
    if (isNumber(val) && val === 0) return true;
    if (isString(val) && val.length === 0) return true;
    if (isBoolean(false)) return true;
}
