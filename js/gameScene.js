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
    
    createCar() {
      console.log("check")
        //car's spawn position 
      if (this.tier==1) {
        this.carXPosition = 1900 / 2 - 300
      } 
      // else if(tier==2) {
      //   const carXPosition = //pass = TIER 1 + P
      //   pass
      // } else {
      //   const carXPosition = //pass = TIER 1 + P + R
      //   pass
      // }
      for(let counter=1;counter>=10;counter++) {
        console.log(this.carLevel)
        if(counter == this.carLevel) {  //car level
          this.newCar = this.physics.add.sprite(carXLocation, -100, "carLv1")
          continue
        }
      }
      newCar.body.velocity.y = 200
      newCar.body.velocity.x = 0
      this.carGroup.add(this.newCar)

      
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
      this.conveyorBelt = null
      this.tier = 1
      this.tierText = null
      this.money = 0
      this.moneyText = null
      this.carLevel = 1
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
    this.load.image("factoryBackground", "./assets/factoryBackground.png")
    this.load.image("machine1", "./assets/machine1.png")
    this.load.image("belt", "./assets/conveyorbelt-test.png")
    this.load.image("carLv1", "./assets/Biat-lv1.png")
    this.load.image("carLv2", "./assets/Fride-lv2.png")
    this.load.image("carLv3", "./assets/Shinjisis-lv3.png")
    // this.load.image("carLv4", ".assets/Biat-lv1.png")  //not yet
    // this.load.image("carLv5", ".assets/Biat-lv1.png")  //not yet
    // this.load.image("carLv6", ".assets/Biat-lv1.png")  //not yet
    // this.load.image("carLv7", ".assets/Biat-lv1.png")  //not yet
    this.load.image("carLv8", "./assets/Igniz-lv8.png")
    // this.load.image("carLv9", ".assets/Biat-lv1.png")  //not yet
    // this.load.image("carLv10", ".assets/Biat-lv1.png") //not yet
    //sound
    this.load.audio('Bonk', './assets/Bonk.wav')
    this.load.audio('cash', './assets/Cash-register-SFX.mp3')
    this.load.audio('ham', './assets/factoryLevelUpSFX.mp3')
  }   
   
    /**
     * Can be defined on your own Scenes.
     * Use it ot create your game objects
     * @param {object} data - Any data passed via ScenePlugin.add() or scenePlugin.start().
     */
    create(data) { 
      this.background = this.add.image(0, 0, "factoryBackground").setScale(2.0)
      this.background.setOrigin(0, 0)
  
      this.moneyText = this.add.text(10, 10, "Money: " + this.money.toString(), this.infoTextStyle).setScale(0.8)
      this.tierText = this.add.text(10, 60, "Factory Tier: " + this.tier.toString(), this.infoTextStyle).setScale(0.8)
      this.levelText = this.add.text(10, 110, "Level: " + this.carLevel.toString(), this.infoTextStyle).setScale(0.8)
      
      //create a group for the missiles 
      this.carGroup = this.physics.add.group()
  
      //create a  producer
      this.machine = this.add.image(1900 / 2 - 300, 1080 / 2 - 200, "machine1").setScale(1.1)

      this.belt = this.add.image(1900 / 2, 1080 / 2 + 300, "belt").setScale(3.0)
  
  
      //collisions between belt and car
      this.physics.add.collider(this.belt, this.carGroup, function(beltCollide, carCollide) {
        this.sound.play('Bonk')   
      }.bind(this))    
      
    } 

    /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running 
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */  

    update(time, delta) {

      
      // const keyLeftObj = this.input.keyboard.addKey("LEFT")
      // const keyRightObj = this.input.keyboard.addKey("RIGHT")
      const keySpaceObj = this.input.keyboard.addKey("SPACE")
  
      if (keySpaceObj.isDown === true) {
        this.createCar()
        }
        this.carGroup.children.each(function (item) {
        item.y = item.y - 10
        while (item.y < 1080 / 2 + 310) { //meet the same y of belt
          item.x = item.x + 10 // I'll change it to 
        }
      })


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