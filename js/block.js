/**
 * Created by maple on 16-12-16.
 */
function Block() {
    this.upDivWrap = null;
    this.downDivWrap = null;
    this.downHeight = baseObj.randomNum(50,150);
    this.gapHeight = baseObj.randomNum(160,180);
    this.upHeight = 480 - this.downHeight - this.gapHeight;

    //用来生成Div的方法
    this.createDiv = function (url, height, positionType, left, top,f) {
        //创建柱子
        var newDiv = document.createElement("div");
        //设置柱子样式
        newDiv.style.width = "55px";
        newDiv.style.height = height;
        newDiv.style.position = positionType;
        newDiv.style.left = left;
        newDiv.style.backgroundRepeat="no-repeat";
        newDiv.style.top = top;
        newDiv.style.backgroundImage = url;
        newDiv.style.backgroundPositionY = f;
        return newDiv;
    };

    this.createBlock=function () {
        var upDiv = this.createDiv("url(img/pipe_down.png)", this.upHeight + "px",null,null,null,"bottom");
        this.upDivWrap = this.createDiv(null,null,"absolute","450px",null,'#fff');
        this.upDivWrap.appendChild(upDiv);
        //生成上方管道

        var downDiv = this.createDiv("url(img/pipe_up.png)",this.downHeight + "px");
        this.downDivWrap = this.createDiv(null,null,"absolute","450px",425 - this.downHeight + "px");
        this.downDivWrap.appendChild(downDiv);
        //生成下方管道

        jsWrapBg.appendChild(this.downDivWrap);
        jsWrapBg.appendChild(this.upDivWrap);
        //将管道加入到背景中
    };
    this.moveBlock = function () {
        //控制管道移动的方法
        this.upDivWrap.style.left = this.upDivWrap.offsetLeft - 3 +"px";
        this.downDivWrap.style.left = this.downDivWrap.offsetLeft - 3 +"px";
    };

    this.createEnd = function () {
        var endDiv = this.createDiv("url(img/score_panel.png)","120px","absolute","53px","150px");
        endDiv.style.width = "235px";

        var restart = this.createDiv("url(img/button_ok.png)","30px","absolute","130px","280px");
        restart.style.width =80 + "px";

        var gameOver = this.createDiv("url(img/game-over.png)","60px","absolute","70px","100px")
        gameOver.style.width = 200 + "px";

        changeScore(194,80);

        jsWrapBg.appendChild(endDiv);
        jsWrapBg.appendChild(restart);
        jsWrapBg.appendChild(gameOver);
        restart.onclick = function () {
            window.location.href = "index.html"
        }
    }
}


var baseObj = {
    //生成随机数
    randomNum: function (min,max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    },

    //矩形元素之间碰撞检测：当小鸟撞到管道时游戏结束
    rectangleCrashExamine:function (obj1, obj2) {
        var obj1Left = obj1.offsetLeft;
        var obj1Width = obj1.offsetLeft + obj1.offsetWidth;
        var obj1Top = obj1.offsetTop;
        var obj1Height = obj1.offsetTop + obj1.offsetHeight;

        var obj2Left = obj2.offsetLeft;
        var obj2Width = obj2.offsetLeft + obj2.offsetWidth;
        var obj2Top = obj2.offsetTop;
        var obj2Height = obj2.offsetTop + obj2.offsetHeight;

        return (!(obj1Left>obj2Width || obj1Width<obj2Left || obj1Top>obj2Height || obj1Height<obj2Top));
    }
};

