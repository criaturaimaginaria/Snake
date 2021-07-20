document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 40
    let currentIndex = 0 // first div in the grid
    let appleIndex = 0 // first div in the grid
    let currentSnake = [2, 1, 0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
    //start & restart------------------------------------------
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 200
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)

      
  
    }

   
  
    //Snake function--------------------------------------------------
    function moveOutcomes() {
  
         // snake touching the border or herself----------------------
         if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if  hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if  hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if  hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||  //if  hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
         ) {
           return clearInterval(interval) //clear the interval if any of the above happen
        }
            
              const tail = currentSnake.pop() //removes last item of the array and shows it
              squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
              currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
            
                    // snake getting the apple------------------------------
                    if(squares[currentSnake[0]].classList.contains('apple')) {
                      squares[currentSnake[0]].classList.remove('apple')
                      squares[tail].classList.add('snake')
                      currentSnake.push(tail)
                      randomApple()
                      score++
                      scoreDisplay.textContent = score
                      clearInterval(interval)
                      intervalTime = intervalTime * speed
                      interval = setInterval(moveOutcomes, intervalTime)

                        //Levels------------------------------------------
                          if(scoreDisplay.innerText  == 2  ){
                            interval = 150 
                          }else if(scoreDisplay.innerText  == 6){
                            interval = 100 
                          }else if(scoreDisplay.innerText  == 10){
                            interval = 50 
                          }else if(scoreDisplay.innerText  == 15){
                            interval = 30 
                          }else if(scoreDisplay.innerText  == 20){
                            interval = 20 
                          }
                        //-------------------------------------------------
                }
           
           squares[currentSnake[0]].classList.add('snake')

    }
  
  
        //generate new apple once apple is eaten------------------------------------------
        function randomApple() {
          do{appleIndex = Math.floor(Math.random() * squares.length)}
             while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
             squares[appleIndex].classList.add('apple')
        }
      
      
          // assing keycodes ----------------------------------------------------------------
          function control(e) {
            squares[currentIndex].classList.remove('snake')
        
                if(e.keyCode === 39) {
                  direction = 1 //key right
                } else if (e.keyCode === 38) {
                  direction = -width // key up
                } else if (e.keyCode === 37) {
                  direction = -1 // key left
                } else if (e.keyCode === 40) {
                  direction =  +width   // key down
                }

            
          }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click' || '32', startGame)
  })


// grid container 40x40 ------------------------------------
for (let i=0; i<1600; i++) {
    let divElement = document.createElement("Div");
    document.getElementById('grid').appendChild(divElement);
}

