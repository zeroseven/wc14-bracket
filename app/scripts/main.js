/*global WorldCupBracket, $*/

(function() {
	var stadiums = null;
	var wcb = window.WorldCupBracket = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {},
		init: function() {
			'use strict';
			stadiums = window.stadiums = new wcb.Collections.Stadium();
			stadiums.reset([
				{
					id: '01',
					name: "Estádio Castelão",
					city: "Fortaleza"
				},
				{
					id: '02',
					name: "Estádio das Dunas",
					city: "Natal"
				},
				{
					id: '03',
					name: "Arena Pernambuco",
					city: "Recife"
				},
				{
					id: '04',
					name: "Arena Fonte Nova",
					city: "Salvador"
				},
				{
					id: '05',
					name: "Estádio Mineirão",
					city: "Belo Horizonte"
				},
				{
					id: '06',
					name: "Estádio do Maracanã",
					city: "Rio de Janeiro"
				},
				{
					id: '07',
					name: "Arena de São Paulo",
					city: "São Paulo"
				},
				{
					id: '08',
					name: "Arena da Baixada",
					city: "Curitiba"
				},
				{
					id: '09',
					name: "Estádio Beira-Rio",
					city: "Porto Alegre"
				},
				{
					id: '10',
					name: "Estádio Nacional",
					city: "Brasilia"
				},
				{
					id: '11',
					name: "Arena Pantanal",
					city: "Cuiabá"
				},
				{
					id: '12',
					name: "Arena da Amazônia",
					city: "Manaus"
				}
			]);
		}
	};
})();

$(document).ready(function() {
	'use strict';
	WorldCupBracket.init();
});
