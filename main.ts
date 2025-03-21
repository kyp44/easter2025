let animation_rate = 250
class Direction {
    static Up: number
    private ___Up_is_set: boolean
    private ___Up: number
    get Up(): number {
        return this.___Up_is_set ? this.___Up : Direction.Up
    }
    set Up(value: number) {
        this.___Up_is_set = true
        this.___Up = value
    }
    
    static Down: number
    private ___Down_is_set: boolean
    private ___Down: number
    get Down(): number {
        return this.___Down_is_set ? this.___Down : Direction.Down
    }
    set Down(value: number) {
        this.___Down_is_set = true
        this.___Down = value
    }
    
    static Left: number
    private ___Left_is_set: boolean
    private ___Left: number
    get Left(): number {
        return this.___Left_is_set ? this.___Left : Direction.Left
    }
    set Left(value: number) {
        this.___Left_is_set = true
        this.___Left = value
    }
    
    static Right: number
    private ___Right_is_set: boolean
    private ___Right: number
    get Right(): number {
        return this.___Right_is_set ? this.___Right : Direction.Right
    }
    set Right(value: number) {
        this.___Right_is_set = true
        this.___Right = value
    }
    
    public static __initDirection() {
        Direction.Up = 0
        Direction.Down = 1
        Direction.Left = 2
        Direction.Right = 3
    }
    
}

Direction.__initDirection()

let MOVING = 4
function attach_animation(sprite: Sprite, action: number, frames: Image[]) {
    let anim = animation.createAnimation(action, animation_rate)
    anim.frames = frames
    animation.attachAnimation(sprite, anim)
}

class Hero {
    sprite: Sprite
    current_dir: number
    constructor(animation_frames: Image[][], tile_x: number, tile_y: number) {
        let d: number;
        //  Create sprite
        this.sprite = sprites.create(animation_frames[1][0], SpriteKind.Player)
        //  Create idle animations
        for (d = 0; d < 4; d++) {
            attach_animation(this.sprite, d, animation_frames[d].slice(0, 1))
        }
        //  Create moving animations
        for (d = 0; d < 4; d++) {
            attach_animation(this.sprite, d + MOVING, animation_frames[d])
        }
        scene.cameraFollowSprite(this.sprite)
        this.sprite.setPosition((tile_x + 0.5) * 16, (tile_y + 0.5) * 16)
        this.current_dir = Direction.Down
        animation.setAction(this.sprite, this.current_dir)
        controller.moveSprite(this.sprite, 50, 50)
    }
    
    public destroy() {
        sprites.destroy(this.sprite)
    }
    
    public update() {
        let s = this.sprite
        if (s.vy < 0) {
            this.current_dir = Direction.Up
            animation.setAction(s, this.current_dir + MOVING)
        } else if (s.vy > 0) {
            this.current_dir = Direction.Down
            animation.setAction(s, this.current_dir + MOVING)
        } else if (s.vx < 0) {
            this.current_dir = Direction.Left
            animation.setAction(s, this.current_dir + MOVING)
        } else if (s.vx > 0) {
            this.current_dir = Direction.Right
            animation.setAction(s, this.current_dir + MOVING)
        } else {
            animation.setAction(s, this.current_dir)
        }
        
    }
    
}

let hero = new Hero([assets.animation`alex-up`, assets.animation`alex-down`, assets.animation`alex-left`, assets.animation`alex-right`], 15, 15)
scene.setBackgroundColor(7)
tiles.setTilemap(tilemap`alex-level`)
game.onUpdate(function hero_update() {
    hero.update()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function ugh() {
    hero.destroy()
})
