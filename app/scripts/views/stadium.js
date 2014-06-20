/*global WorldCupBracket, Backbone, JST*/

WorldCupBracket.Views = WorldCupBracket.Views || {};

(function() {
	'use strict';

	var mapGrid =  [
		[null, null, null, '', null, null, '', null, null],
		[null, '', '', '', '', '', null, null, null],
		[null, null, '', '12', '', '', '', '01', '02'],
		['', '', '', '', '', '', '', '', '03'],
		[null, null, null, '', '', '', '', '04', ''],
		[null, null, null, '11', '', '10', '', '', null],
		[null, null, null, null, '', '', '', '', '05'],
		[null, null, null, null, '', '', '07', '06', null],
		[null, null, null, null, null, null, '08', null, null],
		[null, null, null, null, '', '', null, null, null],
		[null, null, null, null, null, '09', null, null, null]
	];

	WorldCupBracket.Views.StadiumView = Backbone.View.extend({
		el: $('.stadium-view'),
		events: {

		},
		render: function () {
			var that = this;
			$.each(mapGrid, function(y, row) {
				that.$el.append('<div class="stadium--row stadium--row__'+y+'"></div>');
				$.each(row, function(x, cell) {
					switch (cell) {
					case null:
							that.$el.find('.stadium--row__'+y).append('<div class="stadium--hexagon stadium--hexagon--pusher"></div>');
						break;
					case '':
							that.$el.find('.stadium--row__'+y).append('<div class="stadium--hexagon stadium--hexagon--blank"><div class="stadium--hexagon--inner"></div></div>');
						break;
					default:
							var stadium = that.collection._byId[cell];
							that.$el.find('.stadium--row__'+y).append('<div class="stadium--hexagon stadium--hexagon--stadium stadium-highlightable" data-stadium="'+stadium.get("name")+'"><div class="stadium--hexagon--inner">'+cell+'</div></div>');
						break;
					}
				});
			});
		}
	});

	WorldCupBracket.Views.StadiumTable = Backbone.View.extend({
		el: $('.stadium-table'),
		events: {
		},
		render: function() {
			var that = this;
			this.collection.each(function(p) {
				that.$el.append(new WorldCupBracket.Views.StadiumTableTr({model: p}).render());
			});
		}
	});

	WorldCupBracket.Views.StadiumTableTr = Backbone.View.extend({
	template: JST['app/scripts/templates/stadium.hbs'],
	render: function() {
		return this.template({
			id : this.model.get('id'),
			city : this.model.get('city'),
			name : this.model.get('name')
		});
	}
	});



})();
