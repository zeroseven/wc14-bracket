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

	it('creates matches', function () {
	  expect(group.matches).toEqual(jasmine.any(WorldCupBracket.Collections.Match));
		expect(group.matches.length).toBe(6);
	});

	describe('finished', function () {
		it('is unfinished when not all matches are finished', function () {
			expect(group.finished()).not.toBe(true);
		});

		it('is finished when all matches are finished', function () {
			group.matches.each(function(match, index) {
				console.log(match, index);
				expect(group.finished()).not.toBe(true);
				match.result(1, 0);
			});
			expect(group.finished()).toBe(true);
		});
	});

});
