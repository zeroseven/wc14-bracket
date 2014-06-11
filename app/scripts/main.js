/*global WorldCupBracket, $*/
'use strict';
(function() {
	var stadiums = null,
	    teams = null,
	    groups = null;

	var accessor = function(name) {
		return function(value) {
			// console.log('accessor', this, name, value);
			if(arguments.length === 0) {
				// console.log('get', this.get(name));
				return this.get(name);
			} else {
				// console.log('set', value);
				this.set(name, value);
			}
		};
	};

	var matchEvents = _.extend({}, Backbone.Events);

	var wcb = window.WorldCupBracket = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		Mixins: {
			accessor: accessor
		},
		matchEvents: matchEvents,

		init: function(data) {
			wcb.stadiums = stadiums = new wcb.Collections.Stadium();
			stadiums.reset(data.stadiums);

			teams = new wcb.Collections.Team();
			teams.reset(data.teams);

			groups = new wcb.Collections.Group();


			// group stage
			['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(function(id, index) {
				var group = new wcb.Models.Group({
					id: id
				}, {
					teams: teams.slice(index * 4, index * 4 + 4)
				});
				groups.add(group);
				var view = new wcb.Views.Group({
					model: group,
					el: $('.group--' + id.toLowerCase())
				});
				view.render();
			});

			// knockout stage
			// best of 16
			var bestOf16 = new wcb.Collections.Match.bestOf16();

			bestOf16.each(function(match, index) {
				var view = new wcb.Views.KnockoutMatch({
					id: 'AF ' + (index + 1),
					model: match,
					el: $('.hexagon--' + match.id + ' .match')
				});
				view.render();
			});
		}
	};
})();
