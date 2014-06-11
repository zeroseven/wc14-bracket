/*global WorldCupBracket, Backbone*/

WorldCupBracket.Collections = WorldCupBracket.Collections || {};

(function() {
	'use strict';

	var Match = WorldCupBracket.Collections.Match = Backbone.Collection.extend({

		model: WorldCupBracket.Models.Match

	});

	WorldCupBracket.Collections.Match.bestOf16 = function() {
		var collection = new Match();
		[['a', 'b'], ['c', 'd'], ['e', 'f'], ['g', 'h']].forEach(function(teams) {
			collection.add({
				id: teams[0] + '-' + teams[1],
				home: teams[0].toUpperCase() + '1',
				guest: teams[1].toUpperCase() + '2'
			});
			collection.add({
				id: teams[1] + '-' + teams[0],
				home: teams[1].toUpperCase() + '1',
				guest: teams[0].toUpperCase() + '2'
			});
		});
		return collection;
	};

})();
