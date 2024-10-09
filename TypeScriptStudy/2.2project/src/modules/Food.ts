// 定义食物类 Food
class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;
    areaEle: HTMLElement;

    constructor() {
        // 获取页面中的 food 元素并将其赋值给 element
        this.element = document.getElementById('food')!;
        this.areaEle = document.querySelector('#snake > div')!;
    }

    // 定义一个获取食物 X 轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }

    // 定义一个获取食物 Y 轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }

    // 修改食物位置的方法
    change() {
        console.log(this.areaEle.clientWidth)
        // 生成一个随机位置
        // 食物的位置最小是 0 最大是 290
        // 蛇移动一次是一格, 一格的大小是 10, 所以就要求食物的坐标必须是整 10
        // 这个区域可以分为 29 个格子
        let top = Math.round(Math.random() * 290 / 10) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.top = `${top}px`;
        this.element.style.left = `${left}px`;
    }
}

// const food = new Food();
// food.change();
// console.log(food.X, food.Y)

export default Food;