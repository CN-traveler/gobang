window.onload = function(){
    initChess();
}
// 全局变量
var state, chess, win, step, star;

// 初始化
function initChess(){
    // 获胜方
    win = -1;
    // 执子方 flase 黑棋 true 白棋
    state = false;
    // 记录数组
    step = new Array();
    // 棋盘数组
    chess = new Array();
    // 棋盘数组及棋盘样式初始化
    for(var i = 0; i <= 224; i++){
        chess[i] = -1;
        document.getElementsByClassName('ele')[i].style = "";
    }
}

// 二维转一维
function index(x, y){
    return y * 15 + x;
}

// x方向偏移量
function Fx(num){
    return num % 3 - 1;
}

// y方向偏移量
function Fy(num){
    return parseInt(num / 3) - 1;
}

// 获胜检测
function robot(num){
    var x = num % 15, y = parseInt(num / 15);
    // 四个方向
    for(var i = 5; i < 9; i++){
        var fx = Fx(i), fy = Fy(i), sum = 1;
        // 一边
        for(var j = 1; j <= 4 && (index(x + j * fx, y + j * fy) >= 0 && index(x + j * fx, y + j * fy) <= 224 && chess[num] == chess[index(x + j * fx, y + j * fy)]); j++, sum++);
        // 另一边
        for(var j = 1; j <= 4 && (index(x - j * fx, y - j * fy) >= 0 && index(x - j * fx, y - j * fy) <= 224 && chess[num] == chess[index(x - j * fx, y - j * fy)]); j++, sum++);
        // 胜利条件
        if(sum >= 5) return chess[num];
    }
    // 未分胜负
    return -1;
}

// 走子
function run(num){
    if(win == -1){
        var x = num % 15;
        var y = parseInt(num / 15);
        if(chess[num] == -1){
            document.getElementsByClassName('ele')[num].style = state ? "background-color: white;": "background-color: black;";
            chess[num] = state? 1: 0;
            state = !state;
            step.push(num);
            win = robot(num);
            // if(win == 0){
            //     alert("黑方获胜！");
            // }
            // else if(win == 1){
            //     alert("白方获胜！");
            // }
        }
    }
}

function restart(){
    initChess();
}

function back(){
    if(step.length > 1 && win == -1){
        var t1 = step.pop();
        var t2 = step.pop();
        chess[t1] = -1;
        chess[t2] = -1;
        document.getElementsByClassName('ele')[t1].style = "";
        document.getElementsByClassName('ele')[t2].style = "";
    }
}

function show(n){
    if(n >= star.length){
        return;
    }
    run(star[n]);
    setTimeout(function(){show(n + 1);}, 1000)
}

function showChess(){
    star = step;
    initChess();
    show(0);
}