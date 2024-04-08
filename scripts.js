const selection = {};
let hair_back = true;

/**
 * opens or closes the section of a layer
 * @param {*} section_id id of DOM element to open/close
 */
function toggleSection(section_id) {
  const section = document.getElementById(section_id);
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
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      images.forEach((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      });
    })
    .catch((error) => {
      console.error("Failed to load images:", error);
    });
}

/**
 * save/download composed spritesheet
 */
function saveCharacter() {
  // TODO I think this needs an update to scale back to the normal size of the sprite sheet
  const canvas = document.getElementById("character-preview");
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "character.png";
  link.click();
}
