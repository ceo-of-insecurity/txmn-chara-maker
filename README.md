# txmn-chara-maker

Simple character maker in plain js for tuxemon project. The generated characters are 16x32px big and have 9 images (front, back and side sprite with a retro 3 image walking cycle).

## How to use

You can visit the [github.io](https://ceo-of-insecurity.github.io/txmn-chara-maker/) page of this project to make a character.

Click on a section (e.g. body, legwear, face ...) at the top navigation bar. Below, some graphics appear. Select some sprite and continue to do this for every layer you want to use. For the body, you can also select a body color.

A preview below the top navigation bar will show the current character as a preview.

Once you are done, click the 'Save Character' Button to download the composed spritesheet.

If your character has headwear, the hair might poke out. To prevent this, click on 'Is wearing hat?' underneath the preview. This will hide the hair above the head.

## Expand the assets

Note: This might change a little bit soon, so take this section with a grain of salt.

You need to create the graphics and put them into the matching assets folder. Look at the existing ones: You need to draw the actual spritesheet "sprite.png" and then add a preview sprite for the editor "sprite_preview.png". Then you add the name of the spritesheet "sprite" you made to assets.js.

Hair has a special case, it is expected to have always 2 layers to separate the hair growing above the head from the rest to ensure hair works with headwear. In this case you need "sprite_f.png", "sprite_b.png" and "sprite_preview.png". In assets.js you still just write "sprite".

## Known issues

- When choosing a color, you only have text and don't know what exactly you are selecting. A palette preview is needed.
- Sparse documentation.

## Future updates

- Separate body from head for more flexibility
- Separate hair into more pieces: Base-hair, Upper-hair (the part that is poking out of the headwear), fringe
- Second choice for body -> this will have impact on the clothing, so additional work is needed
- Additional layer: Accessory, Cape
- With all that stuff from before we have lots of freedom: Focus on adding more assets
- Display credits at the bottom of the page along with the spritesheet, so it can be copied into the project easily (later relevant, so far everything is public domain anyway)
