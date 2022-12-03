const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7
const background = new Player({
    position:{
        x:0,
        y:0
    },
    imageSrc:'./img/background/background_layer_1.png',
    scale: 4
})
  const playerOne = new Character({
    position: {
    x: 0,
    y: 245
 },
velocity: {
    x: 0,
    y: 0
},
offset: {
    x: 0,
    y: 0

},
imageSrc: './img/PlayerOne/Sprites/Idle.png',
 framesMax: 8,
 scale: 2.7,
//  offset: {
// x: 215,
// y: 150
//  }
})


 const playerTwo = new Character({
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

decreaseTimer()

function animation(){
window.requestAnimationFrame(animation)
c.fillStyle ='black'
c.fillRect(0,0,canvas.width, canvas.height)
background.update()
playerOne.update()
// playerTwo.update()

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