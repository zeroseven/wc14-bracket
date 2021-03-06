/*global WorldCupBracket */

describe('WorldCupBracket.Models.Match', function() {
	'use strict';
	var Match = WorldCupBracket.Models.Match;
	var teams = new WorldCupBracket.Collections.Team();
	var match = null;

	beforeEach(function() {
		delete localStorage.results;

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

		match = new Match({
			id: 'G0'
		},{
			home: teams.at(0),
			guest: teams.at(1)
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
			match.result([1, undefined]);
			expect(match.finished()).not.toBe(true);

			match.result([undefined, 1]);
			expect(match.finished()).not.toBe(true);

			match.result([1, NaN]);
			expect(match.finished()).not.toBe(true);

			match.result([NaN, 1]);
			expect(match.finished()).not.toBe(true);
		});
	});

	describe('points', function () {
		it('doesn\'t assign points when match is unfinished', function () {
			expect(match.points()).not.toBeDefined();
		});

		it('assigns three points to the winner', function () {
			match.result(1, 0);
			expect(match.points()).toEqual([3, 0]);

			match.result(1, 2);
			expect(match.points()).toEqual([0, 3]);
		});

		it('assigns on point each for a draw', function () {
			match.result(1, 1);
			expect(match.points()).toEqual([1, 1]);
		});
	});
});
