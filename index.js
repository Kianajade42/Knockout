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
    imageSrc:'./img/background/background_layer_104.png',
     scale: 3.2
})

  const playerOne = new Character({
    position: {
    x: 30,
    y: 0
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
    scale: 2.5,
    offset: {
    x: 215,
    y: 95
    //60
 },
    sprites: {
    idle: {
    imageSrc: './img/PlayerOne/Sprites/Idle.png',
    framesMax: 8
},
    run: {
    imageSrc: './img/PlayerOne/Sprites/Run.png',
    framesMax: 8
},
    jump: {
    imageSrc: './img/PlayerOne/Sprites/Jump.png',
    framesMax: 2
},
    fall: {
    imageSrc: './img/PlayerOne/Sprites/Fall.png',
    framesMax: 2
},
    attack1: {
    imageSrc: './img/PlayerOne/Sprites/Attack1.png',
    framesMax: 6
},
    takeHit:{
    imageSrc: './img/PlayerOne/Sprites/Take Hit - white silhouette.png',
    framesMax: 4
 },
    death: {
    imageSrc: './img/PlayerOne/Sprites/Death.png',
    framesMax: 6
 },
    attackBox: {
    offset: {
        x:100,
        y:50,
    },
    width: 160,
    height: 50
},
    }
})


 const playerTwo = new Character({
    position:{
    x: 930,
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
imageSrc: './img/PlayerTwo/Sprites/Idle.png',
 framesMax: 4,
 scale: 2.5,
 offset: {
    x: 215,
    y: 110
    //77
 },
 sprites: {
    idle: {
    imageSrc: './img/PlayerTwo/Sprites/Idle.png',
    framesMax: 4
},
    run: {
    imageSrc: './img/PlayerTwo/Sprites/Run.png',
    framesMax: 8
},
    jump: {
    imageSrc: './img/PlayerTwo/Sprites/Jump.png',
    framesMax: 2
},
    fall: {
    imageSrc: './img/PlayerTwo/Sprites/Fall.png',
    framesMax: 2
},
    attack1: {
    imageSrc: './img/PlayerTwo/Sprites/Attack1.png',
    framesMax: 4
},
    takeHit:{
    imageSrc: './img/PlayerTwo/Sprites/Take hit.png',
    framesMax: 3 
 },
    death: {
    imageSrc: './img/PlayerTwo/Sprites/Death.png',
    framesMax: 7
 },
    attackBox: {
    offset: {
        x:-170,
        y:50,
    },
    width: 170,
    height: 50
},
 }
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
playerTwo.update()

playerOne.velocity.x = 0
playerTwo.velocity.x = 0

//Player one

if (keys.a.pressed && playerOne.lastKey === 'a'){
    playerOne.velocity.x = -5
    playerOne.switchSprite('run')
} else if (keys.d.pressed && playerOne.lastKey === 'd' ){
    playerOne.velocity.x = 5
    playerOne.switchSprite('run')
}  else {
    playerOne.switchSprite('idle')
}

    if (playerOne.velocity.y < 0){
        playerOne.switchSprite('jump') 
    } else if (playerOne.velocity.y > 0){
        playerOne.switchSprite('fall')
    }

//player two
if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft'){
    playerTwo.velocity.x = -5
    playerTwo.switchSprite('run')
} else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight' ){
    playerTwo.velocity.x = 5
    playerTwo.switchSprite('run')
} else {
    playerTwo.switchSprite('idle')
}

    if (playerTwo.velocity.y < 0){
        playerTwo.switchSprite('jump') 
    } else if (playerTwo.velocity.y > 0){
        playerTwo.switchSprite('fall')
    }
    
if (
    rectangularCollision({
        rectangle1: playerOne,
        rectangle2: playerTwo
    }) &&
    playerOne.isAttacking && 
    playerOne.framesCurrent === 4
    ) {
        playerTwo.takeHit()
        playerOne.isAttacking = false
        // playerTwo.health -= 20
        document.querySelector('#playerTwoHealth').style.width = playerTwo.health + "%"
    }
 
     if ( playerOne.isAttacking && playerOne.framesCurrent === 4 ){
        playerOne.isAttacking = false
     }
     
 if (
    rectangularCollision({
        rectangle1: playerTwo,
        rectangle2: playerOne
    }) &&
    playerTwo.isAttacking && playerTwo.framesCurrent === 2
    ) {
        playerOne.takeHit()
        playerTwo.isAttacking = false
        document.querySelector('#playerOneHealth').style.width = playerOne.health + "%"
    }
 if ( playerTwo.isAttacking && playerTwo.framesCurrent === 2 ){
        playerTwo.isAttacking = false
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
    }

        //player two
        switch (event.key) {
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
         playerTwo.attack()
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
