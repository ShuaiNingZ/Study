/**
 * 双端队列
 * 特点:
 * 灵活(可以双端操作)
 * 非线性访问
 * 大小管理(防止超出内存限制)
 *
 * 优点:
 * 多用途(可以作为队列和栈使用)
 * 高效性(双端操作效率更高)
 * 缺点:
 * 额外开销(双端维护, 存储和处理开销)
 * 复杂度(实现和使用相对复杂, 注意并发安全)
 *
 * insertFront 前端插入
 * insertBack  后端插入
 * removeFront 前端移除
 * removeBack  后端移除
 * peekFront   前端查看
 * peekFront   后端查看
 * size        大小
 * isEmpty     是否为空
 */

/*class Deque {
    #item = {};
    #front = 0;
    #back = 0;

    insertFront(val) {
        this.#item[--this.#front] = val;
    }

    insertBack(val) {
        this.#item[this.#back++] = val;
    }

    removeFront() {
        if (this.isEmpty()) return undefined;
        const front = this.#item[this.#front];
        delete this.#item[this.#front++];
        return front;
    }

    removeBack() {
        if (this.isEmpty()) return undefined;
        const back = this.#item[this.#back];
        delete this.#item[this.#back--];
        return back;
    }

    peekFront() {
        return this.#item[this.#front];
    }

    peekBack() {
        return this.#item[this.#back];
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.#back - this.#front;
    }

    clear() {
        this.#item = {};
        this.#front = 0;
        this.#back = 0;
    }

    toArray() {
        const arr = [];
        for (let i = this.#front; i <= this.#back; i++) {
            arr.push(this.#item[i])
        }
        return arr;
    }

    toString() {
        return this.toArray().toString();
    }

    self() {
        return this.#item;
    }
}*/

class Deque {
    #item = [];

    insertFront(val) {
        this.#item.unshift(val);
    }

    insertBack(val) {
        this.#item.push(val);
    }

    removeFront() {
        this.#item.shift();
    }

    removeBack() {
        this.#item.pop();
    }

    peekFront() {
        return this.#item.at(0);
    }

    peekBack() {
        return this.#item.at(-1);
    }

    size() {
        return this.#item.length
    }

    isEmpty() {
        return this.size() === 0;
    }

    self() {
        return this.#item
    }
}

const deque = new Deque();
deque.insertFront(9);
deque.insertFront(3);
deque.insertFront(5);
deque.insertFront(4);
deque.insertBack(7);
deque.insertBack(1);
deque.insertBack(3);
deque.insertBack(5);
console.log(deque.self())
deque.removeFront();
deque.insertFront(9);
console.log(deque.self())
deque.removeBack();
deque.removeBack();
deque.removeBack();
console.log(deque.peekFront());
console.log(deque.peekBack());
console.log(deque.self())

