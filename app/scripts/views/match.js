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
			return this.model.stadium().get('name');
		},

		city: function() {
			return this.model.stadium().get('city');
		},

		home: function() {
			return this.model.home().short();
		},

		guest: function() {
			return this.model.guest().short();
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
		},

		tabIndex : function () {
			return this.model.matchNum();
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
			[this.model.get('home'), this.model.get('guest')].forEach(function(eventId) {
				this.listenTo(WorldCupBracket.matchEvents, eventId, this.setTeam);
			}.bind(this));

			this.model.on('change:result', this.publishWinner, this);
			this.model.on('team', this.publishWinner, this);
			// this.publishWinner();
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
		},

		homeName: function() {
			if(this.model.home() !== undefined) {
				return this.model.home().short();
			}
		},

		guestName: function() {
			if(this.model.guest() !== undefined) {
				return this.model.guest().short();
			}
		},

		setTeam: function(id, team) {
			if(id === this.model.get('home')) {
				this.model.home(team);
			} else if(id === this.model.get('guest')) {
				this.model.guest(team);
			}
			this.render();
		},

		publishWinner: function() {
			console.log('publishWinner');
			if(this.model.finished()) {
				var result = this.model.result(),
				    home = this.model.home(),
				    guest = this.model.guest();

				this.$el.find(".match__results--knockout").removeClass("match__results--knockout__draw")

				if(result[0] > result[1] && home !== undefined) {
					WorldCupBracket.matchEvents.trigger(this.id, this.id, home);
				} else if(result[0] < result[1]) {
					WorldCupBracket.matchEvents.trigger(this.id, this.id, guest);
				} else if(result[0] === result[1]) {
					this.$el.find(".match__results--knockout").addClass("match__results--knockout__draw")
				}

			}
		},

		isDraw : function () {
			if(this.model.finished()) {
				var result = this.model.result();
				if (result[0] === result[1]) {
					return " match__results--knockout__draw";
				}
			}
			return "";
		},

		// tabindex : function () {
		// 	var id = this.id;
		// 	var id = id.split(" ");
		//
		// 	var tabindex = 0;
		//
		// 	console.log(id);
		//
		// 	switch (id[0]) {
		// 		case "AF" :
		// 			tabindex = 100+parseInt(id[0]*2);
		// 			break;
		// 		case "VF" :
		// 				tabindex = 120+parseInt(id[0]*2);
		// 				break;
		// 		case "HF" :
		// 			tabindex = 130+parseInt(id[0]*2);
		// 			break;
		// 		case "platz" :
		// 			tabindex = 140;
		// 			break;
		// 		case "finale" :
		// 			tabindex = 141;
		// 			break;
		// 	}
		//
		// 	return tabindex;
		// }
	});

})();
