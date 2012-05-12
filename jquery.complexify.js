(function ($) {

	$.fn.extend({
		complexify: function(options, callback) {

			var UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
			var NUMBERS = "0123456789";
			var PUNCTUATION = "!@£$%^&*()_+-={}[]:\"|;'\<>?,./`~¡€#¢∞§¶•ªº–≠“‘…æ«≤≥÷=/*-+§±»’”";
			var SETS = [UPPER_CHARS, LOWER_CHARS, NUMBERS, PUNCTUATION];

			var MIN_COMPLEXITY = 49; // 8 chars with Upper, Lower and Number
			var MAX_COMPLEXITY = 120; //  25 chars, all charsets

			var defaults = {
				minimumChars: 8,
				strengthScaleFactor: 1
			};
			var options = $.extend(defaults, options);

			var calculateComplexity = function(password) {
				var complexity = 0, valid = false;

				if (password.containsCharSet(LOWER_CHARS)) {
					complexity += LOWER_CHARS.length;
				}

				if (password.containsCharSet(UPPER_CHARS)) {
					complexity += UPPER_CHARS.length;
				}

				if (password.containsCharSet(PUNCTUATION)) {
					complexity += PUNCTUATION.length;
				}

				if (password.containsCharSet(NUMBERS)) {
					complexity += NUMBERS.length;
				}
				
				complexity = Math.log(Math.pow(complexity, password.length)) * (1/options.strengthScaleFactor);
				valid = (complexity > MIN_COMPLEXITY && password.length >= options.minimumChars);
				complexity = (complexity / MAX_COMPLEXITY) * 100;
				complexity = (complexity > 100) ? 100 : complexity;
				return {'valid':valid, 'complexity':complexity};
			}

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
					var result = calculateComplexity(password);
					callback(result.valid, result.complexity);
				});
			});
			
		}
	});

})(jQuery);