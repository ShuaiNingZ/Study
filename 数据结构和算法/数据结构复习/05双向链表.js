/**
 * 双向链表 (非线性结构)
 * 优点:
 * 易于访问前后结点, 便于逆向遍历, 支持双向遍历, 适合动态插入删除
 * 缺点:
 * 插入和删除操作较复杂, 空间开销大, 操作复杂度高, 不支持随机访问
 *
 * prepend(data) 前端插入
 * append(data) 后端插入
 * shift() 前端删除
 * pop() 后端删除
 * getFirst() 获取前端
 * getLast() 获取后端
 * isEmpty() 是否为空
 * getSize() 数量
 * clear() 清空
 * find(data) 查找
 * insertAfter(targetNode, newNode) 插入
 */

class Node {
    constructor(val) {
        this.value = val;
        this.prev = null;
        this.next = null;
    }
}

class DoubleLinkedList {
    #head = null;
    #tail = null;
    #count = null;

    prepend(val) {
        const node = new Node(val);
        if (this.#head === null) {
            this.#head = node;
            this.#tail = node;
        } else {
            node.next = this.#head;
            this.#head.prev = node;
            this.#head = node;
        }
        this.#count++;
    }

    append(val) {
        const node = new Node(val);
        if (this.#head === null) {
            this.#head = node;
            this.#tail = node;
        } else {
            node.prev = this.#tail;
            this.#tail.next = node;
            this.#tail = node;
        }
        this.#count++;
    }

    shift() {
        if (!this.#head) return null;
        const shiftNode = this.#head;
        if (this.#count === 1) {
            this.#head = null;
            this.#tail = null;
            return shiftNode
        } else {
            this.#head = shiftNode.next;
            this.#head.prev = null;
        }
        this.#count--;
        return shiftNode;
    }

    pop() {
        if (!this.#tail) return null;
        const popNode = this.#tail;
        if (this.#count === 1) {
            this.#head = null;
            this.#tail = null;
            return popNode
        } else {
            this.#tail = popNode.prev;
            this.#tail.next = null;
        }
        this.#count--;
        return popNode;
    }

    insertAfter(val, index) {
    }

    removeAt(index) {
    }

    // 获取指定位置节点
    getNodeAt(index) {
        if (!(index >= 0 && index < this.#count)) return;
        let node = this.#head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    getFirst() {
        return this.#head;
    }

    getLast() {
        return this.#tail;
    }

    isEmpty() {
        return this.#count === 0;
    }

    getSize() {
        return this.#count
    }

    clear() {
        this.#head = null;
        this.#tail = null;
        this.#count = null;
    }

    find() {

    }
}

const doubleLinkedList = new DoubleLinkedList()
doubleLinkedList.append(2);
doubleLinkedList.prepend(1);
doubleLinkedList.insertAfter(3, 0);
doubleLinkedList.insertAfter(4, 1);
console.log(doubleLinkedList.getFirst());
console.log(doubleLinkedList.getLast());
