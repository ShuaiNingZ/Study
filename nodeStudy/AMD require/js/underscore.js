// Underscore.js
// (c) 2009 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the terms of the MIT license.
// Portions of Underscore are inspired by or borrowed from Prototype.js,
// Oliver Steele's Functional, And John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore/
window._ = {

    VERSION : '0.1.0',

    /*------------------------ Collection Functions: ---------------------------*/

    // The cornerstone, an each implementation.
    // Handles objects implementing forEach, each, arrays, and raw objects.
    each : function(obj, iterator, context) {
        var index = 0;
        try {
            if (obj.forEach) {
                obj.forEach(iterator, context);
            } else if (obj.length) {
                for (var i=0; i<obj.length; i++) iterator.call(context, obj[i], i);
            } else if (obj.each) {
                obj.each(function(value) { iterator.call(context, value, index++); });
            } else {
                var i = 0;
                for (var key in obj) {
                    var value = obj[key], pair = [key, value];
                    pair.key = key;
                    pair.value = value;
                    iterator.call(context, pair, i++);
                }
            }
        } catch(e) {
            if (e != '__break__') throw e;
        }
        return obj;
    },

    // Return the results of applying the iterator to each element. Use Javascript
    // 1.6's version of map, if possible.
    map : function(obj, iterator, context) {
        if (obj && obj.map) return obj.map(iterator, context);
        var results = [];
        _.each(obj, function(value, index) {
            results.push(iterator.call(context, value, index));
        });
        return results;
    },

    // Inject builds up a single result from a list of values. Also known as
    // reduce, or foldl.
    inject : function(obj, memo, iterator, context) {
        _.each(obj, function(value, index) {
            memo = iterator.call(context, memo, value, index);
        });
        return memo;
    },

    // Return the first value which passes a truth test.
    detect : function(obj, iterator, context) {
        var result;
        _.each(obj, function(value, index) {
            if (iterator.call(context, value, index)) {
                result = value;
                throw '__break__';
            }
        });
        return result;
    },

    // Return all the elements that pass a truth test. Use Javascript 1.6's
    // filter(), if it exists.
    select : function(obj, iterator, context) {
        if (obj.filter) return obj.filter(iterator, context);
        var results = [];
        _.each(obj, function(value, index) {
            if (iterator.call(context, value, index)) results.push(value);
        });
        return results;
    },

    // Return all the elements for which a truth test fails.
    reject : function(obj, iterator, context) {
        var results = [];
        _.each(obj, function(value, index) {
            if (!iterator.call(context, value, index)) results.push(value);
        });
        return results;
    },

    // Determine whether all of the elements match a truth test. Delegate to
    // Javascript 1.6's every(), if it is present.
    all : function(obj, iterator, context) {
        iterator = iterator || function(v){ return v; };
        if (obj.every) return obj.every(iterator, context);
        var result = true;
        _.each(obj, function(value, index) {
            result = result && !!iterator.call(context, value, index);
            if (!result) throw '__break__';
        });
        return result;
    },

    // Determine if at least one element in the object matches a truth test. Use
    // Javascript 1.6's some(), if it exists.
    any : function(obj, iterator, context) {
        iterator = iterator || function(v) { return v; };
        if (obj.some) return obj.some(iterator, context);
        var result = false;
        _.each(obj, function(value, index) {
            if (result = !!iterator.call(context, value, index)) throw '__break__';
        });
        return result;
    },

    // Determine if a given value is included in the array or object,
    // based on '==='.
    include : function(obj, target) {
        if (_.isArray(obj)) return _.indexOf(obj, target) != -1;
        var found = false;
        _.each(obj, function(pair) {
            if (pair.value === target) {
                found = true;
                throw '__break__';
            }
        });
        return found;
    },

    // Invoke a method with arguments on every item in a collection.
    invoke : function(obj, method) {
        var args = _.toArray(arguments).slice(2);
        return _.map(obj, function(value) {
            return (method ? value[method] : value).apply(value, args);
        });
    },

    // Optimized version of a common use case of map: fetching a property.
    pluck : function(obj, key) {
        var results = [];
        _.each(obj, function(value){ results.push(value[key]); });
        return results;
    },

    // Return the maximum item or (item-based computation).
    max : function(obj, iterator, context) {
        if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
        var result;
        _.each(obj, function(value, index) {
            var computed = iterator ? iterator.call(context, value, index) : value;
            if (result == null || computed >= result.computed) result = {value : value, computed : computed};
        });
        return result.value;
    },

    // Return the minimum element (or element-based computation).
    min : function(obj, iterator, context) {
        if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
        var result;
        _.each(obj, function(value, index) {
            var computed = iterator ? iterator.call(context, value, index) : value;
            if (result == null || computed < result.computed) result = {value : value, computed : computed};
        });
        return result.value;
    },

    // Sort the object's values by a criteria produced by an iterator.
    sortBy : function(obj, iterator, context) {
        return _.pluck(_.map(obj, function(value, index) {
            return {
                value : value,
                criteria : iterator.call(context, value, index)
            };
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }), 'value');
    },

    // Use a comparator function to figure out at what index an object should
    // be inserted so as to maintain order. Uses binary search.
    sortedIndex : function(array, obj, iterator) {
        iterator = iterator || function(val) { return val; };
        var low = 0, high = array.length;
        while (low < high) {
            var mid = (low + high) >> 1;
            iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
        }
        return low;
    },

    // Convert anything iterable into a real, live array.
    toArray : function(iterable) {
        if (!iterable) return [];
        if (_.isArray(iterable)) return iterable;
        return _.map(iterable, function(val){ return val; });
    },

    // Return the number of elements in an object.
    size : function(obj) {
        return _.toArray(obj).length;
    },

    /*-------------------------- Array Functions: ------------------------------*/

    // Get the first element of an array.
    first : function(array) {
        return array[0];
    },

    // Get the last element of an array.
    last : function(array) {
        return array[array.length - 1];
    },

    // Trim out all falsy values from an array.
    compact : function(array) {
        return _.select(array, function(value){ return !!value; });
    },

    // Return a completely flattened version of an array.
    flatten : function(array) {
        return _.inject(array, [], function(memo, value) {
            if (_.isArray(value)) return memo.concat(_.flatten(value));
            memo.push(value);
            return memo;
        });
    },

    // Return a version of the array that does not contain the specified value(s).
    without : function(array) {
        var values = array.slice.call(arguments, 0);
        return _.select(array, function(value){ return !_.include(values, value); });
    },

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    uniq : function(array, isSorted) {
        return _.inject(array, [], function(memo, el, i) {
            if (0 == i || (isSorted ? _.last(memo) != el : !_.include(memo, el))) memo.push(el);
            return memo;
        });
    },

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    intersect : function(array) {
        var rest = _.toArray(arguments).slice(1);
        return _.select(_.uniq(array), function(item) {
            return _.all(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    },

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    zip : function() {
        var args = _.toArray(arguments);
        var length = _.max(_.pluck(args, 'length'));
        var results = new Array(length);
        for (var i=0; i<length; i++) results[i] = _.pluck(args, String(i));
        return results;
    },

    // If the browser doesn't supply us with indexOf (I'm looking at you, MSIE),
    // we need this function. Return the position of the first occurence of an
    // item in an array, or -1 if the item is not included in the array.
    indexOf : function(array, item) {
        if (array.indexOf) return array.indexOf(item);
        var length = array.length;
        for (i=0; i<length; i++) if (array[i] === item) return i;
        return -1;
    },

    /* ----------------------- Function Functions: -----------------------------*/

    // Create a function bound to a given object (assigning 'this', and arguments,
    // optionally). Binding with arguments is also known as 'curry'.
    bind : function(func, context) {
        if (!context) return func;
        var args = _.toArray(arguments).slice(2);
        return function() {
            var a = args.concat(_.toArray(arguments));
            return func.apply(context, a);
        };
    },

    // Bind all of an object's methods to that object. Useful for ensuring that
    // all callbacks defined on an object belong to it.
    bindAll : function() {
        var args = _.toArray(arguments);
        var context = args.pop();
        _.each(args, function(methodName) {
            context[methodName] = _.bind(context[methodName], context);
        });
    },

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    delay : function(func, wait) {
        var args = _.toArray(arguments).slice(2);
        return window.setTimeout(function(){ return func.apply(func, args); }, wait);
    },

    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    defer : function(func) {
        return _.delay.apply(_, [func, 1].concat(_.toArray(arguments).slice(1)));
    },

    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    wrap : function(func, wrapper) {
        return function() {
            var args = [func].concat(_.toArray(arguments));
            return wrapper.apply(wrapper, args);
        };
    },

    /* ------------------------- Object Functions: ---------------------------- */

    // Retrieve the names of an object's properties.
    keys : function(obj) {
        return _.pluck(obj, 'key');
    },

    // Retrieve the values of an object's properties.
    values : function(obj) {
        return _.pluck(obj, 'value');
    },

    // Extend a given object with all of the properties in a source object.
    extend : function(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    },

    // Create a (shallow-cloned) duplicate of an object.
    clone : function(obj) {
        return _.extend({}, obj);
    },

    // Perform a deep comparison to check if two objects are equal.
    isEqual : function(a, b) {
        // Check object identity.
        if (a === b) return true;
        // Different types?
        var atype = typeof(a), btype = typeof(b);
        if (atype != btype) return false;
        // Basic equality test (watch out for coercions).
        if (a == b) return true;
        // One of them implements an isEqual()?
        if (a.isEqual) return a.isEqual(b);
        // If a is not an object by this point, we can't handle it.
        if (atype !== 'object') return false;
        // Nothing else worked, deep compare the contents.
        var aKeys = _.keys(a), bKeys = _.keys(b);
        // Different object sizes?
        if (aKeys.length != bKeys.length) return false;
        // Recursive comparison of contents.
        for (var key in a) if (!_.isEqual(a[key], b[key])) return false;
        return true;
    },

    // Is a given value a DOM element?
    isElement : function(obj) {
        return !!(obj && obj.nodeType == 1);
    },

    // Is a given value a real Array?
    isArray : function(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    },

    // Is a given value a Function?
    isFunction : function(obj) {
        return typeof obj == 'function';
    },

    // Is a given variable undefined?
    isUndefined : function(obj) {
        return typeof obj == 'undefined';
    },

    /* -------------------------- Utility Functions: -------------------------- */

    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    uniqueId : function(prefix) {
        var id = this._idCounter = (this._idCounter || 0) + 1;
        return prefix ? prefix + id : id;
    },

    // Javascript templating a-la ERB, pilfered from John Resig's
    // "Secrets of the Javascript Ninja", page 83.
    template : function(str, data) {
        var fn = new Function('obj',
            'var p=[],print=function(){p.push.apply(p,arguments);};' +
            'with(obj){p.push(\'' +
            str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");
        return data ? fn(data) : fn;
    }

};
