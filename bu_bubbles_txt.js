"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: Vanessa Dela Cruz
   Date: April 30, 2024
   
   Filename: bu_bubbles.js

*/
//object literal
var box = {
   width: 1024,
   height: 500,
};
//function for creating bubble objects
function Bubble (size, img)
{
   this.radius = size;
   this.imageURL = img;
   this.xVelocity = null;
   this.yVelocity = null;
   this.xPos = null;
   this.yPos = null;
   this.opacity = 1;
   this.hue = 0;
   this.rotate = 0;
   this.rotateDirection = 1;
}
//bubble constructor functions
Bubble.prototype.fadeBubble = function()
{
   this.opacity -= 0.0005;
}
Bubble.prototype.changeColor = function()
{
   this.hue = (this.hue + 3) % 360;
}
Bubble.prototype.rotateBubble = function()
{
   this.rotate = (this.rotate + this.rotateDirection) % 360;
}
//method that moves the bubble across the bubble box
Bubble.prototype.moveBubble = function(height, width)
{
   //defines extent of the bubble
   var bubbleTop = this.yPos
   var bubbleBottom = this.yPos + this.radius;
   var bubbleLeft = this.xPos;
   var bubbleRight = this.xPos + this.radius;
   //condition if the bubble hit the top or bottom wall
   if (bubbleTop < 0 || bubbleBottom > height)
   {
      this.yVelocity = -this.yVelocity;
   }
   //condition if the bubble hit the left or right wall
   if (bubbleLeft < 0 || bubbleRight > width)
   {
      this.xVelocity = -this.xVelocity;
   }
   //move the bubble to its new location
   this.yPos += this.yVelocity;
   this.xPos += this.xVelocity;
}

window.addEventListener("load", function()
{
   // Reference to the bubble box
   var bubbleBox = document.getElementById("bubbleBox");
   // Create a new bubble every half-second
   setInterval(function() 
   {
      // Do not create more than 20 bubbles at any one time
      if (bubbleBox.childElementCount <= 20)
      {  
         //defining property values for newBubble object
         var newBubble = new Bubble(randInt (50, 120), "bu_bubble" + randInt(1, 10) + ".png");
         newBubble.xPos = box.width / 2;
         newBubble.yPos = box.height / 2;
         newBubble.xVelocity = randInt(-5, 5);
         newBubble.yVelocity = randInt(-5, 5);
         newBubble.rotate = randInt(0, 360);
         newBubble.hue = randInt(0, 360);
         newBubble.rotateDirection = randInt(-2, 2);

         //inline image that displays the bubble image within the bubble box
         var bubbleImg = document.createElement("img");
         bubbleImg.style.position = "absolute";
         bubbleImg.src = newBubble.imageURL;
         bubbleImg.style.width = newBubble.radius + "px";
         bubbleImg.style.left = newBubble.xPos + "px";
         bubbleImg.style.top = newBubble.yPos + "px";
         bubbleBox.appendChild(bubbleImg);

         var bubbleInterval = setInterval(function()
         {
            //applying the fadeBubble() to newBubble
            newBubble.fadeBubble();
            if (newBubble.opacity < 0)
            {
               //remove bubbleImg and stop animation
               clearInterval(bubbleInterval);
               bubbleBox.removeChild(bubbleImg);
               
            }
            else
            {
               //otherwise animate the bubble
               bubbleImg.style.opacity = newBubble.opacity;
               newBubble.changeColor();
               bubbleImg.style.filter = "hue-rotate(" + newBubble.hue + "deg)";
               newBubble.rotateBubble();
               bubbleImg.style.transform = "rotate(" + newBubble.rotate + "deg)";
               newBubble.moveBubble(box.height, box.width);
               bubbleImg.style.top = newBubble.yPos + "px";
               bubbleImg.style.left = newBubble.xPos + "px";
            }
         }, 25);
      }
   }, 500);
   /* Function to return a random integer between minVal and maxValue inclusive */
   function randInt(minVal, maxVal) {
      var size = maxVal - minVal + 1;
      return Math.floor(minVal + size*Math.random());
   }  
});

