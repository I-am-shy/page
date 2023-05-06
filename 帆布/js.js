const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// 定义爆炸容器
class ball{

    
    //类构造方法
    constructor(x,y,dirx,diry,color){
        // 起始位置 
        this.x = x;
        this.y = y;

        //字体位置
        this.tx =x;
        this.ty =y;
        // 爆炸方向
        this.dirx = dirx;
        this.diry = diry;

        // 大小
        this.radius = 3;
        // 透明度
        this.opcity = 4;
        // 颜色
        this.color = color;
    }
   
    // 绘画函数
    draw(){
        
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        // 添加字体
        // ctx.font="100px 宋体";
        // ctx.fillText("Hello World",this.tx/2,this.ty); 


        ctx.fill();
        ctx.closePath();
        
    }
    //更新
    update(){
        this.dirx *= 0.99;
        this.diry *= 0.99;
        this.diry += 0.1;
        this.x += this.dirx;
        this.y += this.diry;
        this.opcity -=0.01;
        this.draw();
        
    }
}

//容器
const balls = [];

// 动画
function animate(){

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i = 0;i<balls.length;i++){
        balls[i].update();
        // 透明度小于0.1删除
        if(balls[i].opcity < 0.1){
          
            balls.splice(i,1);
        }
      
    }
    
    requestAnimationFrame(animate);

}
animate();

// 鼠标事件
canvas.addEventListener("click",(e)=>{
    // 爆炸后的数量
    let num = 400;
    // 偏移弧度
    let hudu = Math.PI * 2/num;
    // 循环创建
    for(let i = 0;i < num;i++){
        balls.push(new ball(
            // 鼠标点击的位置
            e.x,
            e.y,

            //爆炸方向
            Math.cos(hudu * i) *(Math.random()*7),
            Math.sin(hudu * i) *(Math.random()*7),
            //颜色(闪烁由亮变暗)
            `hsl(${Math.random() * 360},50%,50%)`
        ))
       
    }
       
   
})
canvas.addEventListener("mousemove",(e)=>{
   
   
    
        balls.push(new ball(
            // 鼠标点击的位置
            e.x,
            e.y,

            //爆炸方向
            1,
            1,
            //颜色(闪烁由亮变暗)
            `hsl(${Math.random() * 360},50%,50%)`
        ))
        
   
})
