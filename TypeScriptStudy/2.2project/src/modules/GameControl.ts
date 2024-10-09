import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器, 控制其他的所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向(也就是按键的方向)
    direction: string = 'ArrowRight';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    // 游戏初始化方法, 调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用 run 方法, 移动蛇
        this.run();
    }

    // 创建一个键盘按下的响应函数
    // 'ArrowUp'
    // 'ArrowDown'
    // 'ArrowLeft'
    // 'ArrowRight'
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key)
        // 需要检查 event.key 的值是否合法 (用户是否按了正确的按键)
        // 修改 direction 属性
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run() {
        /**
         * 根据方向 (this.direction) 来使蛇的位置改变
         *      向上 top 减少
         *      向下 top 增加
         *      向左 left 减少
         *      向右 left 增加
         */
            // 获取蛇现在坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
                Y -= 10;
                break;
            case 'ArrowDown':
                Y += 10;
                break;
            case 'ArrowLeft':
                X -= 10;
                break;
            case 'ArrowRight':
                X += 10;
                break;
        }
        this.checkEat(X, Y)

        try {
            // 修改蛇的 X 和 Y 的
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            // 进入到 catch, 说明出现异常, 游戏结束, 弹出一个提示信息
            alert(e.message);
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // 定义一个方法, 用来检测蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }
}

export default GameControl;