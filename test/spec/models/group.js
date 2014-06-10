/* global jasmine */

describe('WorldCupBracket.Models.Group', function () {
	'use strict';
	var Group = WorldCupBracket.Models.Group;
	var teams = new WorldCupBracket.Collections.Team();
	var group = null;

	beforeEach(function () {
		delete localStorage.results;
		teams.reset([
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
			}
		]);
	  group = new Group(
			{
				id: 'G'
			},
			{
				teams: teams.slice(0, 4)
			}
		);
	});

	it('assigns teams', function() {
		expect(group.teams).toEqual(jasmine.any(WorldCupBracket.Collections.Team));
		expect(group.teams.length).toBe(4);
	});

	it('adds a comparator function to teams', function () {
	  expect(group.teams.comparator).toBeDefined();
	});

	it('creates matches', function () {
	  expect(group.matches).toEqual(jasmine.any(WorldCupBracket.Collections.Match));
		expect(group.matches.length).toBe(6);
	});

	describe('finished', function () {
		it('is unfinished when not all matches are finished', function () {
			expect(group.finished()).not.toBe(true);
		});

		it('is finished when all matches are finished', function () {
			group.matches.each(function(match) {
				expect(group.finished()).not.toBe(true);
				match.result(1, 0);
			});
			expect(group.finished()).toBe(true);
		});
	});

	describe('table', function () {
		beforeEach(function (done) {
			var results = [
				[3, 1], // Deutschland - Portugal
				[1, 2], // Ghana - USA
				[2, 0], // Deutschland - Ghana
				[0, 3], // USA - Portugal
				[1, 4], // USA - Deutschland
				[2, 1]  // Portugal - Ghana
			];

			results.forEach(function(result, index) {
				group.matches.at(index).result(result);
			});
			setTimeout(done, 150);
		});
		it('computes group tables', function (/*done*/) {
			expect(group.teams.map(function(team) {
				return [ team.id, team.points() ];
			})).toEqual([
				[25, 9], // Germany
				[26, 6], // Portugal
				[28, 3], // USA
				[27, 0]  // Ghana
			]);
		});
	});

});
