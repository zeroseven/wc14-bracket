/*global WorldCupBracket, $*/
'use strict';
(function() {
	var stadiums = null,
	    teams = null,
	    groups = null;
	var wcb = window.WorldCupBracket = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		init: function() {
			wcb.stadiums = stadiums = new wcb.Collections.Stadium();
			stadiums.reset([
				{
					id: '01',
					name: 'Estádio Castelão',
					city: 'Fortaleza'
				},
				{
					id: '02',
					name: 'Estádio das Dunas',
					city: 'Natal'
				},
				{
					id: '03',
					name: 'Arena Pernambuco',
					city: 'Recife'
				},
				{
					id: '04',
					name: 'Arena Fonte Nova',
					city: 'Salvador'
				},
				{
					id: '05',
					name: 'Estádio Mineirão',
					city: 'Belo Horizonte'
				},
				{
					id: '06',
					name: 'Estádio do Maracanã',
					city: 'Rio de Janeiro'
				},
				{
					id: '07',
					name: 'Arena de São Paulo',
					city: 'São Paulo'
				},
				{
					id: '08',
					name: 'Arena da Baixada',
					city: 'Curitiba'
				},
				{
					id: '09',
					name: 'Estádio Beira-Rio',
					city: 'Porto Alegre'
				},
				{
					id: '10',
					name: 'Estádio Nacional',
					city: 'Brasilia'
				},
				{
					id: '11',
					name: 'Arena Pantanal',
					city: 'Cuiabá'
				},
				{
					id: '12',
					name: 'Arena da Amazônia',
					city: 'Manaus'
				}
			]);

			wcb.teams = teams = new wcb.Collections.Team();
			teams.reset([
				{
					id: 1,
					name: 'Brasilien'
				},
				{
					id: 2,
					name: 'Kroatien'
				},
				{
					id: 3,
					name: 'Mexico'
				},
				{
					id: 4,
					name: 'Kamerun'
				},
				{
					id: 5,
					name: 'Spanien'
				},
				{
					id: 6,
					name: 'Niederlande'
				},
				{
					id: 7,
					name: 'Chile'
				},
				{
					id: 8,
					name: 'Australien'
				},
				{
					id: 9,
					name: 'Kolumbien'
				},
				{
					id: 10,
					name: 'Griechenland'
				},
				{
					id: 11,
					name: 'Elfenbeinküste'
				},
				{
					id: 12,
					name: 'Japan'
				},
				{
					id: 13,
					name: 'Uruguay'
				},
				{
					id: 14,
					name: 'Costa Rica'
				},
				{
					id: 15,
					name: 'England'
				},
				{
					id: 16,
					name: 'Italien'
				},
				{
					id: 17,
					name: 'Schweiz'
				},
				{
					id: 18,
					name: 'Ecuador'
				},
				{
					id: 19,
					name: 'Frankreich'
				},
				{
					id: 20,
					name: 'Honduras'
				},
				{
					id: 21,
					name: 'Argentinien'
				},
				{
					id: 22,
					name: 'Bosnien & Herzegowina'
				},
				{
					id: 23,
					name: 'Iran'
				},
				{
					id: 24,
					name: 'Nigeria'
				},
				{
					id: 25,
					name: 'Deutschland'
				},
				{
					id: 26,
					name: 'Portugal'
				},
				{
					id: 27,
					name: 'Ghana'
				},
				{
					id: 28,
					name: 'USA'
				},
				{
					id: 29,
					name: 'Belgien'
				},
				{
					id: 30,
					name: 'Algerien'
				},
				{
					id: 31,
					name: 'Russland'
				},
				{
					id: 32,
					name: 'Südkorea'
				}
			]);

			groups = new wcb.Collections.Group();

			['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(function(id, index) {
				var group = new wcb.Models.Group({
					id: id
				}, {
					teams: teams.slice(index * 4, index * 4 + 4)
				});
				groups.add(group);
				var view = new wcb.Views.Group({
					model: group,
					el: $('.group--' + id.toLowerCase())
				});
				view.render();
			});
		}
	};
})();

$(document).ready(function() {
	WorldCupBracket.init();
});
