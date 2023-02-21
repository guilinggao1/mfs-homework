# co理解
co:
* 可以兼容thunk函数和Promise对象。co模块可以不用编写Generator函数的执行器，因为它已经封装好了。将Generator函数co模块中，函数就会自动执行。co函数返回一个Promise对象，因此可以用then方法添加回调函数。
* co模块其实就是将两种自动执行器(thunk(thunkify)函数和Promise对象)，包装成一个模块。使用co模块的前提条件是，Generator函数的yield表达式后面，只能是thunk(thunkify)或者Promise对象，如果是数组或对象的成员全部都是promise对象，也可以使用co模块。


```
//1.首先co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
        function co(gen) {
            var ctx = this;
            return new Promise(function (resolve, reject) {
            });
        }
        //在返回的 Promise 对象里面，co 先检查参数gen是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为resolved。
        function co(gen) {
            var ctx = this;
            return new Promise(function (resolve, reject) {
                if (typeof gen === 'function') gen = gen.call(ctx);
                if (!gen || typeof gen.next !== 'function') return resolve(gen);
            });
        }
        //2.接着，co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
        function co(gen) {
            var ctx = this;
            return new Promise(function (resolve, reject) {
                if (typeof gen === 'function') gen = gen.call(ctx);
                if (!gen || typeof gen.next !== 'function') return resolve(gen);

                onFulfilled();
                function onFulfilled(res) {
                    var ret;
                    try {
                        ret = gen.next(res);
                    } catch (e) {
                        return reject(e);
                    }
                    next(ret);
                }
            });
        }
        //3.最后，就是关键的next函数，它会反复调用自身。
        function next(ret) {
            //检查当前是否为 Generator 函数的最后一步，如果是就返回。
            if (ret.done) return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            // 确保每一步的返回值，是 Promise 对象。
            //使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            //在参数不符合要求的情况下(参数非 Thunk 函数和 Promise 对象)，将 Promise 对象的状态改为rejected，从而终止执行。
            return onRejected(
                new TypeError(
                    'You may only yield a function, promise, generator, array, or object, '
                    + 'but the following object was passed: "'
                    + String(ret.value)
                    + '"'
                )
            );
        }
```
