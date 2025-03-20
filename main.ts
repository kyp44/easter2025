let animation_rate = 250
class PlayerData {
    x: number
    constructor(x: number) {
        this.x = x
    }
    
}

let x = new PlayerData(6)
tiles.setTilemap(tilemap`alex-level`)
let alex_sprite = sprites.create(assets.animation`alex-down`[0], SpriteKind.Player)
animation.runImageAnimation(alex_sprite, assets.animation`alex-down`, animation_rate, true)
scene.setBackgroundColor(7)
scene.cameraFollowSprite(alex_sprite)
alex_sprite.setPosition(15.5 * 16, 15.5 * 16)
controller.moveSprite(alex_sprite, 50, 50)
