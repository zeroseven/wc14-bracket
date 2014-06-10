/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	WorldCupBracket.Models.Group = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.teams = new WorldCupBracket.Collections.Team(options.teams, {
				comparator: function(a, b) {
					return b.points() - a.points();
				}
			});
			this.matches = WorldCupBracket.Collections.Match.forGroup(this.id, this.teams);

			this.matches.on(
				'change:result',
				_.debounce(this.updateTable, 100),
				this
			);
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

		updateTable: function() {
			console.log('updateTable');
			this.teams.each(function(team) {
				team.points(0);
			});

			this.matches.each(function(match) {
				if(match.finished()) {
					var points = match.points();
					match.home.addPoints(points[0]);
					match.guest.addPoints(points[1]);
				}
			});

			this.teams.sort();
		}
	});

})();
