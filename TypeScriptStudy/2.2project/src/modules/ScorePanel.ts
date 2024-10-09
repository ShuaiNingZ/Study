// 定义表示计分牌的类
class ScorePanel {
    // score 和 level 用来记录分数和等级
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置一个等级限制
    maxLevel: number;
    // 设置一个变量表示多少分时升级
    upScore: number;

    constructor(maxLevel = 10, upScore = 10) {
        this.maxLevel = maxLevel;
        this.upScore = upScore;
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
    }

    // 设置加分方法
    addScore() {
        // 分数自增
        this.scoreEle.innerHTML = `${++this.score}`;
        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    // 提升等级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = `${++this.level}`;
        }
    }
}

// const scorePanel = new ScorePanel();
// scorePanel.addScore();

export default ScorePanel;