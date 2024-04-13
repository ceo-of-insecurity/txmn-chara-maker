const selection = {};
const selectedPalette = {};
let hair_back = true;

/**
 * opens or closes the section of a layer
 * @param {*} section_id id of DOM element to open/close
 */
function toggleSection(section_id) {
  const section = document.getElementById(section_id);
  section.style.display = section.style.display === "block" ? "none" : "block";
}

function selectLayer(layer_name) {
  const sections = document.getElementsByClassName("layer-section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  const section = document.getElementById(layer_name + "-section");
  section.style.display = section.style.display === "block" ? "none" : "block";
}

/**
 * Toggles the hair in the background, needed if a hat is worn and the hair needs to be flattened
 */
function toggleHairBack() {
  // TODO if you add an icon to show the bool, it needs to update that thing here too
  hair_back = !hair_back;
  drawCharacter();
}

/**
 * Selects a sprite for a layer
 * @param {*} layer key from assets.js
 * @param {*} sprite value from assets.js
 */
function selectSprite(layer, sprite) {
  selection[layer] = sprite;
  drawCharacter();
}

/**
 * returns a promise which loads an image including the depth as an attribute.
 * @param {*} src path to the image
 * @param {*} layer_name layer according to assets.js to ge the depth
 * @returns
 */
function loadImage(src, layer_name) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = src;
    img.setAttribute("depth", assets[layer_name]["depth"]);
  });
}

/**
 * draw spritesheet into the canvas as a preview
 */
function drawCharacter() {
  const canvas = document.getElementById("character-preview");
  const ctx = canvas.getContext("2d", {
    antialias: false,
    willReadFrequently: true,
  });

  // add all images that need to be loaded to a queue
  let image_loading_promises = [];
  Object.keys(selection).forEach((layer_name) => {
    const sprite_name = selection[layer_name];
    if (sprite_name !== "") {
      if (layer_name === "hair") {
        // special case hair: has 2 layers with _f and _b so we need to load it differently
        image_loading_promises.push(
          loadImage(
            "assets/" + layer_name + "/" + sprite_name + "_f.png",
            layer_name
          )
        );
        if (hair_back) {
          image_loading_promises.push(
            loadImage(
              "assets/" + layer_name + "/" + sprite_name + "_b.png",
              layer_name
            )
          );
        }
      } else {
        image_loading_promises.push(
          loadImage(
            "assets/" + layer_name + "/" + sprite_name + ".png",
            layer_name
          )
        );
      }
    }
  });

  // load all images from the queue
  Promise.all(image_loading_promises)
    .then((images) => {
      ctx.imageSmoothingEnabled = false;
      images.sort((a, b) => a.getAttribute("depth") - b.getAttribute("depth"));
      // clear right before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // then draw all selected images
      images.forEach((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      });
      // recolor composed spritesheet
      let composedSpritesheet = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      for (let i = 0; i < composedSpritesheet.data.length; i += 4) {
        const r = composedSpritesheet.data[i];
        const g = composedSpritesheet.data[i + 1];
        const b = composedSpritesheet.data[i + 2];
        Object.keys(selectedPalette).forEach((layer_name) => {
          for (let j = 0; j < colors[layer_name].length; j += 1) {
            if (
              r == colors[layer_name][j][0] &&
              g == colors[layer_name][j][1] &&
              b == colors[layer_name][j][2]
            ) {
              composedSpritesheet.data[i] =
                color_palettes[layer_name][selectedPalette[layer_name]].colors[
                  j
                ][0];
              composedSpritesheet.data[i + 1] =
                color_palettes[layer_name][selectedPalette[layer_name]].colors[
                  j
                ][1];
              composedSpritesheet.data[i + 2] =
                color_palettes[layer_name][selectedPalette[layer_name]].colors[
                  j
                ][2];
            }
          }
        });
      }
      ctx.putImageData(composedSpritesheet, 0, 0);
    })
    .catch((error) => {
      console.error("Failed to load images:", error);
    });
}

/**
 * save/download composed spritesheet
 */
function saveCharacter() {
  const canvas = document.getElementById("character-preview");
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "character.png";
  link.click();
}

/**
 * Selects a palette for a layer, which is then used to recolor the composed spritesheet.
 * @param {*} layer_name Which layer the palette is applied to.
 * @param {*} palette_index Index of chosen palette. -1 removes an entry and uses the default colours.
 */
function selectPalette(layer_name, palette_index) {
  if (palette_index === -1) {
    delete selectedPalette[layer_name];
  } else {
    selectedPalette[layer_name] = palette_index;
  }
  drawCharacter();
}
