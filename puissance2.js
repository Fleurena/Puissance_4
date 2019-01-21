(function($){

    $.fn.puissance = function(){

	var connect4 = $('#connect4');

	connect4.prepend(`
		<div class"row">
		<form><label>Grilles : </label>
		<input class="form-control" type="text" name="vertical" placeholder="6" id="row">
		<label>Colonnes : </label>
		<input class="form-control" type="text" name="horizontal" placeholder="7" id="col">
		<label>Couleur : </label>
			<select>
				<option value="rouge">Rouge</option>
				<option value="jaune">Jaune</option>
			</select>
			<input class="btn-success" type="submit" name="submit" id="submit">
		</form>
		</div>`);

	connect4.append('<div id="head"></div>');
	connect4.append('<div id="puissance"></div>');

	var puissance = $('#puissance');
	var head = $('#head');
	var id_jeton = 1;

//////////////// CSS
	$(head).css({
		backgroundColor: "#2812e9",
		height: "45px",
		paddingTop: "7px",
		display: "none",
		width: "600px",
		margin: "0 auto",
	});

	$('body').css({
		textAlign: "center",
	});

	puissance.css({
		backgroundColor: "#2812e9",
		display: "inline-block",
		margin: "10px",
		padding: "20px",
	});

	var color_play = "red";

//////////////// GRILLE
		
	function grille(param1, param2){
		var rows = param1;
		var cols = param2;

		puissance.empty();
		head.empty();
		for (var row_i = 0; row_i < rows; row_i++) {
			$row = $('<div>').addClass('row');
			puissance.append($row);

			for (var col_j = 0; col_j < cols; col_j++) {
				$col = $('<div>').addClass('col empty')
				.attr('data-col', col_j)
				.attr('data-row', row_i)
				.attr('data-color', "white");
				$row.append($col);
			}
			puissance.append($row);
		}
	}

//////////////// LAST COL
	function lastRow(col){
		var cells = $(`.col[data-col='${col}']`);
		for(var i = cells.length - 1; i >= 0; i--){
			$cell = $(cells[i]);
			if($cell.hasClass('empty'))
			{
				return $cell;
			}
		}
	}

	function submit(){
		$('#submit').click(function(){
			puissance.removeClass('row');
			puissance.removeClass('col empty');
			puissance.removeData('data-col');
			puissance.removeData('data-row');
			puissance.removeData('data-col');
			var param1 = $('#row').val();
			var param2 = $('#col').val();
			$grille = grille(param1, param2);
		});
	}
	
//////////////// CONTAINER
	function container(){
		$submit = submit();
		$grille = grille(6,7);

		puissance.on('mouseenter', '.col.empty', function(){
			var col = $(this).data('col');
			$lastEmptyCell = lastRow(col);
			$lastEmptyCell.addClass(`next-${color_play}`);
		});

		puissance.on('mouseleave', '.col.empty', function(){
			$('.col').removeClass(`next-${color_play}`);
		});

		puissance.on('click', '.col', function(){

			var col = $(this).data('col');
			var row = $(this).data('row');

			$lastEmptyCell = lastRow(col);
			$lastEmptyCell.removeClass("empty");
			$lastEmptyCell.addClass(`${color_play}`);

			$lastEmptyCell.attr('data-color', `${color_play}`);

			$diagonale = diagonale(col, row);
			$horizontal = horizontal(col, row);
			$vertical = vertical(col, row);

			color_play = (color_play === "red") ? "yellow" : "red";
			$('.restart').click(function(){

				$grille = grille(6,7);
			});


			if(color_play === "red"){
				$("p").remove();
				var joueur1 = puissance.prepend('<p>Tour : Joueur rouge</p>');
			}
			else{
				$("p").remove();
				var joueur2 = puissance.prepend('<p>Tour : Joueur jaune</p>');
			}

//////////////// JETONS
			// id_jeton++;
			// puissance.prepend('<div class="'+color_play+'" id="jeton'+id_jeton+'"></div>');

			// var jeton = $(color_play);
			// $('#jeton'+id_jeton).css({
			// 	position: "absolute",
			// 	left: event.target.offsetLeft,
			// });

			// $('#jeton'+id_jeton)
			// .animate({
			// 	top: event.target.offsetTop,
			// }, 5000);
		});
		}

	function vertical(col, row){

		var rows = $(`[data-col='${col}'][data-row='${row}']`).attr('data-color');

		var row1 = $(`[data-col='${col}'][data-row='${row +1}']`).attr('data-color');
		var row2 = $(`[data-col='${col}'][data-row='${row +2}']`).attr('data-color');
		var row3 = $(`[data-col='${col}'][data-row='${row +3}']`).attr('data-color');

		if(rows == row1 && rows == row2 && rows == row3)
		{
			$(head).css({
				display: "block",
			});
			var gagnant = head.prepend(`
			<div style="color: #fff; font-family:sans-serif;">Joueur ${color_play} a gagné !</div>`);
			var recommencer = head.prepend(`
			<button class="restart" type='button' value="recommencer">Recommencer</button>`);
		}
	}

	function horizontal(col, row){

		var cols = $(`[data-col='${col}'][data-row='${row}']`).attr('data-color');

		var col1 = $(`[data-col='${col +1}'][data-row='${row}']`).attr('data-color');
		var col2 = $(`[data-col='${col +2}'][data-row='${row}']`).attr('data-color');
		var col3 = $(`[data-col='${col +3}'][data-row='${row}']`).attr('data-color');


		var col_1 = $(`[data-col='${col -1}'][data-row='${row}']`).attr('data-color');
		var col_2 = $(`[data-col='${col -2}'][data-row='${row}']`).attr('data-color');
		var col_3 = $(`[data-col='${col -3}'][data-row='${row}']`).attr('data-color');

		if(cols == col1 && cols == col2 && cols == col3 
			|| cols == col_1 && cols == col_2 && cols == col_3
			|| cols == col_1 && cols == col1 && cols == col2
			|| cols == col1 && cols == col_1 && cols == col_2)
		{
			$(head).css({
				display: "block",
			});
			var gagnant = head.prepend(`
			<div style="color: #fff; font-family:sans-serif;">Joueur ${color_play} a gagné !</div>`);
			var recommencer = head.prepend(`
			<button class="restart" type='button' value="recommencer">Recommencer</button>`);
		}
	}

	function diagonale(col, row){

		var diags = $(`[data-col='${col}'][data-row='${row}']`).attr('data-color');

		var diag1 = $(`[data-col='${col -1}'][data-row='${row +1}']`).attr('data-color');
		var diag2 = $(`[data-col='${col -2}'][data-row='${row +2}']`).attr('data-color');
		var diag3 = $(`[data-col='${col -3}'][data-row='${row +3}']`).attr('data-color');

		var diag1_a = $(`[data-col='${col +1}'][data-row='${row -1}']`).attr('data-color');
		var diag2_a = $(`[data-col='${col +2}'][data-row='${row -2}']`).attr('data-color');
		var diag3_a = $(`[data-col='${col +3}'][data-row='${row -3}']`).attr('data-color');

		var diag_1 = $(`[data-col='${col +1}'][data-row='${row +1}']`).attr('data-color');
		var diag_2 = $(`[data-col='${col +2}'][data-row='${row +2}']`).attr('data-color');
		var diag_3 = $(`[data-col='${col +3}'][data-row='${row +3}']`).attr('data-color');

		var diag_1_1 = $(`[data-col='${col -1}'][data-row='${row -1}']`).attr('data-color');
		var diag_2_2 = $(`[data-col='${col -2}'][data-row='${row -2}']`).attr('data-color');
		var diag_3_3 = $(`[data-col='${col -3}'][data-row='${row -3}']`).attr('data-color');

		if(diags == diag1 && diags == diag2 && diags == diag3
			|| diags == diag_1 && diags == diag_2 && diags == diag_3
			|| diags == diag_1_1 && diags == diag_2_2 && diags == diag_1
			|| diags == diag1_a && diags == diag2_a && diags == diag1
			|| diags == diag_1_1 && diags == diag_1 && diags == diag_2
			|| diags == diag1_a && diags == diag1 && diags == diag2
			|| diags == diag1_a && diags == diag2_a && diags == diag3_a
			|| diags == diag_1_1 && diags == diag_2_2 && diags == diag_3_3)
		{
			$(head).css({
				display: "block",
			});
			var gagnant = head.prepend(`
			<div style="color: #fff; font-family:sans-serif;">Joueur ${color_play} a gagné !</div>`);
			var recommencer = head.prepend(`
			<button class="restart" type='button' value="recommencer">Recommencer</button>`);
		}

	}
	$container = container();
};
})(jQuery);

$(document).ready(function () {
	$('body').puissance();
});