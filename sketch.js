let bg = ["#060301"];
// var colors = "193c46-f34e3f-775954".split("-").map(a=>"#"+a)
// var color2 = "d99830-d6ccc4".split("-").map(a=>"#"+a)
let colors=["#193c46", "#f34e3f", "#775954"];
let color2 = ["#d99830", "#d6ccc4"];

var balls=[]
var ball
class ball_class{
  constructor(args){
    this.p=args.p||{x:width/2,y:height/2}
    this.r=args.r||random(0.05,0.3)
    this.c=args.c||random(colors)
    this.v=args.v||{x:random(-3,3),y:random(-3,3)}
    this.s=args.s||random(color2)  //邊框
    this.a=args.a||{X:0,y:random(0,1)} //自由落體
    this.ro=args.ro||random(360)
    this.di=random(1000)
//-------------------------------------------
    this.z=random(1,3)
    let offset = width / 10;
    let margin = offset / 2;
    this.w=(width - offset * 2 - margin * (this.z - 1)) / this.z;    
  }
  draw(){
    push();
      translate(this.p.x,this.p.y);
      angleMode(DEGREES)  //設定為角度
//------------漸層設定------------            
      let offset = width / 10;
      let margin = offset / 2;
      let w = (width - offset * 2 - margin * (this.z - 1)) / this.z;
      let h = (height - offset * 2 - margin * (this.z - 1)) / this.z;    
      
      let d = w;
      //----------------------------------------      
      rotate(this.ro);  //旋轉
//-------漸層--------------------------------      
      let gradient = drawingContext.createLinearGradient(
        w / 2,
        -h / 2,
        w / 2,
        h / 2);
//----------------------------------------------------
      gradient.addColorStop(0,this.c);
      gradient.addColorStop(1,this.s);
//-----------畫圖-------------------------      
      noStroke(); 
      scale(this.r)
      drawingContext.fillStyle = gradient;
      arc(0, 0, d, d, 0, 180, PIE);
      arc(d / 4, 0, d / 2, d / 2, 180, 360, PIE);

      fill(bg);
      arc(-d / 4, 0, d / 2, d / 2, 0, 180, PIE);
      circle(d / 4, -d / 18, d / 4);

      drawingContext.fillStyle = gradient;
      circle(-d / 4, -d / 18, d / 4);
    pop();
  } 
  update(){  //物件更新後的程式碼
    this.p.x=this.p.x+this.v.x
    this.p.y=this.p.y+this.v.y 
    // this.v.y=this.v.y+this.a.y //把往下的速度，每次加一個a
    //a為正值，this.v.y碰到地時，會變成負值，如果兩數相加，this.v.y就會慢慢變成0
    // this.v.x=this.v.x*0.99
    // this.v.y=this.v.y*0.99 
    //反彈
    if(this.p.x<0){
      this.v.x=-this.v.x
    }
    if(this.p.x>width){
      this.v.x=-this.v.x
    }
    if(this.p.y<0){
      this.v.y=-this.v.y
    }
    if(this.p.y>height){
      this.v.y=-this.v.y
    }
  }
  isballInRange(){  //計算
    //d:把目前這個物件的位置與滑鼠間的距離
    let d=dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.w){
      return true
    }else{
      return false
    }   
  }
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  for(i=0;i<30;i=i+1){  //產生幾個
    ball=new ball_class({ //傳一段參數值到class，以參數為主
      p:{x:random(0,width),y:random(0,height)}, 
      v:{x:random(-8,5),y:random(-8,5)}
    })
    balls.push(ball)  //把數據存入
  }
  fill("#fff321")
  textSize(70)
  score=0
  text("得分："+score,50,80)
}

function draw() {
  background(bg);
  for(j=0;j<balls.length;j=j+1){
    ball=balls[j]
    ball.draw()
    ball.update()
//-------滑鼠靠近會跑-----------   
    if(ball.isballInRange()){
      // ball.c="#960018"
      ball.v.x=ball.v.x+1
      ball.v.y=ball.v.y+1
    }
  }
  fill("#fff321")
  textSize(70)
  text("得分："+score,50,80)
}


function mousePressed(){
//--------新增-------------  
  // ball=new ball_class({ //傳一段參數值到class，以參數為主
  //   p:{x:mouseX,y:mouseY}, 
  //   v:{x:random(-2,2),y:2},
  // })
  // balls.push(ball)  //把數據存入
//--------消失-------------
  for(let ball of balls){  //balls放者所有的物件，每次就拿出一個物件放入ball
    if(ball.isballInRange()){
    balls.splice(balls.indexOf(ball),1) //刪除一個物件
    score=score+1 
    }
  } 
  fill("#fff321")
  textSize(70)
  text("得分："+score,50,80)
}
