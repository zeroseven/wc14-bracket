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
		},

		table: function() {
			var table = {};
			this.teams.each(function(team) {
				table[team.id] = 0;
			});

			this.matches.each(function(match) {
				var points = match.points();
				table[match.home.id] += points[0];
				table[match.guest.id] += points[1];
			});

			table = _.pairs(table);
			table = _.sortBy(table, function(match) {
				return - match[1];
			});

			table.forEach(function(entry) {
				entry[0] = this.teams.get(entry[0]);
			}.bind(this));

			return table;
		}
	});

})();
