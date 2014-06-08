/*global WorldCupBracket, Backbone*/

WorldCupBracket.Collections = WorldCupBracket.Collections || {};

(function() {
	'use strict';

	var groupGames = {
		'A': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'B': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'C': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'D': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'E': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'F': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'G': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		],
		'H': [
			[
				[0, 1], '06/12/2014 22:00', '07'
			],
			[
				[2, 3], '06/13/2014 18:00', '02'
			],
			[
				[0, 2], '06/17/2014 21:00', '01'
			],
			[
				[3, 1], '06/13/2014 18:00', '12'
			],
			[
				[3, 0], '06/23/2014 22:00', '10'
			],
			[
				[1, 2], '06/23/2014 22:00', '03'
			]
		]
	}

	WorldCupBracket.Collections.Game = Backbone.Collection.extend({

		model: WorldCupBracket.Models.Game

	});

	WorldCupBracket.Collections.Game.forGroup = function(id, teams) {
		var collection = new WorldCupBracket.Collections.Game();
		groupGames[id].forEach(function(game, index) {
			collection.add({
				id: id + index,
				home: teams.at(game[0][0]),
				guest: teams.at(game[0][1]),
				date: new Date(game[1]),
				stadium: WorldCupBracket.stadiums.get(game[2])
			})
		});
		return collection;
	};

})();
