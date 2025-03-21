animation_rate = 250

class Direction(Enum) :
    Up = 0
    Down = 1
    Left = 2
    Right = 3

MOVING = 4

def attach_animation(sprite: Sprite, action: number, frames: Listp[Image]) :
    anim = animation.create_animation(action, animation_rate)
    anim.frames = frames
    animation.attach_animation(sprite, anim)

class Hero :
    def __init__(self, animation_frames: List[List[Image]], tile_x: int, tile_y: int) :
        # Create sprite
        self.sprite = sprites.create(animation_frames[1][0], SpriteKind.Player)

        # Create idle animations
        for d in range(4) :
            attach_animation(self.sprite, d, animation_frames[d][:1])

        # Create moving animations
        for d in range(4) :
            attach_animation(self.sprite, d + MOVING, animation_frames[d])

        scene.camera_follow_sprite(self.sprite)
        self.sprite.set_position((tile_x + 0.5)*16, (tile_y + 0.5)*16)
        self.current_dir = Direction.Down
        animation.set_action(self.sprite, self.current_dir)
        controller.move_sprite(self.sprite, 50, 50)
        

    def destroy(self) :
        sprites.destroy(self.sprite)

    def update(self) :
        s = self.sprite
        if s.vy < 0 :
            self.current_dir = Direction.Up
            animation.set_action(s, self.current_dir + MOVING)
        elif s.vy > 0 :
            self.current_dir = Direction.Down
            animation.set_action(s, self.current_dir + MOVING)
        elif s.vx < 0 :
            self.current_dir = Direction.Left
            animation.set_action(s, self.current_dir + MOVING)
        elif s.vx > 0 :
            self.current_dir = Direction.Right
            animation.set_action(s, self.current_dir + MOVING)
        else :
            animation.set_action(s, self.current_dir)

hero = Hero(
    [
        assets.animation("alex-up"),
        assets.animation("alex-down"),
        assets.animation("alex-left"),
        assets.animation("alex-right")
    ], 15, 15
)

scene.set_background_color(7)
tiles.set_tilemap(tilemap("alex-level"))

def hero_update() :
    hero.update()
game.on_update(hero_update)

def ugh() :
    hero.destroy()
controller.A.on_event(ControllerButtonEvent.PRESSED, ugh)
