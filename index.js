const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.2
class Player {
    constructor({position, velocity}) {
        this.position = position 
        this.velocity = velocity 
        this.height = 150 
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)

    }
    update() {
        this.draw()
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
 
function animation(){
window.requestAnimationFrame(animation)
c.fillStyle ='black'
c.fillRect(0,0,canvas.width, canvas.height)
playerOne.update()
playerTwo.update()
 }
 animation()