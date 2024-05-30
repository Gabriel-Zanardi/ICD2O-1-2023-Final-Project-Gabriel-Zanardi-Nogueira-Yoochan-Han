/* global Phaser */


//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Yoochan and Gabriel
//Created on: May 2024
//This is the phaser game configuration file

/**
 * This class is he Game Scene.
 */
class GameScene extends Phaser.Scene {
    /**
     * this method is the constructor
     */
  
    createCar (tier) {
        //car's spawn position 
      if (tier==1) {
        let carXPosition = //pass = TIER 1
        pass
      } else if(tier==2) {
        let carXPosition = //pass = TIER 1 + P
        pass
      } else {
        let carXPosition = //pass = TIER 1 + P + R
        pass
      }
      const carXLocation = Math.floor(carXPosition * 1920) + 1 // this will get a number betwen 1 and 1920 
      let carXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number betwee 1 and 50
      carXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
      const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
      anAlien.body.velocity.y = 200
      anAlien.body.velocity.x = alienXVelocity
      this.carGroup.add(aCar)
    }
  
    constructor() {
      super({ key: "gameScene"})
  
      this.background = null
      this.car = null
      this.fireMissile = false
      this.money = 0
      this.moneyText = null
      this.level = 0
      this.levelText = null
      this.infoTextStyle = {font: '65px Arial', fill:'#ffffff', align: 'center'}
    }
  
    /**
     * Can be defined on your own Scenes.
     * This method is called by the Scene Manager when the scene starts,
     *   before preload() and create().
     * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
     */
    init(data) {
      this.cameras.main.setBackgroundColor("ffffff")
    }
  
    /**
   * Can be use defined on your own Scenes.
   * Use it to load assets.
   */
  preload() {
    console.log("Game Scene")
    //image
    this.load.image("starBackground", "./assets/starBackground.png")
    this.load.image("ship", "./assets/spaceShip.png")
    this.load.image("missile", "./assets/missile.png")
    this.load.image("alien", "./assets/alien.png")
    //sound
    this.load.audio('laser', './assets/laser1.wav')
    this.load.audio('explosion', './assets/barrelExploding.wav')
    this.load.audio('bomb', './assets/bomb.wav')
  }   
   
    /**
     * Can be defined on your own Scenes.
     * Use it ot create your game objects
     * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
     */
    create(data) { 
      this.background = this.add.image(0, 0, "starBackground").setScale(2.0)
      this.background.setOrigin(0, 0)
  
      this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)
  
      this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship")
  
      //create a group for the missiles
      this.missileGroup = this.physics.add.group()
  
      //create a group for the aliens
      this.alienGroup = this.add.group()
      this.createAlien()
  
      //collisions between ship and alien
      this.physics.add.collider(this.missileGroup, this.alienGroup, function(missileCollide, alienCollide) {
        alienCollide.destroy()
        missileCollide.destroy()
        this.sound.play('explosion')
        this.score = this.score + 1
        this.scoreText.setText('Score: ' + this.score.toString())
        this.createAlien()
        this.createAlien()
      }.bind(this))    
  
      this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
        this.sound.play('bomb')
        this.physics.pause()
        alienCollide.destroy()
        shipCollide.destroy()
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over! \nclick to play again.", this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true})
        this.gameOverText.on('pointerdown', ()=> this.scene.start('gameScene'))
      }.bind(this))
    }
  
    /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running 
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */  
    update(time, delta) {
      const keyLeftObj = this.input.keyboard.addKey("LEFT")
      const keyRightObj = this.input.keyboard.addKey("RIGHT")
      const keySpaceObj = this.input.keyboard.addKey("SPACE")
  
      if (keyLeftObj.isDown === true) {
        this.ship.x -= 15
        if (this.ship.x <0) {
          this.ship.x = 0
        }
      }
      if (keyRightObj.isDown === true) {
        this.ship.x += 15
        if (this.ship.x > 1920) {
          this.ship.x = 1920
        }
      }
      if (keySpaceObj.isDown === true) {
        if (this.fireMissile === false) {
            //fire missile
            this.fireMissile = true
            const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
            this.missileGroup.add(aNewMissile)
            this.sound.play('laser')
          }
        }
  
        if (keySpaceObj.isUp === true) {
          this.fireMissile = false
        }
        this.missileGroup.children.each(function (item) {
          item.y = item.y - 15
          if (item.y < 0) {
            item.destroy()
          }
        })
      }
    }
  
  export default GameScene