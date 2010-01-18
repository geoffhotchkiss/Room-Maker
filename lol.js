window.addEventListener('load', function() {
	var canvas;
	var ctx;
	var width;
	var height;
	function init() {
		canvas = document.getElementById('imageView');
		ctx = canvas.getContext('2d');
		canvas.addEventListener('mousedown', ev_mousedown, false);
		canvas.addEventListener('mousemove', ev_mousemove, false);
		canvas.addEventListener('mouseup', ev_mouseup, false);
	}
	
	init();
	
	var scale = 3;
	
	var bedlength = 84.25*scale;
	var bedwidth = 36*scale;
	var dresserlength = 24*scale;
	var dresserwidth = 22.5*scale;
	var desklength = 42*scale;
	var deskwidth = 28.25*scale;
	var drawerlength = 17*scale;
	var drawerwidth = 28.25*scale;
	
	var dresser1 = [1, 1];
	var dresser2 = [canvas.width-dresserlength-1, 1];
	var bed1 = [1, 1+dresserwidth+10];
	var bed2 = [canvas.width - bedwidth-1, 1+dresserwidth+10];
	var desk1 = [1, 1 + dresserwidth + 10 + bedlength + 10];
	var desk2 = [canvas.width - deskwidth -1, 1 + dresserwidth + 10 + bedlength + 10];
	var drawer1 = [1, 1 + dresserwidth + 10 + bedlength + 10 + desklength + 10];
	var drawer2 = [canvas.width - drawerwidth - 1, 1 + dresserwidth + 10 + bedlength + 10 + desklength + 10];
	
	var selected;
	var objectselected;
    var x1; 
    var y1;
    var oldx1;
    var oldy1;

	function drawRoom(dr1, dr2, b1, b2, d1, d2, dra1, dra2) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(Math.max(0, Math.min(canvas.width - dresserlength, dr1[0])), Math.max(0, Math.min(canvas.height - dresserwidth, dr1[1])), dresserlength, dresserwidth);
        ctx.fillRect(Math.max(0, Math.min(canvas.width - dresserlength, dr2[0])), Math.max(0, Math.min(canvas.height - dresserwidth, dr2[1])), dresserlength, dresserwidth);
        ctx.fillRect(Math.max(0, Math.min(b1[0], canvas.width-bedwidth)), Math.max(0, Math.min(b1[1], canvas.height-bedlength)), bedwidth, bedlength);
        ctx.fillRect(Math.max(0, Math.min(b2[0], canvas.width-bedwidth)), Math.max(0, Math.min(b2[1], canvas.height-bedlength)), bedwidth, bedlength);
        ctx.fillRect(Math.max(0, Math.min(d1[0], canvas.width-deskwidth)), Math.max(0, Math.min(d1[1], canvas.height-desklength)), deskwidth, desklength);
        ctx.fillRect(Math.max(0, Math.min(d2[0], canvas.width-deskwidth)), Math.max(0, Math.min(d2[1], canvas.height-desklength)), deskwidth, desklength);
        ctx.fillRect(Math.max(0, Math.min(dra1[0], canvas.width-drawerwidth)), Math.max(0, Math.min(dra1[1], canvas.height-drawerlength)), drawerwidth, drawerlength);
        ctx.fillRect(Math.max(0, Math.min(dra2[0], canvas.width-drawerwidth)), Math.max(0, Math.min(dra2[1], canvas.height-drawerlength)), drawerwidth, drawerlength);
        var x1 = 27.5*scale;
        var y1 = 55*scale;
        ctx.strokeRect(0, canvas.height - y1, x1, y1);
        ctx.strokeRect(canvas.width - x1, canvas.height - y1, x1, y1);
	}
	
	function selectedDresser(dresser, x, y) {
		var answer = (x - dresser[0] >= 0) && (dresserlength + dresser[0] - x >= 0);
		answer = answer && (y - dresser[1] >=0) && (dresserwidth + dresser[1] - y >=0);
		return answer;
	}
	
	function selectedBed(bed, x, y) {
		var answer = (x - bed[0] >= 0) && (bedwidth + bed[0] - x >= 0);
		answer = answer && (y - bed[1] >=0) && (bedlength + bed[1] - y >=0);
		return answer;
	}
	
	function selectedDesk(desk, x, y) {
		var answer = (x - desk[0] >= 0) && (deskwidth + desk[0] - x >= 0);
		answer = answer && (y - desk[1] >=0) && (desklength + desk[1] - y >=0);
		return answer;
	}
	
	function selectedDrawer(drawer, x, y) {
		var answer = (x - drawer[0] >= 0) && (drawerwidth + drawer[0] - x >= 0);
		answer = answer && (y - drawer[1] >=0) && (drawerlength + drawer[1] - y >=0);
		return answer;
	}
	
	function ev_mousedown(ev) {
		var x = ev.layerX;
		var y = ev.layerY;
        x1 = x;
        y1 = y;
		selected = true;
		if(selectedDresser(dresser1, x, y)) {
			objectselected = 1;
		} else if(selectedDresser(dresser2, x, y )) {
			objectselected = 2;
		} else if(selectedBed(bed1, x, y)) {
			objectselected = 3;
		} else if(selectedBed(bed2, x, y)) {
			objectselected = 4;
		} else if(selectedDesk(desk1, x, y)) {
			objectselected = 5;
		} else if(selectedDesk(desk2, x, y)) {
			objectselected = 6;
		} else if(selectedDrawer(drawer1, x, y)) {
			objectselected = 7;
		} else if(selectedDrawer(drawer2, x, y)) {
			objectselected = 8;
		} else {
			selected = false;
			objectselected = 0;		
		}
		return objectedselected;
	}

	function ev_mousemove(ev) {
        oldx1 = x1;
        oldy1 = y1;
        x1 = ev.layerX;
        y1 = ev.layerY;
        var offsetX = (x1 - oldx1);
        var offsetY = (y1 - oldy1);
		if(selected) {
			if(objectselected == 1) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				dresser1[0] += offsetX;
				dresser1[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			} else if(objectselected == 2) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				dresser2[0] += offsetX;
				dresser2[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			} else if(objectselected == 3) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				bed1[0] += offsetX;
				bed1[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			} else if(objectselected == 4) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				bed2[0] += offsetX;
				bed2[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			} else if(objectselected == 5) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				desk1[0] += offsetX;
				desk1[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			} else if(objectselected == 6) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				desk2[0] += offsetX;
				desk2[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			} else if(objectselected == 7) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				drawer1[0] += offsetX;
				drawer1[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			}
			else if(objectselected == 8) {
				ctx.clearRect(0,0,canvas.width, canvas.height);
				drawer2[0] += offsetX;
				drawer2[1] += offsetY;
				drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
			}
		}
		
		return 3;
	}
	
	function ev_mouseup(ev) {
		selected = !selected;
		
		return 2;
	}
	drawRoom(dresser1, dresser2, bed1, bed2, desk1, desk2, drawer1, drawer2);
	
}, false);
