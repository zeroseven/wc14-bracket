/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	var accessor = WorldCupBracket.Mixins.accessor;

	WorldCupBracket.Models.Match = Backbone.Model.extend({

		url: '',

		initialize: function(attributes, options) {
			options = options || {};
			this._home = options.home;
			this._guest = options.guest;
			this._stadium = options.stadium;

			this.on('change:result', this.persistResult, this);

			this.loadResults();
		},

		defaults: {},

		validate: function( /*attrs, options*/ ) {},

		parse: function(response/*, options*/ ) {
			return response;
		},

		home: function(value) {
			if(value) {
				this.trigger('team team:home', value);
				this._home = value;
			} else {
				return this._home;
			}
		},

		guest: function(value) {
			if(value) {
				this.trigger('team team:guest', value);
				this._guest = value;
			} else {
				return this._guest;
			}
		},

		stadium: function(value) {
			if(value) {
				this._stadium = value;
			} else {
				return this._stadium;
			}
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

		persistResult: function(model, value, options) {
			if(options.skipPersist !== true) {
				localStorage.results = localStorage.results || '{}';
				var results = JSON.parse(localStorage.results);
				results[this.id] = this.get('result');
				localStorage.results = JSON.stringify(results);
			}
		},

		loadResults: function() {
			try {
				var results = JSON.parse(localStorage.results);
				if(results[this.id]) {
					this.set('result', results[this.id], { skipPersist: true });
				}
			} catch (e) {}
		},

		finished: function() {
			var result = this.get('result');
			return _.isArray(result) &&
			       result.length === 2 &&
			       _.isNumber(result[0]) &&
			       !isNaN(result[0]) &&
			       _.isNumber(result[1]) &&
			       !isNaN(result[1]);
		},

		points: function() {
			if(this.finished()) {
				var result = this.result(),
				    home = result[0],
				    guest = result[1];
				if(home > guest) {
					return [3, 0];
				} else if(home < guest) {
					return [0, 3];
				} else {
					return [1, 1];
				}
			}
		},

		matchNum: accessor('matchNum')
	});

})();
