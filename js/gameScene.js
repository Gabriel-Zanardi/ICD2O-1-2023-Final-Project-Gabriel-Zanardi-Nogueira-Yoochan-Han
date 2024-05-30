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
        const carXPosition = //pass = TIER 1
        pass
      } else if(tier==2) {
        const carXPosition = //pass = TIER 1 + P
        pass
      } else {
        const carXPosition = //pass = TIER 1 + P + R
        pass
      }
      const aCar = this.physics.add.sprite(carXLocation, -100, 'alien')
      aCar.body.velocity.y = 200
      aCar.body.velocity.x = alienXVelocity
      this.carGroup.add(aCar)
    }
  
    constructor() {
      super({ key: "gameScene"})
  
      this.background = null
      this.carLv1 = null
      this.carLv2 = null
      this.carLv3 = null
      this.carLv4 = null
      this.carLv5 = null
      this.carLv6 = null
      this.carLv7 = null
      this.carLv8 = null
      this.carLv9 = null
      this.carLv10 = null
      this.tier = 0
      this.tierText = null
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
    this.load.image("carLv1", "./assets/Biat-lv1.png")
    this.load.image("carLv2", "./assets/Fride-lv2.png")
    this.load.image("carLv3", "./assets/Shinjisis-lv3.png")
    this.load.image("carLv4", ".assets/Biat-lv1.png")
    this.load.image("carLv5", ".assets/Biat-lv1.png")
    this.load.image("carLv6", ".assets/Biat-lv1.png")
    this.load.image("carLv7", ".assets/Biat-lv1.png")
    this.load.image("carLv8", "./assets/Igniz-lv8.png")
    this.load.image("carLv9", ".assets/Biat-lv1.png")
    this.load.image("carLv10", ".assets/Biat-lv1.png")
    this.load.image("missile", "./assets/missile.png")
    this.load.image("alien", "./assets/alien.png")
    //sound
    this.load.audio('Bonk', './assets/Bonk.wav')
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
  
      this.moneyText = this.add.text(10, 10, "Money: " + this.money.toString(), this.infoTextStyle)
      
      //create a group for the missiles 
      this.carGroup = this.physics.add.group()
  
      //create a group for the missiles
      this.missileGroup = this.physics.add.group()
  
  
      //collisions between belt and car
      this.physics.add.collider(this.belt, this.carGroup, function(beltCollide, carCollide) {
        this.sound.play('Bonk')   // BONK

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