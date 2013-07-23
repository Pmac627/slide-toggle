##Slide Toggle

This is pure javascript widget which toggles the visibility of an element by animating the height of the element. The behaviour is similar to JQuery `slideToggle()` api. It animates the height using CSS Transitions and falls back to a javascript solution if transitions are not supported by the browser. 

###Dependencies:
Its a pure javascript code and has no dependencies on any libraries or frameworks. You can learn a bit about animations here :)
 
###Options :

#####jsOnly - boolean
Set this to true to not use css transitions and use only js animation. Default is false;

#####speed - milliseconds
To set the duration of the animation for the element to hide or show

#####interval - milliseconds
To set the interval for the `setInterval` call which will affect the frame rate. Default value is 13ms as used by jQuery. Please note that this option is for js animation only.

###Usage:
The SlideToggle constructor accepts two parameters.
* id - id of the dom element. This is mandatory paramter otherwise it will thrwo an error
* options - to pass any options for initialization. This is optional

```javascript
  var layover = new SlideToggle('layover1');
  layover.slideToggle();
  
  var layover2 = new SlideToggle('layover2',  {
                                                jsOnly : true,
                                                speed : 700
                                              });
  layover2.slideToggle();
```
