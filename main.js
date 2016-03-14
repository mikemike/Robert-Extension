chrome.storage.sync.get(null, function(re){

	var modifier; // 0.00625
	var customname; // Griff
	var $table = $('#profit-loss-table');

	modifier = re.modifier;
	customname = re.customname;
	// Add custom options to dorpdown
	$('#date-shortcut option:first').after("<option value='select-dates'>Yesterday</option><option value='select-dates'>Last Week</option>");

	$(document).on('change', '#date-shortcut', function(){
		// Yesterday
		if( $('option:selected', this).html() == 'Yesterday' ){
			var date = new Date();
			date.setDate(date.getDate() - 1);
			var yesterday = ('0' + date.getDate()).slice(-2) + '-'
	             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
	             + date.getFullYear();
			
			$('#dateFrom').val( yesterday );
			$('#dateTo').val( yesterday );
			$('.quick-form').submit();
		}
		// Last week
		if( $('option:selected', this).html() == 'Last Week' ){
			var dateToday = new Date();
			dateToday.setDate(dateToday.getDate());
			var today = ('0' + dateToday.getDate()).slice(-2) + '-'
	             + ('0' + (dateToday.getMonth()+1)).slice(-2) + '-'
	             + dateToday.getFullYear();
			console.log(today);

			var dateMonday = getMonday(new Date());
			var monday = ('0' + dateMonday.getDate()).slice(-2) + '-'
	             + ('0' + (dateMonday.getMonth()+1)).slice(-2) + '-'
	             + dateMonday.getFullYear();
			console.log(monday);
			
			$('#dateFrom').val( monday );
			$('#dateTo').val( today );
			$('.quick-form').submit();
		}
	});

	// Calculate custom p/l
	$('thead tr', $table).append("<th>" + customname + "'s slice</td>");

	$('tfoot tr', $table).each(function(){
		var net = $('td:last-child', this).html();
		net = parseFloat(net.replace(/,/g, ''));

		var griffsSlice = net * modifier;

		$(this).append('<td>' + Math.round(griffsSlice * 100) / 100 + '</td>');
	});


	// Get last monday
	function getMonday(d) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6:1) + (day == 1 ? -7:0); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

});

