/**
 * 单链表
 * 优点:
 * 插入和删除效率高, 不需要大量移动元素, 存储空间不固定, 易于扩充
 * 缺点:
 * 不能随机查找, 查找效率低
 *
 * append(node) 尾部添加
 * insert(node, index) 指定位置添加
 * remove(node) 根据节点内容删除
 * removeAt(node) 根据索引删除
 * isEmpty 是否为空
 * size 大小
 * toString 转为字符串
 *
 * 用途:
 * 模拟 堆 或 队列 或 其他复杂的数据结构
 */

class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SingleLinkedList {
    #count = 0;
    #link = null;

    append(node) {
        const ele = new Node(node);
        if (this.#link === null) {
            this.#link = ele;
        } else {
            let cur = this.#link;
            while (cur.next !== null) {
                cur = cur.next;
            }
            cur.next = ele;
        }
        this.#count++;
    }

    insert(node, index) {
        if (!(index >= 0 && index <= this.#count)) {
            throw new Error('超出限制, 无法插入')
        }
        const ele = new Node(node);
        if (index === 0) {
            ele.next = this.#link;
            this.#link = ele;
        } else {
            let cur = this.#link;
            for (let i = 0; cur; i++) {
                if (index - 1 === i) {
                    ele.next = cur.next;
                    cur.next = ele;
                    this.#count++;
                    break;
                }
                cur = cur.next;
            }
        }
    }

    equalFn(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    getNodeAt(index) {
        if (!(index >= 0 && index < this.#count)) return;
        let cur = this.#link;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur;
    }

    indexOf(node) {
        let cur = this.#link;
        for (let i = 0; cur; i++) {
            if (this.equalFn(cur.value, node)) {
                return i;
            }
            cur = cur.next;
        }
        return -1;
    }

    removeAt(index) {
        const node = this.getNodeAt(index);
        if (!node) return undefined;
        if (index === 0) {
            const cur = this.#link;
            this.#link = cur.next;
            return cur.value
        }
        const prevNode = this.getNodeAt(index - 1);
        prevNode.next = node.next;
        return node.value
    }

    remove(node) {
        const nodeIndex = this.indexOf(node);
        if (!~nodeIndex) return;
        this.removeAt(nodeIndex);
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.#count;
    }

    self() {
        return this.#link;
    }
}

const single = new SingleLinkedList();
single.append(1)
single.append(2)
single.append(5)
single.insert(3, 0)
single.insert(4, 2)
single.removeAt(2);
single.removeAt(2);
single.remove(1);
console.log(single.self());
