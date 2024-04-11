// list of all assets. empty string is to undress the piece. also used in scripts.js
const assets = {
  body: {
    depth: 0,
    sprites: ["", "body"],
  },
  legwear: {
    depth: 1,
    sprites: ["", "pants"],
  },
  footwear: {
    depth: 2,
    sprites: ["", "boots", "shoes"],
  },
  clothing: {
    depth: 3,
    sprites: ["", "dress", "pirate", "shirt"],
  },
  face: {
    depth: 4,
    sprites: ["", "face_1", "face_2", "face_3", "face_4", "face_5"],
  },
  hair: {
    depth: 5,
    sprites: ["", "anime", "long"],
  },
  headwear: {
    depth: 7,
    sprites: ["", "cap", "ornament", "pirate_hat"],
  },
};

// existing colors, from dark to bright
const colors = {
  body: [
    [58, 30, 24],
    [130, 91, 49],
    [197, 145, 84],
    [240, 189, 119],
    [251, 223, 155],
  ],
};

// palettes selectable for the user
const color_palettes = {
  body: [
    {
      name: "tanned",
      colors: [
        [28, 19, 15],
        [61, 52, 32],
        [99, 83, 47],
        [146, 118, 40],
        [175, 155, 36],
      ],
    },
    {
      name: "shrek. I mean ogre.",
      colors: [
        [47, 50, 27],
        [75, 97, 49],
        [64, 156, 64],
        [111, 210, 91],
        [153, 255, 123],
      ],
    },
  ],
};

(function (window, document) {
  // wait until DOM is loaded, otherwise the layer_element does not exist to add the sections
  window.onload = init;

  function init() {
    const top_navbar = document.getElementById("layer-choices");
    const layers = document.getElementById("layers");
    // const palettes_element = document.getElementById("palettes");

    Object.keys(assets).forEach((layer_name) => {
      const sprite_list = assets[layer_name]["sprites"];
      let palette_list = [];
      if (color_palettes[layer_name]) {
        palette_list = [{ name: "default" }].concat(color_palettes[layer_name]);
      }

      // -- top navbar --
      const layer_icon_img = document.createElement("img");
      layer_icon_img.setAttribute("src", "assets/" + layer_name + "_layer.png");
      layer_icon_img.onclick = () => {
        selectLayer(layer_name);
      };
      top_navbar.appendChild(layer_icon_img);

      // -- layers --
      // section
      const layer_section = document.createElement("section");
      layer_section.setAttribute("id", layer_name + "-section");
      layer_section.classList.add("layer-section");
      layers.appendChild(layer_section);
      // heading for section
      const layer_header = document.createElement("h2");
      layer_header.appendChild(document.createTextNode(layer_name));
      layer_section.appendChild(layer_header);
      if (color_palettes[layer_name]) {
        // prepare palette dropdown
        const palette_dropdown = document.createElement("select");
        palette_dropdown.setAttribute("id", layer_name + "-palette-dropdown");
        palette_dropdown.onchange = (event) => {
          selectPalette(layer_name, event.target.value - 1);
        };
        layer_section.appendChild(palette_dropdown);
        // -- colors --
        // add color choices
        for (let i = 0; i < palette_list.length; i++) {
          const palette_information = palette_list[i];
          // create options to select
          const palette_option = document.createElement("option");
          palette_option.value = i;
          palette_option.appendChild(
            document.createTextNode(palette_information["name"])
          );
          palette_dropdown.appendChild(palette_option);
        }
      }
      // -- sprite selection --
      // sprite selection for each sprite
      sprite_list.forEach((sprite_name) => {
        // sprite selector
        const sprite_selector = document.createElement("div");
        sprite_selector.classList.add("sprite-selector");
        sprite_selector.onclick = () => {
          selectSprite(layer_name, sprite_name);
        };
        layer_section.appendChild(sprite_selector);
        // preview image inside selector
        const sprite_preview = document.createElement("img");
        if (sprite_name === "") {
          // empty string is a special case: undress layer
          sprite_preview.setAttribute("src", "assets/none.png");
          sprite_preview.setAttribute("alt", "removes the " + layer_name);
        } else {
          sprite_preview.setAttribute(
            "src",
            "assets/" + layer_name + "/" + sprite_name + "_preview.png"
          );
          sprite_preview.setAttribute(
            "alt",
            "selects " + sprite_name + " as the " + layer_name
          );
        }
        sprite_selector.appendChild(sprite_preview);
      });
    });
  }
})(window, document);
