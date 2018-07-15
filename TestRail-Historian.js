$( document ).ready(function() {
	var urlSearch = window.location.search;
	var html = $("body").html();
	if (urlSearch.indexOf("/cases/") >= 0 && urlSearch.indexOf("/history/") >= 0 && html.indexOf("About TestRail") >= 0)
	{
		console.log("TestRail Historian is Online");

		//jsdiff.js beginning
		/*
		 * Javascript Diff Algorithm
		 *  By John Resig (http://ejohn.org/)
		 *  Modified by Chu Alan "sprite"
		 *
		 * Released under the MIT license.
		 *
		 * More Info:
		 *  http://ejohn.org/projects/javascript-diff-algorithm/
		 */

		function escape(s) {
		    var n = s;
		    n = n.replace(/&/g, "&amp;");
		    n = n.replace(/</g, "&lt;");
		    n = n.replace(/>/g, "&gt;");
		    n = n.replace(/"/g, "&quot;");

		    return n;
		}

		function diffString( o, n ) {
		  o = o.replace(/\s+$/, '');
		  n = n.replace(/\s+$/, '');

		  var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
		  var str = "";

		  var oSpace = o.match(/\s+/g);
		  if (oSpace == null) {
		    oSpace = ["\n"];
		  } else {
		    oSpace.push("\n");
		  }
		  var nSpace = n.match(/\s+/g);
		  if (nSpace == null) {
		    nSpace = ["\n"];
		  } else {
		    nSpace.push("\n");
		  }

		  if (out.n.length == 0) {
		      for (var i = 0; i < out.o.length; i++) {
		        str += '<del style="background:#FFE6E6;line-height: 1.5">' + escape(out.o[i]) + oSpace[i] + "</del>";
		      }
		  } else {
		    if (out.n[0].text == null) {
		      for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
		        str += '<del style="background:#FFE6E6;line-height: 1.5">' + escape(out.o[n]) + oSpace[n] + "</del>";
		      }
		    }

		    for ( var i = 0; i < out.n.length; i++ ) {
		      if (out.n[i].text == null) {
		        str += '<ins style="background:#E6FFE6;line-height: 1.5">' + escape(out.n[i]) + nSpace[i] + "</ins>";
		      } else {
		        var pre = "";

		        for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
		          pre += '<del style="background:#FFE6E6;line-height: 1.5">' + escape(out.o[n]) + oSpace[n] + "</del>";
		        }
		        str += " " + out.n[i].text + nSpace[i] + pre;
		      }
		    }
		  }
		  
		  return str;
		}

		function randomColor() {
		    return "rgb(" + (Math.random() * 100) + "%, " + 
		                    (Math.random() * 100) + "%, " + 
		                    (Math.random() * 100) + "%)";
		}
		function diffString2( o, n ) {
		  o = o.replace(/\s+$/, '');
		  n = n.replace(/\s+$/, '');

		  var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );

		  var oSpace = o.match(/\s+/g);
		  if (oSpace == null) {
		    oSpace = ["\n"];
		  } else {
		    oSpace.push("\n");
		  }
		  var nSpace = n.match(/\s+/g);
		  if (nSpace == null) {
		    nSpace = ["\n"];
		  } else {
		    nSpace.push("\n");
		  }

		  var os = "";
		  var colors = new Array();
		  for (var i = 0; i < out.o.length; i++) {
		      colors[i] = randomColor();

		      if (out.o[i].text != null) {
		          os += '<span style="background-color: ' +colors[i]+ '">' + 
		                escape(out.o[i].text) + oSpace[i] + "</span>";
		      } else {
		          os += "<del>" + escape(out.o[i]) + oSpace[i] + "</del>";
		      }
		  }

		  var ns = "";
		  for (var i = 0; i < out.n.length; i++) {
		      if (out.n[i].text != null) {
		          ns += '<span style="background-color: ' +colors[out.n[i].row]+ '">' + 
		                escape(out.n[i].text) + nSpace[i] + "</span>";
		      } else {
		          ns += "<ins>" + escape(out.n[i]) + nSpace[i] + "</ins>";
		      }
		  }

		  return { o : os , n : ns };
		}

		function diff( o, n ) {
		  var ns = new Object();
		  var os = new Object();
		  
		  for ( var i = 0; i < n.length; i++ ) {
		    if ( ns[ n[i] ] == null )
		      ns[ n[i] ] = { rows: new Array(), o: null };
		    ns[ n[i] ].rows.push( i );
		  }
		  
		  for ( var i = 0; i < o.length; i++ ) {
		    if ( os[ o[i] ] == null )
		      os[ o[i] ] = { rows: new Array(), n: null };
		    os[ o[i] ].rows.push( i );
		  }
		  
		  for ( var i in ns ) {
		    if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
		      n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
		      o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
		    }
		  }
		  
		  for ( var i = 0; i < n.length - 1; i++ ) {
		    if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
		         n[i+1] == o[ n[i].row + 1 ] ) {
		      n[i+1] = { text: n[i+1], row: n[i].row + 1 };
		      o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
		    }
		  }
		  
		  for ( var i = n.length - 1; i > 0; i-- ) {
		    if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
		         n[i-1] == o[ n[i].row - 1 ] ) {
		      n[i-1] = { text: n[i-1], row: n[i].row - 1 };
		      o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
		    }
		  }
		  
		  return { o: o, n: n };
		}
		//jsdiff.js end


		function balanceArray(prevArray, newArray) {
			var difference = Math.abs(newArray.length - prevArray.length);
			if (newArray.length > prevArray.length){
				for (i = 0; i < difference; ++i) {
					prevArray.push("");
				}
			}
			else {
				for (i = 0; i < difference; ++i) {
					newArray.push("");
				}
			}
			return [prevArray, newArray];
		}

		function showHidden(element, step = false) {
			if (step) {
				$( element ).children("div").first().hide();
			}
			else{
				$( element ).children("div").eq(1).hide();
			}
			$( element ).children('.hidden').show();			
		}

		function redrawHistory(element, output) {
			for (i = 0; i < output[1].length; ++i) {
				$( element ).parent().append(
			    	diffString(output[0][i], output[1][i])
			    );
			    $( element ).parent().append("<br / >");
			}
		}

		function redrawNotesOrPreconditionsHistory(element, output) {
			$( element ).parent().append("<br / >");
			redrawHistory(element, output);
			$( element ).parent().append("<br / >");
			$( element ).remove();
		}

		function redrawStepsHistory(element, steps, expecteds) {
			redrawHistory(element, steps);
			$( element ).parent().append("<h2>=Expected Result=</h2>");
			redrawHistory(element, expecteds);
		}

		function sleep(milliseconds) {
		  var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > milliseconds){
		      break;
		    }
		  }
		}

		//each history update
		$('#history').children('.change-container').children('.change').children('.table').children('.column.change-column.change-column-content').children('.history').children('tbody').children('tr').children('td').each(function( index ) {
	  		var newTextElement = $( this ).children('.markdown');
	  		var previousTextElement = $( this ).children('.hidden').children('.markdown');
	  		//Notes or Preconditions
	  		if ( $( newTextElement ).first().length ) {
		    	var newText = $.trim($( newTextElement ).prop("innerText")).replace(/\t/g, '');
		    	showHidden($( this ), false);
		    	var previousText = $.trim($( previousTextElement ).prop("innerText")).replace(/\t/g, '');
		    	var newTextArray = newText.split("\n");
				var previousTextArray = previousText.split("\n");
				var outputText = balanceArray(previousTextArray, newTextArray);
				redrawNotesOrPreconditionsHistory($( this ), outputText);
			}
			//when None
			else if ( $( this ).children('em').first().length && ( $( this ).parent().children('th').text().indexOf("Notes") >= 0 ||  $( this ).parent().children('th').text().indexOf("Preconditions") >= 0 )) {
				var newText = "";
				showHidden($( this ), false);
				var previousText = $.trim($( previousTextElement ).prop("innerText")).replace(/\t/g, '');
		    	var newTextArray = newText.split("\n");
				var previousTextArray = previousText.split("\n");
				var outputText = balanceArray(previousTextArray, newTextArray);

				redrawNotesOrPreconditionsHistory($( this ), outputText);
			}
			//Steps
			else if ( $( this ).children('ol').length ) {
				var newSteps = [];
				var newExpecteds = [];
				showHidden($( this ), true);
				var prevSteps = [];
				var prevExpecteds = [];

				//each new step
				$( this ).children('ol').children('li').each(function( index ) {
					var newStepElement = $( this ).children('.markdown');
					if ( $( newStepElement ).first().length ){
						var newStep = $.trim($( newStepElement ).first().prop("innerText")).replace(/\t/g, '');
						newSteps.push(newStep);
					}
					else {
						newSteps.push("");
					}

					if ( $( newStepElement ).eq(1).length ){
						var newExpected = $.trim($( newStepElement ).eq(1).prop("innerText")).replace(/\t/g, '');
						newExpecteds.push(newExpected);
					}
					else {
						newExpecteds.push("");
					}
				});

				//each previous step
				$( this ).children('.hidden').children('ol').children('li').each(function( index ) {
					var prevStepElement = $( this ).children('.markdown');
					if ( $( prevStepElement ).first().length ){
						var prevStep = $.trim($( prevStepElement ).first().prop("innerText")).replace(/\t/g, '');
						prevSteps.push(prevStep);
					}
					else {
						prevSteps.push("");
					}

					if ( $( this ).children('.markdown').eq(1).length ){
						var prevExpected = $.trim($( prevStepElement ).eq(1).prop("innerText")).replace(/\t/g, '');
						prevExpecteds.push(prevExpected);
					}
					else {
						prevExpecteds.push("");
					}
				});

				//todo (j.cerny): refact by balanceArray
				var cottonWool = Math.abs(newSteps.length - prevSteps.length);
				if (newSteps.length > prevSteps.length){
					for (index = 0; index < cottonWool; ++index) {
						prevSteps.push("");
						prevExpecteds.push("");
					}
				}
				else {
					for (index = 0; index < cottonWool; ++index) {
						newSteps.push("");
						newExpecteds.push("");
					}
				}

				for (index = 0; index < newSteps.length; ++index) {
					$( this ).parent().append("<h2>=" + (index + 1) + "=</h2>");
					var newStepsArray = newSteps[index].split("\n");
					var prevStepsArray = prevSteps[index].split("\n");
					var newExpectedsArray = newExpecteds[index].split("\n");
					var prevExpectedsArray = prevExpecteds[index].split("\n");
					var outputSteps = balanceArray(prevStepsArray, newStepsArray);
					var outputExpecteds = balanceArray(prevExpectedsArray, newExpectedsArray);
					
					redrawStepsHistory($( this ), outputSteps, outputExpecteds);
				}
				$( this ).remove();
			}
		});
	}
});