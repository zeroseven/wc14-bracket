/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

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
		}
	});

})();
