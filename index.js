const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7
class Player {
    constructor({position, velocity}) {
        this.position = position 
        this.velocity = velocity 
        this.height = 150 
        this.lastKey
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)

    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else  this.velocity.y += gravity
    }
}

  const playerOne = new Player({
    position: {
    x: 0,
    y: 0
 },
velocity: {
    x: 0,
    y: 0
}
})

//  playerOne.draw()

 const playerTwo = new Player({
    position:{
    x: 400,
    y: 100
 },
velocity:{
    x: 0,
    y: 0
}
})
//  playerTwo.draw()
 const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }

 }


function animation(){
window.requestAnimationFrame(animation)
c.fillStyle ='black'
c.fillRect(0,0,canvas.width, canvas.height)
playerOne.update()
playerTwo.update()

playerOne.velocity.x = 0
playerTwo.velocity.x = 0
//Player one
if (keys.a.pressed && playerOne.lastKey === 'a'){
    playerOne.velocity.x = -5
} else if (keys.d.pressed && playerOne.lastKey === 'd' ){
    playerOne.velocity.x = 5
}
//player two
if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft'){
    playerTwo.velocity.x = -5
} else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight' ){
    playerTwo.velocity.x = 5
}
 }

 animation()


 window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        //player one
        case 'd' :
       keys.d.pressed = true
       playerOne.lastKey = 'd'
        break
         case 'a' :
       keys.a.pressed = true
       playerOne.lastKey = 'a'
        break
          case 'w' :
       playerOne.velocity.y = -20
       playerOne.lastKey = 'w'
        break
        //player two
        case 'ArrowRight' :
       keys.ArrowRight.pressed = true
       playerTwo.lastKey = 'ArrowRight'
        break
         case 'ArrowLeft' :
       keys.ArrowLeft.pressed = true
       playerTwo.lastKey = 'ArrowLeft'
        break
          case 'ArrowUp' :
       playerTwo.velocity.y = -20
        break
    }
    console.log(event.key)
 })
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //player one
        case 'd' :
       keys.d.pressed = false
        break
          case 'a' :
       keys.a.pressed = false
        break
        //player two
          case 'ArrowRight' :
       keys.ArrowRight.pressed = false
        break
          case 'ArrowLeft' :
       keys.ArrowLeft.pressed = false
        break
    }
    console.log(event.key)
 })