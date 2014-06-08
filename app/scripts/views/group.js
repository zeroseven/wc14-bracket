/*global WorldCupBracket, Backbone, JST*/

WorldCupBracket.Views = WorldCupBracket.Views || {};

(function() {
	'use strict';

	WorldCupBracket.Views.Group = Backbone.View.extend({

		template: JST['app/scripts/templates/group.hbs'],

		tagName: 'div',

		id: '',

		className: function() {
			return 'group';
		},

		events: {},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template(this));
		},

		name: function() {
			return 'Gruppe ' + this.model.id;
		},

		teams: function() {
			return this.model.teams.map(function(team) {
				return team.get('name');
			}).join(' | ');
		}

	});

})();
