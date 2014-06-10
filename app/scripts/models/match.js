/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	WorldCupBracket.Models.Match = Backbone.Model.extend({

		url: '',

		initialize: function(attributes/*, options*/) {
			this.home = WorldCupBracket.teams.get(attributes.home);
			this.guest = WorldCupBracket.teams.get(attributes.guest);
			this.stadium = WorldCupBracket.stadiums.get(attributes.stadium);

			this.on('change:result', this.persistResult, this);

			try {
				var results = JSON.parse(localStorage.results);
				if(results[this.id]) {
					this.set('result', results[this.id], {silent: true});
				}
			} catch (e) {}
		},

		defaults: {},

		validate: function( /*attrs, options*/ ) {},

		parse: function(response/*, options*/ ) {
			return response;
		},

		result: function() {
			var args = Array.prototype.slice.call(arguments, 0);
			var invalid = new Error('Expected either no arguments, Array of length 2, or two Numbers');
			switch(arguments.length) {
			case 0:
				return this.get('result');
			case 1:
				if(_.isArray(args[0]) && args[0].length === 2) {
					this.set('result', args[0]);
				} else {
					throw invalid;
				}
				break;
			case 2:
				this.set('result', args);
				break;
			default:
				throw invalid;
			}
		},

		persistResult: function() {
			localStorage.results = localStorage.results || '{}';
			var results = JSON.parse(localStorage.results);
			results[this.id] = this.get('result');
			localStorage.results = JSON.stringify(results);
		},

		finished: function() {
			var result = this.get('result');
			return _.isArray(result)
			    && result.length === 2
			    && _.isNumber(result[0])
			    && _.isNumber(result[1]);
		}
	});

})();
