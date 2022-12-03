const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7
class Player {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position 
        this.velocity = velocity 
        this.width = 50
        this.height = 150 
        this.lastKey
        this.color = color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
              width: 100,
              height: 50
        }
        this.isAttacking
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
       
        if (this.isAttacking){
            c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x,
             this.attackBox.position.y, 
             this.attackBox.width, 
             this.attackBox.height)
        }
        
    
    }
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else  this.velocity.y += gravity
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
},
offset: {
    x: 0,
    y: 0

}
})


 const playerTwo = new Player({
    position:{
    x: 400,
    y: 100
 },
velocity:{
    x: 0,
    y: 0
},
offset: {
    x: -50,
    y: 0

},
color: 'blue'
})

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
function rectangularCollision({rectangle1, rectangle2}){
    
    return (
         rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
         rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
         rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
         rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

function winner({playerOne, playerTwo, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
if (playerOne.health === playerTwo.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (playerOne.health > playerTwo.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'   
    } else if (playerTwo.health > playerOne.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 wins'   
}
}
let timer = 10
let timerId
function decreaseTimer(){
    timerId = setTimeout(decreaseTimer, 1000)
    if(timer > 0) {timer --
    document.querySelector('#timer').innerHTML = timer}
   if(timer === 0){
    winner({playerOne, playerTwo, timerId})
   }
}
decreaseTimer()
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
if (
    rectangularCollision({
        rectangle1: playerOne,
        rectangle2: playerTwo
    })
   &&
    playerOne.isAttacking)
     {
        playerOne.isAttacking = false
        playerTwo.health -= 20
        document.querySelector('#playerTwoHealth').style.width = playerTwo.health + "%"
    }
 
 if (
    rectangularCollision({
        rectangle1: playerTwo,
        rectangle2: playerOne
    })
   &&
    playerTwo.isAttacking
    ) {
        playerTwo.isAttacking = false
        playerOne.health -= 20
        document.querySelector('#playerOneHealth').style.width = playerOne.health + "%"
    }
     if (playerTwo.health <= 0 || playerOne.health <= 0){
        winner({playerOne, playerTwo, timerId})
     }
}
 
 animation()


 window.addEventListener('keydown', (event) => {
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
        break
         case ' ':
            playerOne.attack()
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
          case 'ArrowDown':
           playerTwo.isAttacking = true
        break
    }
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
 })