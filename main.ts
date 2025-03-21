let animation_rate = 250
class Character {
    sprite: Sprite
    constructor(down_frames: Image[], tile_x: number, tile_y: number) {
        this.sprite = sprites.create(down_frames[0], SpriteKind.Player)
        scene.cameraFollowSprite(this.sprite)
        animation.runImageAnimation(this.sprite, down_frames, animation_rate, true)
        this.sprite.setPosition((tile_x + 0.5) * 16, (tile_y + 0.5) * 16)
        controller.moveSprite(this.sprite, 50, 50)
    }
    
    public destroy() {
        sprites.destroy(this.sprite)
    }
    
}

let character = new Character(assets.animation`alex-down`, 15, 15)
scene.setBackgroundColor(7)
tiles.setTilemap(tilemap`alex-level`)
controller.A.onEvent(ControllerButtonEvent.Pressed, function ugh() {
    character.destroy()
})
