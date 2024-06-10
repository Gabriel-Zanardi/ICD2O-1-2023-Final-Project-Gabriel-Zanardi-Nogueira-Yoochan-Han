/* global Phaser */


//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Yoochan and Gabriel
//Created on: May 2024
//This is the phaser game configuration file

/**
 * This class is he Game Scene.
 */

//{TODO}: make buttons for upgrade the levels and make them local\n june 10

class GameScene extends Phaser.Scene {
    /**
     * this method is the constructor
     */

    createCar() {
      console.log("check")
      const newCar = this.physics.add.sprite(this.machine.x, this.machine.y, 'carLv1')
       this.carGroup.add(newCar)
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
      this.seller = null
      this.tier = 1
      this.tierText = null
      this.money = 0
      this.moneyText = null
      this.carLevel = 1
      this.levelText = null
      this.DelayLevel = 2000

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
    this.load.image("seller", "./assets/sell-machine-test.png")
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
      
      this.belt = this.add.image(1900 / 2 + 150, 1080 / 2 + 450, "belt").setScale(3.0)
      // this.seller = this.add.image(1900 / 2 + 460, 1080 / 2 + 420, "seller").setScale(0.8)
      this.seller = this.physics.add.sprite(1900 / 2 + 460, 1080 / 2 + 420, 'seller').setScale(0.8).setOffset(140, 0);
  
      this.createCar()
      //collisions between seller and car
      this.physics.add.collider(this.seller, this.carGroup, function(sellerCollide, carCollide) {
        carCollide.destroy()
        this.sound.play('cash') 
        this.money = this.money + 50
      this.moneyText.setText('Money: ' + this.money.toString())
      }.bind(this))    

      
    } 

    
    /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running 
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */  

    update(time, delta) {
      console.log(time.toFixed(0) % this.DelayLevel)
      if (time.toFixed(0) % this.DelayLevel <= 20) { //delay
        this.createCar()
      }
    
      
    
      // const keyLeftObj = this.input.keyboard.addKey("LEFT")
      // const keyRightObj = this.input.keyboard.addKey("RIGHT")
      const keySpaceObj = this.input.keyboard.addKey("SPACE")
      const keyRightObj = this.input.keyboard.addKey("RIGHT")
      const keyLeftObj = this.input.keyboard.addKey("LEFT")
      
      if (keyLeftObj.isDown === true) { //cheat Lv-
        this.DelayLevel = this.DelayLevel + 200
        this.levelText.setText('Level: ' + this.DelayLevel.toString())
      }

      if (keyRightObj.isDown === true) { //cheat Lv+
        this.DelayLevel = this.DelayLevel - 200
        this.levelText.setText('Level: ' + this.DelayLevel.toString())
        
      }

      if (keySpaceObj.isDown === true) {
            this.createCar()

        }
        this.carGroup.children.each(function (item) {
        
        if (item.y < 1080 / 2 + 310) { //meet the same y of belt
          item.y = item.y + 10 // I'll change it to 
        }else{item.x = item.x + 10}
      })
      }
    }
  
  export default GameScene