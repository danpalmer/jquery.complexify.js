(function ($) {

	$.fn.extend({
		complexify: function(options, callback) {

			var UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
			var NUMBERS = "0123456789";
			var PUNCTUATION = "!@£$%^&*()_+-={}[]:\"|;'\<>?,./`~¡€#¢∞§¶•ªº–≠“‘…æ«≤≥÷=/*-+§±»’”";
			var SETS = [UPPER_CHARS, LOWER_CHARS, NUMBERS, PUNCTUATION];

			var MIN_COMPLEXITY = 33; // 8 chars with Upper, Lower and Number
			var MAX_COMPLEXITY = 120; //  25 chars, all charsets

			var defaults = {
				minimumChars: 8,
				strengthScaleFactor: 1
			};
			var options = $.extend(defaults, options);

			String.prototype.containsCharSet = function( charset) {
				for (var i = 0; i < charset.length; i++) {
					if (this.indexOf(charset[i]) > -1) {
						return true;
					}
				}
				return false;
			}

			return this.each(function () {
				$(this).keyup(function () {
					var password = $(this).val();
					var complexity = 0, valid = false;
				
					for (var i = SETS.length - 1; i >= 0; i--) {
						if (password.containsCharSet(SETS[i])) {
							complexity += SETS[i].length;
						}
					}
					
					// Use natural log to produce linear scale
					complexity = Math.log(Math.pow(complexity, password.length)) * (1/options.strengthScaleFactor);

					valid = (complexity > MIN_COMPLEXITY && password.length >= options.minimumChars);

					// Scale to percentage, so it can be used for a progress bar
					complexity = (complexity / MAX_COMPLEXITY) * 100;
					complexity = (complexity > 100) ? 100 : complexity;

					callback(valid, complexity);
				});
			});
			
		}
	});

})(jQuery);