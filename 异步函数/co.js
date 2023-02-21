
/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */
//co函数导出方式
module.exports = co['default'] = co.co = co;
//多种引入方式
// const co = require('co')
// require('co').co
// import co from 'co'
// import * as co from 'co'
// import { co } form 'co'

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

//将 Generator 函数转换成 promise 函数。可重复使用，类似于缓存函数功能。
//借助于高阶函数的特性，返回一个新函数createPromise,然后传给它的参数都会被导入到Generator函数中。
co.wrap = function (fn) {
    createPromise.__generatorFunction__ = fn;
    return createPromise;
    function createPromise() {
        return co.call(this, fn.apply(this, arguments));
    }
};

//主函数
/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */
//co函数入参为Generator函数，返回结果为Promise
function co(gen) {
    // 获取上下文this
    var ctx = this;
    // 获取传入函数后所有参数
    var args = slice.call(arguments, 1);

    // we wrap everything in a promise to avoid promise chaining,
    // which leads to memory leak errors.
    // see https://github.com/tj/co/issues/180

    // 返回 promise
    return new Promise(function (resolve, reject) {
        // 如果gen是函数，先执行generator函数
        if (typeof gen === 'function') gen = gen.apply(ctx, args);
        // 如果gen有值 或 gen非迭代器对象 直接resolve
        if (!gen || typeof gen.next !== 'function') return resolve(gen);
        /**
        * 到这里的时候 gen结构为 
        * '{ value: xxx, next: function() {},done: true or false}'
        */

        // 这里 先去走第一个yield，因为还没走到gen.next（） 所以不需要传参数
        onFulfilled();

        /**
         * @param {Mixed} res
         * @return {Promise}
         * @api private
         */

        function onFulfilled(res) {
            var ret;
            try {
                // 调用gen.next传参数res，得到yield的结果
                ret = gen.next(res);
            } catch (e) {
                // 出错直接返回
                return reject(e);
            }
            next(ret);// 接受gen.next返回结果 去走判断逻辑
            return null;
        }

        /**
         * @param {Error} err
         * @return {Promise}
         * @api private
         */

        // gen 执行throw方法，出错直接 reject
        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        /**
         * Get the next value in the generator,
         * return a promise.
         *
         * @param {Object} ret
         * @return {Promise}
         * @api private
         */

        // 这里return 只是为了结束函数执行 return结果没有实际意义
        function next(ret) {
            // 如果走完了，此时generator执行完毕 返回 resolve
            if (ret.done) return resolve(ret.value);
            // done为false，说明没走完。 把ret.value转成promise
            var value = toPromise.call(ctx, ret.value);
            // 如果转换完结果为promise，那么继续链式onFulfilled, onRejected 操作
            // 这里就形成了next递归
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            // 如果转换的结果不是promise 那么抛出错误
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
    });
}

//辅助函数
/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */
//转化为promise返回
function toPromise(obj) {
    // 假值 直接返回
    if (!obj) return obj;
    // 为promise 直接返回
    if (isPromise(obj)) return obj;
    // 是generator生成器函数 或 generator迭代器对象 调用co返回
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
    // 为函数 转换为promise返回
    if ('function' == typeof obj) return thunkToPromise.call(this, obj);
    // 为数组转化promise返回
    if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
    // 为对象转化promise返回
    if (isObject(obj)) return objectToPromise.call(this, obj);
    // 返回
    return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */
//用thunk方式去将函数转化为promise
function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        fn.call(ctx, function (err, res) {
            if (err) return reject(err);
            if (arguments.length > 2) res = slice.call(arguments, 1);
            resolve(res);
        });
    });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */
//将数组的每一项转化为promise调用Promise.all返回。
function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */
//将对象的每一项转化为promise调用Promise.all返回。
function objectToPromise(obj) {
    // 初始化 result
    var results = new obj.constructor();
    // 遍历所有键名
    var keys = Object.keys(obj);
    // promise组成的数组
    var promises = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // 将每一项转化为promise
        var promise = toPromise.call(this, obj[key]);
        // 如果为promise 则调用defer
        if (promise && isPromise(promise)) defer(promise, key);
        else results[key] = obj[key];
    }
    // 最后全部一起返回
    return Promise.all(promises).then(function () {
        return results;
    });
    // 将promise resolve结果塞到数组里
    function defer(promise, key) {
        // predefine the key in the result
        // 先赋值为undefined
        results[key] = undefined;
        // 塞到promises数组里，并且把promise resolve的结果存到result里
        promises.push(promise.then(function (res) {
            results[key] = res;
        }));
    }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
// 判断是否为promise
function isPromise(obj) {
    return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
// 判断是否为generator迭代器对象
function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
// 判断是否为generator生成器函数
function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */
// 判断是否为对象
function isObject(val) {
    return Object == val.constructor;
}