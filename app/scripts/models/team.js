/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	var accessor = WorldCupBracket.Mixins.accessor;

	WorldCupBracket.Models.Team = Backbone.Model.extend({

		url: '',

		initialize: function() {},

		defaults: {},

		validate: function(/*attrs, options*/) {},

		parse: function(response/*, options*/) {
			return response;
		},

		short: function() {
			return this.get('short') || this.get('name');
		},

		points: accessor('points'),

		addPoints: function(points) {
			this.points(this.points() + points);
		}
	});

})();
