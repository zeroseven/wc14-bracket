/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	WorldCupBracket.Models.Group = Backbone.Model.extend({

		url: '',

		initialize: function(attributes, options) {
			this.teams = new WorldCupBracket.Collections.Team(options.teams);
		},

		defaults: {},

		validate: function(attrs, options) {},

		parse: function(response, options) {
			return response;
		}
	});

})();
