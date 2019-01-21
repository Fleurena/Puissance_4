$(document).ready(function () {
	var puissance = $('#connect4');

	var rows = 6;
	var cols = 7;
	var color_play = "red";
	var id_jeton = 1;


	for (var row = 0; row < rows; row++) {
		$row = $('<div>').addClass('row');
		puissance.append($row);

		for (var col = 0; col < cols; col++) {
			$col = $('<div>').addClass('col empty')
			.attr('data-col', col)
			.attr('data-row', row);
			$row.append($col);
		}
		puissance.append($row);
	}

	function lastcell(col){
		cells = $(`.col[data-col='${col}']`);
		for(var i = cells.length - 1; i >= 0; i--){
			$cell = $(cells[i]);
			if($cell.hasClass('empty'))
			{
				return $cell;
			}
		}
		return null;
	}


	puissance.on('mouseenter', '.col.empty', function(){
		var col = $(this).data('col');
		$lastEmptyCell = lastcell(col);
		$lastEmptyCell.addClass(`next-${color_play}`);
	});

	puissance.on('mouseleave', '.col.empty', function(){
		$('.col').removeClass(`next-${color_play}`);
	});

	puissance.on('click', '.col', function(event){

		col = $(this).data('col');
		row = $(this).data('row');

		color_play = (color_play === "red") ? "yellow" : "red";

		id_jeton++;
		puissance.prepend('<div class="'+color_play+'" id="jeton'+id_jeton+'"></div>');

		var jeton = $(color_play);
		$('#jeton'+id_jeton).css({left: event.target.offsetLeft});

		console.log(jeton);

		$lastEmptyCell = lastcell(col);
		$lastEmptyCell.removeClass("empty");
		console.log(event.target.offsetLeft);
		// $lastEmptyCell.addClass(`${color_play}`);
		$('#jeton'+id_jeton)
		.animate({
			top: event.target.offsetTop,
		}, 5000);


		if(color_play === "red"){
			$("p").remove();
			var joueur1 = puissance.prepend('<p>Tour : Joueur rouge</p>');
		}
		else{
			$("p").remove();
			var joueur2 = puissance.prepend('<p>Tour : Joueur jaune</p>');
		}
		$win = winner(col);
	});

	function winner(col){

		var cols = $(`.col[data-col='${col}']`);

		for(var i = cols.length - 1; i < $col.length; i++){
			console.log($cell);
			var cell = $(cols[i]);
			if(cell.hasClass('red'))
			{
				var total = 0;
				total += 1;
				console.log(cell);
				if(cell == 4){
					puissance.append('<p>Gagné</p>');
					console.log(cell);
				}
			}
		}

		// for(var j = rows.length - 1; j <= cols; j++){
		// 	$row = $(rows[i]);
		// 	console.log($row);
		// 	return $row;
		// }

		// if(cols.hasClass("red") && data_col === $col)
		// {
		// 	puissance.append('<p>Gagné</p>');
		// 	console.log($col);
		// 	console.log($row);
		// 	console.log(cols);
		// }
	}

})