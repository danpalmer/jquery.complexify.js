(function ($) {

	$.fn.extend({
		complexify: function(options, callback) {

			var UPPER_CHARS = /[A-Z]/;
			var LOWER_CHARS = /[a-z]/;
			var NUMBERS = /\d/;
			var PUNCTUATION = /[!@£$%^&*\(\)_+-=\{\}\[\]:\\"|;'<>?,.\/`~¡€#¢∞§¶•ªº–≠“‘…æ«≤≥÷=*-+§±»’”]/;
			var SETS = [UPPER_CHARS, LOWER_CHARS, NUMBERS, PUNCTUATION];

			var MIN_COMPLEXITY = 49; // 12 chars with Upper, Lower and Number
			var MAX_COMPLEXITY = 120; //  25 chars, all charsets

			var defaults = {
				minimumChars: 8,
				strengthScaleFactor: 1
			};
			if($.isFunction(options) && !callback) {
				callback = options;
				options = {};
			}
			options = $.extend(defaults, options);

			return this.each(function () {
				$(this).keyup(function () {
					var password = $(this).val();
					var complexity = 0, valid = false;
				
					for (var i = SETS.length - 1; i >= 0; i--) {
						if (SETS[i].test(password)) {
							complexity += SETS[i].length;
						}
					}
					
					// Use natural log to produce linear scale
					complexity = Math.log(Math.pow(complexity, password.length)) * (1/options.strengthScaleFactor);

					valid = (complexity > MIN_COMPLEXITY && password.length >= options.minimumChars);

					// Scale to percentage, so it can be used for a progress bar
					complexity = (complexity / MAX_COMPLEXITY) * 100;
					complexity = (complexity > 100) ? 100 : complexity;

					callback.call(this, valid, complexity);
				});
			});
			
		}
	});

})(jQuery);