
## 3D Loader Twine
####  by Chris Godber

Live Demo Link - <a href = "https://drnoir.github.io/3d-loader-twine/Example%20Game%20-%20The%20Pointless%20Garage%20Quest/">Play the demo game here</a>

This is a template for twine that can be used as a starting point for loading a GLB model into Twine with a script embedded on any passage that you wish to load in a GLB model. 

This works for <a href = "https://videlais.github.io/snowman/#/">Snowman format</a> version 2.02. Not tested for other formats.

You can use this as a template for your own projects.

### Features

- Custom css for responsive canvas. 
- If you want to create a new scene with a 3D model loaded in - copy the script in the  script section that calls loadThreeJSWithModel and make sure to modify and update based on your requirements. It is simple and you can apply all your setting in a single line with some customisable options.
- You will need to know some basics of how to edit three js scripts to get the most out of this template. Examples are provided and an example game is included to show you a typical implemention.
- You can set a background image on each passage
- You can also trigger a custom animation from the models animation list by passing its id starting from 0. Console logs are provided so you can inspect this in main.js

### Testing Locally
You have to export your twine project and then run your html file on a local server due to CORS blocking asset loading

<a href = "https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Live Server</a> for VS Code is a good option.

### Notes 
You cannot test in the editor.

You can import in index.html to view the twine project.

Main.js is where all the javascript for loading in 3D models and the libraries are if you want to modify that, it is loaded at the start as a module along with three js. The three js libraries are loaded via cdn but you can swap this by loading in minified versions if you wish by editing the main.js loadThree function.

### 3D Loading Arguments

The 3D loading function accepts the following arguements in this order.
I've tried to balance some flexibility of options with ease of use. 

- modelPath,backgroundTex, light, scale, posx, posy, posz, speed, custumAnim

This would typically look like this in the script section

```
window.loadThreeJSWithModel('hero.glb','sky.jpg', 'white',  2, 0,0.4,0);
```

<h2>Examples</h2>

- [[Load In and Rotate]] 
- [[Modifying ambient light colours]]
- [[Static]] 
- [[Default load with animation]]
