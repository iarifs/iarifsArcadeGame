//****Count the level && boolean for checking the character  hits or not;
let levelCounter = 1;
let hit = false;


//DOM selector for updating our html file;
const level = document.querySelector(".level");
const life = document.querySelector(".life");
const allLives = document.getElementsByTagName('i');


///Our enemy object constructor that will creat our all enemy
const Enemy = function (x, y) {

    /*
    @selecting our image by this.sprite
    @this.x is a x coordinate for enemy prototype
    @this.y is a y coordinate for enemy prototype
    @this.pace is speed tracker
    */

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.pace = Math.floor((Math.random() * 3) + 1);
};

//This is update method of your enemy object

Enemy.prototype.update = function (dt) {

    /*
    @if statement for checking that our enemies coming back to the screen;
    @and also it adds speed value in every enemy's x value.
     */

    if (this.x > 505) {
        this.x = -70;
        this.pace = Math.floor((Math.random() * 5) + levelCounter);
    }
    this.x += this.pace;
};

//This is our render method and it is draw the canvas.

Enemy.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//This is our player object constructor to make our player object.
const Player = function (x, y) {
    /*
    @this.x is for x coordinate in player object.
    @this.y is for y coordinate in player object.
    @this.sprite is for image of our character.
    */
    this.x = x;
    this.y = y
    this.sprite = 'images/char-boy.png';
}

//player update function ,that will move our charachter.

Player.prototype.update = function () {

    //This check collision function is checking collision part.
    /*This for loop is looping throgh all the enemies 
    @this big if statement are checking character is hitting or not hitting */
    for (const enemy of allEnemies) {

        if (this.x >= enemy.x - 60 && this.x <= enemy.x + 65 && this.y >= enemy.y - 50 && this.y <= enemy.y) {

            /*if it hits then  it check if the lives length are less than 1 or equal to 1*/
            if (allLives.length <= 1) {
               
                //it prints a sweetalert box.
                swal({
                    type: "error",
                    title: "Ooops! You have no lives left.Try Again!!!",
                    onAfterClose: resetGame(),
                    grow: "fullscreen",
                })

            } else {
                //otherWise it will remove a heart from the html
                allLives[allLives.length - 1].remove();
                swal({
                    type: 'error',
                    title: `You have ${allLives.length} lives left ,Try Again!!!`,
                    timer: 1200,
                })
            }
            //it will reset our character position to initial position that means 370.           
            this.y = 370;
            hit = true;
        }
    }
}
Player.prototype.render = function () {
    //drawing our player.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function (clk) {

    //This listens for key presses and sends the keys to your
    // player.handleInput() method. 

    if ((clk === "left") && (this.x > 0)) {
        this.x -= 100;
    }
    if ((clk === "right") && (this.x < 400)) {
        this.x += 100;
    }
    if ((clk === "up") && (this.y > 0)) {
        this.y -= 83;
    }

    if ((clk === "down") && (this.y < 370)) {
        this.y += 83;
    }

    if (this.y === -45) {
        
        level.innerText = `Level ${++levelCounter}`;
        setTimeout(function () {
            player.y = 370;
        }, 100);

    }
    addMoreEnemy();
}
//This function add more enemies after certain level:
const addMoreEnemy = function () {
    //checking levelcounter and allEnemies length;
    if (levelCounter > 4 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(-100, 60));
    }
    if (levelCounter > 6 && allEnemies.length < 5) {
        allEnemies.push(new Enemy(-100, 145));

    }
    if (levelCounter > 8 && allEnemies.length < 6) {
        allEnemies.push(new Enemy(-100, 230));
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(200, 370);

const firstEnemy = new Enemy(0, 60);
const secondEnemy = new Enemy(0, 145);
const thirdEnemy = new Enemy(0, 230);

let allEnemies = [firstEnemy, secondEnemy, thirdEnemy]; //An array for storing all enemies into a on array.

//Function that checking key press
const allowedKeys = function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};
///This is for reset the whole game after loosing all lifes.
const resetGame = function () {
    if (hit) {
        levelCounter = 1;
        level.innerText = `Level ${levelCounter}`;
    }
    while (allEnemies.length > 3) {
        allEnemies.pop();
    }
    life.innerHTML = 'Lives: <i class="fas fa-heart"></i> <i class="fas fa-heart"></i> <i class="fas fa-heart"></i>';
    hit = false;
}
///add event listener in the body and add keyup.
document.addEventListener('keyup', allowedKeys);