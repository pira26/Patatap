// Create a rectangle shaped path with its top left point at
// {x: 75, y: 75} and a size of {width: 75, height: 75}
var count = 150;
var path = new Path.Rectangle({
	point: [200, 100],
	size: [200, 200],
	fillColor: 'red'
});

var path2 = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'white',
	strokeColor: 'black'
});

var symbol = new Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	placedSymbol.scale(i / count);
}

function onFrame(event) {
	// Run through the active layer's children list and change
	// the position of the placed symbols:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		
		// Move the item 1/20th of its width to the right. This way
		// larger circles move faster than smaller circles:
		item.position.x += item.bounds.width / 20;

		// If the item has left the view on the right, move it back
		// to the left:
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
		// Each frame, rotate the path by 3 degrees:
	path.rotate(20);
	path.fillColor.hue += 0.5;
}