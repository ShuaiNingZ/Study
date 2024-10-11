/**
 * 单端队列
 * 特点:
 * 先进先出
 *
 * 优点: 简单易用, 遵循顺序, 多线程同步, 效率高 时间复杂度 O(1)
 * 缺点: 灵活性低(顺序), 频繁出队入队内存消耗
 *
 * isEmpty 是否为空
 * size 大小
 * peek 对首
 * rear 队尾
 * dequeue 出队
 * enqueue 入队
 * clear 清空
 * toString 转为字符串
 *
 * 用途: 任务队列, 事件循环
 *
 * 使用 数组封装队列, 缺点: 队首被删除后会导致数组所有项的索引发生变化, 对性能有影响
 */
class Queue {
    #item = {};
    #index = 0;
    #frontIndex = 0;

    size() {
        return this.#index - this.#frontIndex
    }

    isEmpty() {
        return this.size() === 0;
    }

    enqueue(val) {
        this.#item[this.#index++] = val;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('队列为空')
        }
        const delVal = this.#item[this.#frontIndex];
        delete this.#item[this.#frontIndex++];
        return delVal
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('队列为空')
        }
        return this.#item[this.#frontIndex];
    }

    clear() {
        this.#item = {};
        this.#index = 0;
        this.#frontIndex = 0;
    }

    toString() {
        let str = '';
        for (let i = this.#frontIndex; i < this.#index; i++) {
            str += `${ String(this.#item[i]) }`
            if (i !== this.#index - 1) {
                str += ','
            }
        }
        return str;
    }

    self() {
        return this.#item;
    }
}

const queue = new Queue();
queue.enqueue(9);
queue.enqueue(5);
queue.enqueue(2);
queue.enqueue(8);
queue.enqueue(6);
console.log(queue.toString());
queue.dequeue();
console.log(queue.size());
console.log(queue.self());
queue.clear();
console.log(queue.size());
console.log(queue.self());
