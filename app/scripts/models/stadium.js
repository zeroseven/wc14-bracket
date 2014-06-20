/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function() {
	'use strict';

	var accessor = WorldCupBracket.Mixins.accessor;

	WorldCupBracket.Models.Stadium = Backbone.Model.extend({

		url: '',

		initialize: function() {},

		defaults: {},

		validate: function(/*attrs, options*/) {},

		parse: function(response/*, options*/) {
			return response;
		},

		isHighlighted: accessor
	});

})();
