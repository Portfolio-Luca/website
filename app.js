window.addEventListener('keydown', function(e) { //pressing space wont cause user to scroll
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

  

document.addEventListener('DOMContentLoaded', () => {
const man= document.querySelector('.man')
const grid=document.querySelector('.grid')
const scores = document.getElementById('scores');
const alert=document.getElementById('alert')
const resetBtn = document.querySelector('.reset-button')



document.querySelector('.restart-btn').addEventListener('click', function(){
    window.location.reload();
    return false;
  });

let isJumping=false; 
let gravity= .9;
let gameOver = false;

function control(e){
        if (e.keyCode === 32){// spacebar is 32
            if(!isJumping){
                isJumping= true
                jump()
            }
            
            
        } 
    }
    document.addEventListener('keyup', control)
    let position= 2
    function jump(){
    let count = 0
    let timerID = setInterval(function(){

           //fall down
            if(count === 15){
                clearInterval(timerID)
                console.log('down')
                let downTimerID = setInterval(function(){
                   if(count===0){
                    clearInterval(downTimerID)
                    isJumping=false
                   }
                    position-=3
                    count --
                    position= position*gravity
                    man.style.bottom = position + 'px'    
                },20)
                
            }

           //jump up
            console.log('up')
            count++
            position+=20
            position = position*gravity
            man.style.bottom = position + 'px'
            console.log(man.style.bottom)
        },30)
    }

    function generateObstacles(){
        let randomTime= Math.random()*4000
        let obstaclePosition= 700;
        const obstacle = document.createElement('div')
        if(!gameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerID=setInterval(function(){
            if(obstaclePosition>0 && obstaclePosition<60 && position<60){
            clearInterval(timerID)
            alert.innerHTML='GAME OVER'
            gameOver= true
            score+=1
            //remove all children

            while(grid.firstChild){
                grid.removeChild(grid.lastChild)
            }
        }
            obstaclePosition-=10
            obstacle.style.left = obstaclePosition + 'px'
            
        },20)
        if (!gameOver) setTimeout(generateObstacles, randomTime)

    }
    generateObstacles()


})