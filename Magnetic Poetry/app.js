window.addEventListener('load',function(){
    
    var initialWords = ["Tim", "O'Hearn", "is", "the", "best", "ever"];
    
    var puzzle = document.getElementById('puzzle'); 
    
    //Creates new magnet at random location
    document.getElementById('addButton').addEventListener('click', function() {
        var text = textInput.value;
        new Magnet(text);
    }, false);

    //Magnet object
    var Magnet = function(text){
        console.log("Created new magnet with text: " + text);
        var btn = document.createElement('button');
        btn.className = 'magnet';
        this.btn = btn;
        btn.appendChild(document.createTextNode(text));
        puzzle.appendChild(btn);
        this.changePosition();
        
        var thisCopy = this;
        
        btn.addEventListener('mousedown', function(event) {
            var offsetLeft = event.clientX - thisCopy.x;
            var offsetTop = event.clientY - thisCopy.y;

            var mouseMoveListener = function(event) {
            thisCopy.moveElement(event.clientX - offsetLeft, event.clientY - offsetTop);
        };

        var mouseUpListener = function(event) {
            puzzle.removeEventListener('mousemove', mouseMoveListener, false);
            btn.removeEventListener('mouseup', mouseUpListener, false);
        };
      
      btn.addEventListener('mouseup', mouseUpListener, false);
      puzzle.addEventListener('mousemove', mouseMoveListener, false);
    }, false);      
  };
    
    Magnet.prototype.changePosition = function() {
        var padding = 30;

        var containerWidth = document.getElementById('puzzle').offsetWidth;
        var containerHeight = document.getElementById('puzzle').offsetHeight;

        var xBound = containerWidth - this.btn.offsetWidth - (padding * 2);
        var yBound = containerHeight - this.btn.offsetHeight - (padding * 2);

        var x = Math.floor(Math.random() * xBound) + padding;
        var y = Math.floor(Math.random() * yBound) + padding;

        console.log("moving to: " + x + ", " + y);
        this.moveElement(x, y);
    };
    
    
    Magnet.prototype.moveElement = function(x, y) {
        this.x = x;
        this.y = y;

        this.btn.style.left = x + 'px';
        this.btn.style.top = y + 'px';
    };
    
    for (var i = 0; i < initialWords.length; i++){
        new Magnet(initialWords[i]);
    }
});


