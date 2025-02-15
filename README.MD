
## 3D Loader Twine
####  by Chris Godber

![alt text](https://github.com/drnoir/3d-loader-twine/blob/main/twineloader3d4.jpg)

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
- [[Move Cam Path]]

Examples Readme
## Static Scene

A static scene with no animation

## Set position and load a static model
Pass in the GLB filename. Set the ambient light and then position x, y and z. 
Do not add a rotation speed to make it static.
```
 window.loadThreeJSWithModel('./models/tower.glb', 'sky.jpg', 'white', 0.8, 0,0 -250);
 ```
  ### Passable Settings:
 modelPath,backgroundTex, light, scale, posx, posy, posz, speed, custumAnim

### Rotating Example

This scene loads in a glb model and rotates it around  by setting the final argument 
speed sent to the loadThreesWithModel Function


### Set position and load a rotating model
Pass in the GLB filename. Set the ambient light and then position x, y and z. 
Add rotation speed to make it move at the set speed.
```
 window.loadThreeJSWithModel('./models/robot.glb', 'sky.jpg', 'white', 0.2, 0,0,-125, 0.02);
 ```
### Passable Settings:
 modelPath,backgroundTex, light, scale, posx, posy, posz, speed, custumAnim

## Trigger an Animation

Passing model info with animation triggering automatically and some custom pos
and scaling


### How to load the model 
Pass in the GLB filename. Set the background image,  ambient light and then position x, y and z. 
Optionally add a rotation speed to add a rotation at the end.

The final arguement at the end is to set the number animation you want to load (default is 0). If there are multiple animation on the model you can set which one you want to load with this arguement

## Move Camera on a Path

Move the scene camera to a certain position and repeat 

### Set position and load a static model
Pass in the GLB filename. Set the background texture, set the end point vectors for cam, set duration of movement and the loop status. 
```
window.modelWithPath('./models/city.glb', 'sky.jpg', 0, 60, 120, 10000);
 ```
  ### Passable Settings:
 modelPath,backgroundTex, camPath, duration, loop

 ## modified colours

This is a scene with modified colours for lighting passed in as second arguement to the loadThreeJSWithModel Function

## How to set the ambient light color
This is how this is set. Color is set as the 2nd arguement and sets the ambient lighting on the model. 
```
 window.loadThreeJSWithModel('./models/hero.glb', 'sky.jpg', 'red', 2, 0,0.5,0);
```
 ### Passable Settings:
 modelPath,backgroundTex, light, scale, posx, posy, posz, speed, custumAnim
