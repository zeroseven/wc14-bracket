/*global WorldCupBracket */

describe('WorldCupBracket.Models.Match', function() {
	'use strict';
	var Match = WorldCupBracket.Models.Match;
	var teams = new WorldCupBracket.Collections.Team();
	var match = null;
	teams.reset([
		{
			id: 25,
			name: 'Deutschland'
		},
		{
			id: 26,
			name: 'Portugal'
		}
	]);

	beforeEach(function() {
		delete localStorage.results;
		match = new Match({
			id: 'G0',
			home: teams.at(0).id,
			guest: teams.at(1).id
		});
	});

	describe('result', function() {
		it('accepts and returns results', function() {
			match.result(4, 2);
			expect(match.result()).toEqual([4, 2]);

			match.result([5, 0]);
			expect(match.result()).toEqual([5, 0]);
		});

		it('throws on more than two arguments', function() {
			expect(function() {
				match.result(1, 2, 3);
			}).toThrow();
		});

		it('throws on array with more than two items', function() {
			expect(function() {
				match.result([1, 2, 3]);
			}).toThrow();
		});

		it('saves and restores results', function() {
			match.result(1, 0);
			var reloaded = new Match({
				id: 'G0'
			});
			expect(reloaded.result()).toEqual([1, 0]);
		});
	});

	describe('finished', function() {
		it('reports match with result as finished', function() {
			expect(match.finished()).toBe(false);
			match.result(6, 0);
			expect(match.finished()).toBe(true);
		});

		it('doesn\'t report partial results as finished', function() {
			match.result([6, undefined]);
			expect(match.finished()).not.toBe(true);
		});
	});
});
