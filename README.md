# txmn-chara-maker

Simple character maker in plain js for tuxemon project.

## How to use

You can visit the [github.io](https://ceo-of-insecurity.github.io/txmn-chara-maker/) page of this project to make a character.

Click on a section (e.g. body, legwear, face ...) to expand it. Select some sprite and continue to do this for every layer you want to use.

You will see a preview at the top of the page.

Once you are done, click the 'Save Character' Button to download the composed spritesheet. Note that the spritesheet is currently scaled to 200% and you need to scale it down manually.

If your character has headwear, the hair might poke out. To prevent this, click on 'Wearing hat?' underneath the hair section. This will hide the hair above the head.

Currently, the colors are set. There are no color variations for the skin etc. The colors should be unique though, so you can just replace the color of the skin of the composed sheet. It should only replace the skin and nothing else.

## Expand the assets

You need to create the graphics and put them into the matching assets folder. Look at the existing ones: You need to draw the actual spritesheet "sprite.png" and then add a preview sprite for the editor "sprite_preview.png". Then you add the name of the spritesheet "sprite" you made to assets.js.

Hair has a special case, it is expected to have always 2 layers to separate the hair growing above the head from the rest to ensure hair works with headwear. In this case you need "sprite_f.png", "sprite_b.png" and "sprite_preview.png". In assets.js you still just write "sprite".

## Known issues

- The composed spritesheet in download is scaled to 200% but only the preview should be scaled
- Recoloring is not fun
- Sparse documentation
- The editor is ugly

## Future updates

- Recolor spritesheet directly in js
- Blazin' hot style for the editor
- Seperate body from head for more flexibility
- Second choice for body -> this will have impact on the clothing, so additional work is needed
- With all that stuff from before we have lots of freedom: Finally add more assets
- Display credits at the bottom of the page along with the spritesheet, so it can be copied into the project easily
