/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	WorldCupBracket.Models.Group = Backbone.Model.extend({

		url: '',

		initialize: function(attributes, options) {
			this.teams = new WorldCupBracket.Collections.Team(options.teams);
			this.matches = WorldCupBracket.Collections.Match.forGroup(this.id, this.teams);
		},

		defaults: {},

		validate: function(/*attrs, options*/) {},

		parse: function(response/*, options*/) {
			return response;
		},

		finished: function() {
			return this.matches.reduce(function(finished, match) {
				return finished && match.finished();
			}, true);
		}
	});

})();
