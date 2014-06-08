/*global WorldCupBracket, Backbone, JST*/

WorldCupBracket.Views = WorldCupBracket.Views || {};

(function() {
	'use strict';

	WorldCupBracket.Views.Group = Backbone.View.extend({

		template: JST['app/scripts/templates/group.hbs'],

		tagName: 'div',

		id: '',

		events: {},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template(this));
			var table = this.$el.find('.group__table');
			this.model.games.each(function(game) {
				var view = new WorldCupBracket.Views.GroupMatch({
					model: game
				});
				table.append(view.render().el);
			});
		},

		name: function() {
			return 'Gruppe ' + this.model.id;
		},

		teams: function() {
			return this.model.teams.map(function(team) {
				return team.get('name');
			}).join(' | ');
		},

		idFirst: function() {
			return this.model.id + '1';
		},

		idSecond: function() {
			return this.model.id + '2';
		}

	});

})();
