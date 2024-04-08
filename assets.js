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

(function (window, document) {
  // wait until DOM is loaded, otherwise the layer_element does not exist to add the sections
  window.onload = init;

  function init() {
    // add assets to be selectable into the DOM
    const layer_element = document.getElementById("layers");

    Object.keys(assets).forEach((layer_name) => {
      const sprite_list = assets[layer_name]["sprites"];
      const layer_depth = assets[layer_name]["depth"];
      // add a section for the layer
      const layer_section_element = document.createElement("section");
      layer_section_element.setAttribute("id", layer_name);
      layer_element.appendChild(layer_section_element);
      // heading for the section
      const layer_header_element = document.createElement("h2");
      layer_header_element.classList.add("section-header");
      layer_header_element.onclick = () => {
        toggleSection(layer_name + "-section");
      };
      layer_section_element.appendChild(layer_header_element);
      // text for heading
      const layer_header_text = document.createTextNode(layer_name);
      layer_header_element.appendChild(layer_header_text);
      // content for the section
      const layer_section_content_element = document.createElement("div");
      layer_section_content_element.setAttribute("id", layer_name + "-section");
      layer_section_content_element.classList.add("section-content");
      layer_section_element.appendChild(layer_section_content_element);
      // sprite selection for each sprite
      sprite_list.forEach((sprite_name) => {
        // sprite selector
        const sprite_selector_element = document.createElement("div");
        sprite_selector_element.classList.add("sprite-selector");
        sprite_selector_element.onclick = () => {
          selectSprite(layer_name, sprite_name);
        };
        layer_section_content_element.appendChild(sprite_selector_element);
        // preview image inside selector
        const sprite_preview_element = document.createElement("img");
        if (sprite_name === "") {
          // empty string is a special case: undress layer
          sprite_preview_element.setAttribute("src", "assets/none.png");
          sprite_preview_element.setAttribute(
            "alt",
            "removes the " + layer_name
          );
        } else {
          sprite_preview_element.setAttribute(
            "src",
            "assets/" + layer_name + "/" + sprite_name + "_preview.png"
          );
          sprite_preview_element.setAttribute(
            "alt",
            "selects " + sprite_name + " as the " + layer_name
          );
        }
        sprite_selector_element.appendChild(sprite_preview_element);
      });
    });

    // -- SPECIAL CONTENT --
    // add a button to toggle the hair back
    const hair_element = document.getElementById("hair");
    const toggle_hair_back_element = document.createElement("div");
    const toggle_hair_back_text = document.createTextNode("Wearing hat?");
    toggle_hair_back_element.appendChild(toggle_hair_back_text);
    toggle_hair_back_element.onclick = () => {
      toggleHairBack();
    };
    hair_element.appendChild(toggle_hair_back_element);
    // TODO add an element to show if this bool is active or not, you could replace it with a checkmark or smth like that, idk
    // or just show an icon
  }
})(window, document);
