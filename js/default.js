/**
 * Created by maple on 16-12-15.
 */
var jsHeadTitle=document.getElementById('headTitle');//获取标题
var jsHeadBird=document.getElementById('headBird');//获取标题中小鸟
var jsWrapBg=document.getElementById('warpBg');//获取背景界面


var Y=3;//标题的摆动幅度
var index=0;
var imgArr=["img/bird1_0.png","img/bird1_1.png","img/bird1_2.png"];
// 将小鸟运动图片路径放入一个数组中，利用逐帧动画的原理做出小鸟翅膀摆动的样子
var headWaveTimer=setInterval(headWave,200);//设置标题上下摆动定时器
function headWave() {
    Y *=-1;
    jsHeadTitle.style.top=jsHeadTitle.offsetTop+Y+"px";
    //offset方法设置当前选定元素偏移量
    jsHeadBird.src = imgArr[index];
    index++;
    if(index == 3){
        index=0;
    }
}


var jsGrassLand1=document.getElementById('grassLand1');
var jsGrassLand2=document.getElementById('grassLand2');
// 获取两块草地

var landTimer=setInterval(landRun,30);
//设置草地运动计时器
var blocksArr = [];

function landRun() {
    if (jsGrassLand1.offsetLeft <= -343) {
        jsGrassLand1.style.left = "343px";
    }
    if (jsGrassLand2.offsetLeft <= -343) {
        jsGrassLand2.style.left = "343px";
    }

    jsGrassLand1.style.left = jsGrassLand1.offsetLeft - 3 + "px";
    jsGrassLand2.style.left = jsGrassLand2.offsetLeft - 3 + "px";


    //管道实现
    if (blocksArr.length) {
        for (var i = 0; i < blocksArr.length; i++) {
            //移动数组中相应管道
            blocksArr[i].moveBlock();
            //检测下管道是否与鸟碰撞
            var x = baseObj.rectangleCrashExamine(blocksArr[i].downDivWrap, bird.div);
            //检测上管道是否与鸟碰撞
            var y = baseObj.rectangleCrashExamine(blocksArr[i].upDivWrap, bird.div);
            //检测鸟是否落地
            var z = bird.div.offsetTop >= 390;
            //以上三个条件任一成立，游戏结束
            if (x || y || z) {
                window.clearInterval(landTimer);//清除landTimer定时器
                bird.fallSpeed = 0; //小鸟下落
                jsWrapBg.onclick = null; //消除点击事件
            }
        }

        //生成后续管道
        if (blocksArr[blocksArr.length - 1].downDivWrap.offsetLeft < (450 - blockDistance)) {
            blockDistance = baseObj.randomNum(130, 250);
            var newBlock = new Block();
            newBlock.createBlock();
            blocksArr.push(newBlock);
        }
        //清除超出范围管道
        if (blocksArr[0].downDivWrap.offsetLeft < -50) {
            jsWrapBg.removeChild(blocksArr[0].downDivWrap);
            jsWrapBg.removeChild(blocksArr[0].upDivWrap);
            blocksArr.shift(blocksArr[0]);
        }
    }
}

    var jsStartBtn = document.getElementById("startBtn");
    jsStartBtn.onclick = function () {
        //start添加点击事件处理程序
        jsHeadTitle.style.display = "none";//隐藏标题
        clearInterval(headWaveTimer);//清除标题摆动计时器
        jsStartBtn.style.display = "none";//隐藏开始按键

        bird.showBird(jsWrapBg); //插入小鸟到界面中
        bird.flyBird(); //控制小鸟飞翔下落
        bird.wingWave(); //逐帧动画，小鸟煽动翅膀
        jsWrapBg.onclick = function () {
            bird.fallSpeed = -8;
            // bird.flyBird();
        };
        blockDistance = baseObj.randomNum(130, 250);
        var newBlock = new Block();
        newBlock.createBlock();
        // console.log(newBlock);
        blocksArr.push(newBlock);
    };


