/**
 * 栈结构
 * 特点:
 * 后进先出, 单端操作
 * 大小有限, 空间耗尽栈溢出
 * 访问和查找速度非常快
 *
 * 优点: 快速分配和释放内存
 * 缺点: 有限大小, 存储数据只能在局部作用域访问, 不适合存储大量数据或长期保存
 *
 * push 压栈
 * pop 弹栈
 * peek 查看栈顶
 * isEmpty 是否为空
 * size 大小
 * clear 清空
 * toString 转为字符串
 *
 * 用途: 函数调用栈, 递归
 */

class Stack {
    #item = [];

    isEmpty() {
        return this.#item.length === 0;
    }

    size() {
        return this.#item.length;
    }

    push(val) {
        this.#item.push(val);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('栈为空');
        }
        return this.#item.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('栈为空');
        }
        return this.#item[this.#item.length - 1];
    }

    clear() {
        this.#item = [];
    }

    toString() {
        return this.#item.toString();
    }
}

const stack = new Stack();
stack.push(7);
stack.push(9);
console.log(stack.toString());
console.log(stack.isEmpty());
console.log(stack.size());
stack.pop();
stack.clear();
console.log(stack.toString());
