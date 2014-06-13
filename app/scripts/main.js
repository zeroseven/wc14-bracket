/*global WorldCupBracket, $*/
'use strict';
(function() {
	var stadiums = null,
	    teams = null,
	    groups = null;

	var accessor = function(name) {
		return function(value) {
			if(arguments.length === 0) {
				return this.get(name);
			} else {
				this.set(name, value);
			}
		};
	};

	var createGroupMatches = function(data) {
		var groupMatches = function(id, teams, groupIndex) {
			var collection = new WorldCupBracket.Collections.Match();
			data[id].forEach(function(match, index) {
				collection.add({
					id: id + index,
					date: new Date(match[1]),
					matchNum: groupIndex * 2 + Math.floor(index / 2) * 16 + index % 2 + 1
				},
				{
					home: teams[match[0][0]],
					guest: teams[match[0][1]],
					stadium: stadiums.get(match[2]),

				});
			});
			return collection;
		};

		// group stage
		['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(function(id, index) {
			var groupTeams = teams.slice(index * 4, index * 4 + 4);
			var group = new wcb.Models.Group({
				id: id
			}, {
				teams: groupTeams,
				matches: groupMatches(id, groupTeams, index)
			});
			groups.add(group);
			var view = new wcb.Views.Group({
				model: group,
				el: $('.group--' + id.toLowerCase())
			});
			view.render();
		});
	};

	var koId = function(round, index) {
		if(round === 'finals') {
			return index === 0 ? 'consolation' : 'final';
		} else {
			return ({
				bestOf16: 'bo16',
				quarterFinals: 'qf',
				semiFinals: 'sf'
			})[round] + '-' +(index + 1);
		}
	};

	var viewId = function(round, index) {
		if(round === 'finals') {
			return index === 0 ? 'platz 3' : 'finale';
		} else {
			return ({
				bestOf16: 'AF',
				quarterFinals: 'VF',
				semiFinals: 'HF'
			})[round] + ' ' + (index + 1);
		}
	};

	var createKnockoutMatches = function(round, data, startIndex) {
		var collection = new wcb.Collections.Match();
		data.forEach(function(match, index) {
			var id = koId(round, index);
			var model = new wcb.Models.Match(
				{
					id: id,
					date: new Date(match[1]),
					home: match[0][0],
					guest: match[0][1],
					matchNum: startIndex+index
				},
				{
					stadium: stadiums.get(match[2])
				}
			);
			collection.add(model);
			var view = new wcb.Views.KnockoutMatch({
				id: viewId(round, index),
				model: model,
				el: $('#' + id)
			});
			view.render();
		});
		return startIndex+collection.length;
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
			stadiums = new wcb.Collections.Stadium();
			stadiums.reset(data.stadiums);

			teams = new wcb.Collections.Team();
			teams.reset(data.teams);


			groups = new wcb.Collections.Group();

			var index = 49;
			// knockout must be defined before groups to catch matchEvents
			_.pairs(data.knockoutMatches).forEach(function(args) {
				args.push(index);
				index = createKnockoutMatches.apply(this, args);
			}.bind(this));

			createGroupMatches(data.groupMatches);
		}
	};
})();
