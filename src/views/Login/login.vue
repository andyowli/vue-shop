<template>
    <div class="box">
        <canvas id="canvas" ></canvas>  

        <div class="main-w3layouts wrapper">
            <div class="main-agileinfo">
                <div class="agileits-top"> 
                    <form action="#" method="post"> 
                        <input class="text" type="text" name="Username" placeholder="Username" required="" id="username" v-model="username">
                        <input class="text" type="password" name="password" placeholder="Password" required="" id="passw" v-model="password">
                        
                        <input type="button" value="LOGIN" id="btn" @click="loginTo">
                    </form>
                </div>	 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:'宇文所拓',
            password:'123'
        }
    },
    methods:{
        loginTo(){
            let obj = {
                user:this.username,
                paw:this.password
            }
            // console.log(obj);
            this.$store.commit('setUser',obj);
            // console.log(this.$store.state.userinfo);
            if(obj.user === '宇文所拓' || obj.paw === 123){
                localStorage.setItem('user',obj.user);
                this.$router.push('/Layout');
            }
        }
    },
    mounted(){
        class Circle {
            //创建对象
            //以一个圆为对象
            //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
            //this.r是创建圆的半径，参数越大半径越大
            //this._mx,this._my是移动的距离，参数越大移动
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = Math.random() * 10 ;
                this._mx = Math.random() ;
                this._my = Math.random() ;

            }

            //canvas 画圆和画直线
            //画圆就是正常的用canvas画一个圆
            //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
            drawCircle(ctx) {
                ctx.beginPath();
                //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
                ctx.arc(this.x, this.y, this.r, 0, 360)
                ctx.closePath();
                ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
                ctx.fill();
            }

            drawLine(ctx, _circle) {
                let dx = this.x - _circle.x;
                let dy = this.y - _circle.y;
                let d = Math.sqrt(dx * dx + dy * dy)
                if (d < 150) {
                    ctx.beginPath();
                    //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
                    ctx.moveTo(this.x, this.y);   //起始点
                    ctx.lineTo(_circle.x, _circle.y);   //终点
                    ctx.closePath();
                    ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
                    ctx.stroke();
                }
            }

            // 圆圈移动
            // 圆圈移动的距离必须在屏幕范围内
            move(w, h) {
                this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
                this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
                this.x += this._mx / 2;
                this.y += this._my / 2;
            }
        }
        //鼠标点画圆闪烁变动
        class currentCirle extends Circle {
            constructor(x, y) {
                super(x, y)
            }

            drawCircle(ctx) {
                ctx.beginPath();
                //注释内容为鼠标焦点的地方圆圈半径变化
                //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
                this.r = 8;
                ctx.arc(this.x, this.y, this.r, 0, 360);
                ctx.closePath();
                //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
                // ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
                ctx.fill();

            }
        }
        //更新页面用requestAnimationFrame替代setTimeout
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let w = canvas.width = canvas.offsetWidth;
        let h = canvas.height = canvas.offsetHeight;
        let circles = [];
        let current_circle = new currentCirle(0, 0)

        let draw = function () {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < circles.length; i++) {
                circles[i].move(w, h);
                circles[i].drawCircle(ctx);
                for (let j = i + 1; j < circles.length; j++) {
                    circles[i].drawLine(ctx, circles[j])
                }
            }
            if (current_circle.x) {
                current_circle.drawCircle(ctx);
                for (var k = 1; k < circles.length; k++) {
                    current_circle.drawLine(ctx, circles[k])
                }
            }
            requestAnimationFrame(draw)
        }

        let init = function (num) {
            for (var i = 0; i < num; i++) {
                circles.push(new Circle(Math.random() * w, Math.random() * h));
            }
            draw();
        }
        window.addEventListener('load', init(60));
        window.onmousemove = function (e) {
            e = e || window.event;
            current_circle.x = e.clientX;
            current_circle.y = e.clientY;
        }
        window.onmouseout = function () {
            current_circle.x = null;
            current_circle.y = null;

        };
    }
}
</script>

<style lang="scss" scoped>
    .box{
        height: 100%;
    }
    canvas{
        width: 100%;
        height: 100%;
        display: block;
    }
    .main-w3layouts {
        width: 100%;
        height: 100%;
        // padding: 3em 0 0;
    }
    .main-agileinfo {
        width: 30%;
        // margin: 3.5em auto;
        background: rgba(41, 5, 105, 0.43);
        background-size: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
    }
    .agileits-top {
        padding: 0.5em 3em 3em; 
    }
    input[type="text"],input[type="password"]{
        font-size: 1em;
        color: #fff;
        font-weight:100;
        margin: 1em 0 0;
        width: 87%;
        display: block;
        border: none;
        padding: 1.5em;
        border-bottom: solid 1px #fff;
        -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
        transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
        background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #fff 4%);
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #fff 4%);
        background-position: -800px 0;
        background-size: 100%;
        background-repeat: no-repeat;
        color: #fff;
    }  
    .text:focus, .text:valid {
        box-shadow: none;
        outline: none;
        background-position: 0 0;
    }
    .text:focus::-webkit-input-placeholder, .text:valid::-webkit-input-placeholder {
        color: #FFC107;
        font-size: .9em;
        -webkit-transform: translateY(-20px);
        -moz-transform: translateY(-20px);
        -o-transform: translateY(-20px);
        -ms-transform: translateY(-20px);
        transform: translateY(-20px);
        visibility: visible !important;
    }
    ::-webkit-input-placeholder {
    color: #fff;  
    font-weight:100;
    } 
    :-moz-placeholder { /* Firefox 18- */
    color: #fff; 
    } 
    ::-moz-placeholder {  /* Firefox 19+ */
    color: #fff;  
    } 
    :-ms-input-placeholder {  
    color: #fff;  
    } 
    input[type="button"] {
        font-size: 1em;
        color: #fff;
        background: #6439af;
        outline: none;
        border: none;
        cursor: pointer;
        padding: 1em;
        -webkit-appearance: none;
        width: 100%;
    }
    input[type="button"]:hover { 
        background: #8a2be2;
        -webkit-transform: translateY(8px);
        -ms-transform: translateY(8px);
        -o-transform: translateY(8px);
        -ms-transform: translateY(8px);
        transform: translateY(8px);
        -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.58);
        -moz-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.58);  
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.58); 
        -webkit-transition: .5s all;
        -moz-transition: .5s all;
        -o-transition: .5s all;
        -ms-transition: .5s all;
        transition: .5s all;
    }
    #btn{
        margin-top: 24px;
    }
    .agileits-top p {
        font-size: 1em;
        color: #fff;
        text-align: center;
        letter-spacing: 1px;
    }
    .agileits-top p a {
        color: #fff;
        -webkit-transition: .5s all;
        -moz-transition: .5s all;
        transition: .5s all;
    }
    .agileits-top p a:hover{
        color: #FFC107; 
    }
    /*-- //checkbox --*/  
    /*-- copyright --*/
    .w3copyright-agile {
        margin: 2em 0 1em;
        text-align: center;
    }
    .w3copyright-agile p {
        font-size: 1em;
        color: #fff;
        line-height:1.8em;
    }
    .w3copyright-agile p a{
        color: #fff;
    }
    .w3copyright-agile p a:hover{
        color: #FFC107;
        transition: 0.5s all;
        -webkit-transition: 0.5s all;
        -moz-transition: 0.5s all;
        -o-transition: 0.5s all;
        -ms-transition: 0.5s all;
    }
    .w3lsg-bubbles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>