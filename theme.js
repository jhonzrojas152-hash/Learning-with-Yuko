const THEME_KEY = "myQuizWebsiteBackground";

const themes = [
  { name: "Alice Blue", color: "#F0F8FF" },
  { name: "Antique White", color: "#FAEBD7" },
  { name: "Aqua", color: "#00FFFF" },
  { name: "Aquamarine", color: "#7FFFD4" },
  { name: "Azure", color: "#F0FFFF" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Bisque", color: "#FFE4C4" },
  { name: "Black", color: "#000000" },
  { name: "Blanched Almond", color: "#FFEBCD" },
  { name: "Blue", color: "#0000FF" },
  { name: "Blue Violet", color: "#8A2BE2" },
  { name: "Brown", color: "#A52A2A" },
  { name: "Burly Wood", color: "#DEB887" },
  { name: "Cadet Blue", color: "#5F9EA0" },
  { name: "Chartreuse", color: "#7FFF00" },
  { name: "Chocolate", color: "#D2691E" },
  { name: "Coral", color: "#FF7F50" },
  { name: "Cornflower Blue", color: "#6495ED" },
  { name: "Cornsilk", color: "#FFF8DC" },
  { name: "Crimson", color: "#DC143C" },
  { name: "Dark Blue", color: "#00008B" },
  { name: "Dark Cyan", color: "#008B8B" },
  { name: "Dark Goldenrod", color: "#B8860B" },
  { name: "Dark Gray", color: "#A9A9A9" },
  { name: "Dark Green", color: "#006400" },
  { name: "Dark Khaki", color: "#BDB76B" },
  { name: "Dark Magenta", color: "#8B008B" },
  { name: "Dark Olive Green", color: "#556B2F" },
  { name: "Dark Orange", color: "#FF8C00" },
  { name: "Dark Orchid", color: "#9932CC" },
  { name: "Dark Red", color: "#8B0000" },
  { name: "Dark Salmon", color: "#E9967A" },
  { name: "Dark Sea Green", color: "#8FBC8F" },
  { name: "Dark Slate Blue", color: "#483D8B" },
  { name: "Dark Slate Gray", color: "#2F4F4F" },
  { name: "Dark Turquoise", color: "#00CED1" },
  { name: "Dark Violet", color: "#9400D3" },
  { name: "Deep Pink", color: "#FF1493" },
  { name: "Deep Sky Blue", color: "#00BFFF" },
  { name: "Dim Gray", color: "#696969" },
  { name: "Dodger Blue", color: "#1E90FF" },
  { name: "Firebrick", color: "#B22222" },
  { name: "Floral White", color: "#FFFAF0" },
  { name: "Forest Green", color: "#228B22" },
  { name: "Fuchsia", color: "#FF00FF" },
  { name: "Gainsboro", color: "#DCDCDC" },
  { name: "Ghost White", color: "#F8F8FF" },
  { name: "Gold", color: "#FFD700" },
  { name: "Goldenrod", color: "#DAA520" },
  { name: "Gray", color: "#808080" },
  { name: "Green", color: "#008000" },
  { name: "Green Yellow", color: "#ADFF2F" },
  { name: "Honeydew", color: "#F0FFF0" },
  { name: "Hot Pink", color: "#FF69B4" },
  { name: "Indian Red", color: "#CD5C5C" },
  { name: "Indigo", color: "#4B0082" },
  { name: "Ivory", color: "#FFFFF0" },
  { name: "Khaki", color: "#F0E68C" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "Lavender Blush", color: "#FFF0F5" },
  { name: "Lawn Green", color: "#7CFC00" },
  { name: "Lemon Chiffon", color: "#FFFACD" },
  { name: "Light Blue", color: "#ADD8E6" },
  { name: "Light Coral", color: "#F08080" },
  { name: "Light Cyan", color: "#E0FFFF" },
  { name: "Light Goldenrod", color: "#EEDC82" },
  { name: "Light Gray", color: "#D3D3D3" },
  { name: "Light Green", color: "#90EE90" },
  { name: "Light Pink", color: "#FFB6C1" },
  { name: "Light Salmon", color: "#FFA07A" },
  { name: "Light Sea Green", color: "#20B2AA" },
  { name: "Light Sky Blue", color: "#87CEFA" },
  { name: "Light Slate Gray", color: "#778899" },
  { name: "Light Steel Blue", color: "#B0C4DE" },
  { name: "Light Yellow", color: "#FFFFE0" },
  { name: "Lime", color: "#00FF00" },
  { name: "Lime Green", color: "#32CD32" },
  { name: "Linen", color: "#FAF0E6" },
  { name: "Maroon", color: "#800000" },
  { name: "Medium Aquamarine", color: "#66CDAA" },
  { name: "Medium Blue", color: "#0000CD" },
  { name: "Medium Orchid", color: "#BA55D3" },
  { name: "Medium Purple", color: "#9370DB" },
  { name: "Medium Sea Green", color: "#3CB371" },
  { name: "Medium Slate Blue", color: "#7B68EE" },
  { name: "Medium Spring Green", color: "#00FA9A" },
  { name: "Medium Turquoise", color: "#48D1CC" },
  { name: "Medium Violet Red", color: "#C71585" },
  { name: "Midnight Blue", color: "#191970" },
  { name: "Mint Cream", color: "#F5FFFA" },
  { name: "Misty Rose", color: "#FFE4E1" },
  { name: "Moccasin", color: "#FFE4B5" },
  { name: "Navajo White", color: "#FFDEAD" },
  { name: "Navy", color: "#000080" },
  { name: "Old Lace", color: "#FDF5E6" },
  { name: "Olive", color: "#808000" },
  { name: "Olive Drab", color: "#6B8E23" },
  { name: "Orange", color: "#FFA500" },
  { name: "Orange Red", color: "#FF4500" },
  { name: "Orchid", color: "#DA70D6" },
  { name: "Pale Goldenrod", color: "#EEE8AA" },
  { name: "Pale Green", color: "#98FB98" },
  { name: "Pale Turquoise", color: "#AFEEEE" },
  { name: "Pale Violet Red", color: "#DB7093" },
  { name: "Papaya Whip", color: "#FFEFD5" },
  { name: "Peach Puff", color: "#FFDAB9" },
  { name: "Peru", color: "#CD853F" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Plum", color: "#DDA0DD" },
  { name: "Powder Blue", color: "#B0E0E6" },
  { name: "Purple", color: "#800080" },
  { name: "Rebecca Purple", color: "#663399" },
  { name: "Red", color: "#FF0000" },
  { name: "Rosy Brown", color: "#BC8F8F" },
  { name: "Royal Blue", color: "#4169E1" },
  { name: "Saddle Brown", color: "#8B4513" },
  { name: "Salmon", color: "#FA8072" },
  { name: "Sandy Brown", color: "#F4A460" },
  { name: "Sea Green", color: "#2E8B57" },
  { name: "Seashell", color: "#FFF5EE" },
  { name: "Sienna", color: "#A0522D" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Sky Blue", color: "#87CEEB" },
  { name: "Slate Blue", color: "#6A5ACD" },
  { name: "Slate Gray", color: "#708090" },
  { name: "Snow", color: "#FFFAFA" },
  { name: "Spring Green", color: "#00FF7F" },
  { name: "Steel Blue", color: "#4682B4" },
  { name: "Tan", color: "#D2B48C" },
  { name: "Teal", color: "#008080" },
  { name: "Thistle", color: "#D8BFD8" },
  { name: "Tomato", color: "#FF6347" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Violet", color: "#EE82EE" },
  { name: "Wheat", color: "#F5DEB3" },
  { name: "White", color: "#FFFFFF" },
  { name: "White Smoke", color: "#F5F5F5" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Yellow Green", color: "#9ACD32" },
  { name: "Deep Purple", color: "#673AB7" }
];

const themeButton = document.getElementById("themeButton");
const themeMenu = document.getElementById("themeMenu");

function closeThemeMenu() {
  themeMenu.hidden = true;
}

function toggleThemeMenu() {
  themeMenu.hidden = !themeMenu.hidden;
}

themeButton.addEventListener("click", function (event) {
  event.stopPropagation();
  toggleThemeMenu();
});

function applyTheme(color) {
  document.body.style.backgroundColor = color;

  localStorage.setItem(THEME_KEY, color);

  document.querySelectorAll(".theme-color-button").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.color === color
    );
  });

  closeThemeMenu();
}

function createThemeButtons() {
  themeMenu.innerHTML = "";

  themes.forEach(theme => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "theme-color-button";
    button.style.backgroundColor = theme.color;
    button.dataset.color = theme.color;
    button.dataset.name = theme.name;
    button.title = theme.name;

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      applyTheme(theme.color);
    });

    themeMenu.appendChild(button);
  });
}

document.addEventListener("click", function (event) {
  if (
    !themeMenu.contains(event.target) &&
    event.target !== themeButton
  ) {
    closeThemeMenu();
  }
});

const savedTheme = localStorage.getItem(THEME_KEY);

createThemeButtons();

if (savedTheme) {
  applyTheme(savedTheme);
}