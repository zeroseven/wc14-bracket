/*global WorldCupBracket, Backbone, JST*/

WorldCupBracket.Views = WorldCupBracket.Views || {};

(function() {
	'use strict';

	var pad = function(value) {
		value = parseInt(value, 10);
		return value < 10 ? '0' + value : value;
	};

	var Match = Backbone.View.extend({

		events: {
			'change .goals': 'setResult'
		},

		initialize: function() {
			// this.listenTo(this.model, 'change', this.render);
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
		},

		homeGoals: function() {
			return (this.model.result() || ['', ''])[0];
		},

		guestGoals: function() {
			return (this.model.result() || ['', ''])[1];
		},

		setResult: function() {
			var goals = this.$el.find('.goals');
			var result = goals.map(function() {
				return Number.parseInt($(this).val(), 10);
			});
			this.model.result(result.get());
		}

	});

	WorldCupBracket.Views.GroupMatch = Match.extend({
		template: JST['app/scripts/templates/group-match.hbs'],

		tagName: 'tr',

		className: 'match match--group'
	});

	WorldCupBracket.Views.KnockoutMatch = Match.extend({
		template: JST['app/scripts/templates/knockout-match.hbs'],

		initialize: function() {
			Match.prototype.initialize.apply(this, arguments);
		},

		home: function() {
			return this.model.get('home');
		},

		guest: function() {
			return this.model.get('guest');
		},

		idHome: function() {
			return this.id + '-home';
		},

		idGuest: function() {
			return this.id + '-guest';
		}
	});

})();
