/*global WorldCupBracket, Backbone, JST*/

WorldCupBracket.Views = WorldCupBracket.Views || {};

(function() {
	'use strict';

	var pad = function(value) {
		value = parseInt(value, 10);
		return value < 10 ? '0' + value : value;
	}

	var Match = Backbone.View.extend({

		events: {},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template(this));
			return this;
		},

		date: function() {
			var date = this.model.get('date');
			return pad(date.getDate()) + '.' + pad(date.getMonth() + 1);
		},

		time: function() {
			var date = this.model.get('date');
			return pad(date.getHours()) + ':' + pad(date.getMinutes());
		},

		stadium: function() {
			return this.model.stadium.get('name');
		},

		city: function() {
			return this.model.stadium.get('city');
		},

		home: function() {
			return this.model.home.short();
		},

		guest: function() {
			return this.model.guest.short();
		}

	});

	WorldCupBracket.Views.GroupMatch = Match.extend({
		template: JST['app/scripts/templates/group-match.hbs'],

		tagName: 'tr',

		className: 'match match--group'
	});

	WorldCupBracket.Views.KnockoutMatch = Match.extend({
		template: JST['app/scripts/templates/knockout-match.hbs'],

		home: function() {
			return this.model.get('home');
		},

		guest: function() {
			return this.model.get('guest');
		}
	});

})();
