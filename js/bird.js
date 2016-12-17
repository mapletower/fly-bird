/**
 * Created by maple on 16-12-15.
 */
var bird={
    flyTimer:null,//小鸟飞行计时器
    wingTimer:null,//小鸟翅膀摆动计时器

    div:document.createElement('div'),
    showBird:function (parentObj) {
        this.div.style.width="40px";
        this.div.style.height="40px";
        this.div.style.backgroundImage="url(img/bird1_0.png)";
        this.div.style.backgroundRepeat="no=repeat";
        this.div.style.position="absolute";
        this.div.style.left="50px";
        this.div.style.top="200px";
        this.div.style.zIndex="1";

        parentObj.appendChild(this.div);//将小鸟DIV插入游戏界面
    },
    fallSpeed:0,//小鸟下落速度
    flyBird:function () {
        //控制小鸟下落的函数
        bird.flyTimer=setInterval(fly,40);
        function fly() {
            bird.div.style.top=bird.div.offsetTop+bird.fallSpeed++ +"px";
            if (bird.div.offsetTop<0){
                bird.fallSpeed=2;//控制小鸟不要飞出界面
            }
            if(bird.div.offsetTop >= 395){
                bird.fallSpeed=0;//下落速度设为0
                clearInterval(bird.flyTimer);//一旦飞到地面，清除计时器
                clearInterval(bird.wingTimer);//清除翅膀摆动定时器
            }
            if(bird.fallSpeed>12){
                bird.fallSpeed=12;//鸟的最大下落速度控制在12
            }
            // console.log(bird.fallSpeed);
        }
    },
    wingWave:function () {
        var action=["url(img/bird1_0.png)","url(img/bird1_1.png)","url(img/bird1_2.png)"];
        var i=0,j=0;
        bird.wingTimer=setInterval(wing,80);//逐帧动画，小鸟煽动翅膀
        function wing() {
                bird.div.style.backgroundImage=action[i++];
                if(i==2){i=0}
                bird.div.style.backgroundImage=action[j++];
                if(j==2){j=0}
        }

    }
};

