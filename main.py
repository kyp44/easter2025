animation_rate = 250

class Character :
    def __init__(self, down_frames: List[Image], tile_x: int, tile_y: int) :
        self.sprite = sprites.create(down_frames[0], SpriteKind.Player)
        scene.camera_follow_sprite(self.sprite)
        animation.run_image_animation(self.sprite, down_frames, animation_rate, True)
        self.sprite.set_position((tile_x + 0.5)*16, (tile_y + 0.5)*16)
        controller.move_sprite(self.sprite, 50, 50)

    def destroy(self) :
        sprites.destroy(self.sprite)

character = Character(assets.animation("alex-down"), 15, 15)

scene.set_background_color(7)
tiles.set_tilemap(tilemap("alex-level"))

def ugh() :
    character.destroy()

controller.A.on_event(ControllerButtonEvent.PRESSED, ugh)

