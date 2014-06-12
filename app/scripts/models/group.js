/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	WorldCupBracket.Models.Group = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.teams = new WorldCupBracket.Collections.Team(options.teams, {
				comparator: function(a, b) {
					if (a.points() !== b.points()) {
						return b.points() - a.points();
					} else {
						if (a.goalDif() !== b.goalDif()) { //Tordifferenz alle Spiele
							return (a.goalDif() > b.goalDif()) ? -1 : 1;
						} else {
							if (a.goals() !== b.goals()) {
								return b.goals() - a.goals();
							} else {
								//console.log("DIREKTVERGLEICH")
							}
						}
					}
				}
			});
			this.matches = options.matches;

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
			this.teams.each(function(team) {
				team.points(0);
				team.goals(0);
				team.goalDif(0);
			});

			this.matches.each(function(match) {
				if(match.finished()) {
					var points = match.points();
					match.home().addPoints(points[0]);
					match.guest().addPoints(points[1]);

					var goals = match.result();

					match.home().addGoals(goals[0]);
					match.guest().addGoals(goals[1]);

					match.home().addGoalDif(goals[0] - goals[1]);
					match.guest().addGoalDif(goals[1] - goals[0]);
				}
			});

			this.teams.sort();

			if(this.finished()) {

				WorldCupBracket.matchEvents.trigger(this.id + '1', this.id + '1', this.teams.at(0));
				WorldCupBracket.matchEvents.trigger(this.id + '2', this.id + '2', this.teams.at(1));
			}
		}
	});

})();
