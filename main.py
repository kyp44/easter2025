animation_rate = 250

class PlayerData :
    def __init__(self, x) :
        self.x = x

x = PlayerData(6)

tiles.set_tilemap(tilemap("alex-level"))
alex_sprite = sprites.create(assets.animation("alex-down")[0], SpriteKind.Player)
animation.run_image_animation(alex_sprite, assets.animation("alex-down"), animation_rate, True)



scene.set_background_color(7)
scene.camera_follow_sprite(alex_sprite)
alex_sprite.set_position(15.5*16, 15.5*16)
controller.move_sprite(alex_sprite, 50, 50)
