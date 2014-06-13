/* global jasmine */

describe('WorldCupBracket.Models.Group', function () {
	'use strict';
	var Group = WorldCupBracket.Models.Group,
	    teams = new WorldCupBracket.Collections.Team(),
	    group = null,
			stadiums = new WorldCupBracket.Collections.Stadium(),
	    //TODO: DRY up!
	    groupMatches = function(teams) {
				var data = {
					'G': [
						[
							[0, 1], '06/16/2014 18:00', '04'
						],
						[
							[2, 3], '06/17/2014 00:00', '02'
						],
						[
							[0, 2], '06/21/2014 21:00', '01'
						],
						[
							[3, 1], '06/23/2014 00:00', '12'
						],
						[
							[3, 0], '06/26/2014 18:00', '03'
						],
						[
							[1, 2], '06/26/2014 18:00', '10'
						]
					]
				};
				var collection = new WorldCupBracket.Collections.Match();
				var id = 'G';
				data[id].forEach(function(match, index) {
					collection.add({
						id: id + index,
						date: new Date(match[1])
					},
					{
						home: teams[match[0][0]],
						guest: teams[match[0][1]],
						stadium: stadiums.get(match[2])
					});
				});
				return collection;
			};

	beforeEach(function () {
		delete localStorage.results;
		stadiums.reset([

		]);
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
				teams: teams.slice(0, 4),
				matches: groupMatches(teams.slice(0, 4))
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

				match.result([1, NaN]);
				expect(group.finished()).not.toBe(true);

				match.result(1, 0);
			});
			expect(group.finished()).toBe(true);
		});
	});

	describe('table', function () {
		// http://de.wikipedia.org/wiki/Fussballweltmeisterschaft_2014#Turnierform
		var spy;
		beforeEach(function (done) {
			spy = jasmine.createSpy('G1');
			WorldCupBracket.matchEvents.on('G1', spy);
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

		it('computes group tables', function () {
			expect(group.teams.map(function(team) {
				return [ team.id, team.points() ];
			})).toEqual([
				[25, 9], // Germany
				[26, 6], // Portugal
				[28, 3], // USA
				[27, 0]  // Ghana
			]);
		});

		it('triggers finished event', function() {
			expect(spy).toHaveBeenCalledWith('G1', group.teams.at(0));
		});
	});

	describe('Comparator (points)', function () {
		// http://de.wikipedia.org/wiki/Fussballweltmeisterschaft_2014#Turnierform
		var spy;
		beforeEach(function (done) {
			spy = jasmine.createSpy('G1');
			WorldCupBracket.matchEvents.on('G1', spy);
			var results = [
				[2, 1], // Deutschland - Portugal
				[1, 2], // Ghana - USA
				[2, 1], // Deutschland - Ghana
				[1, 1], // USA - Portugal
				[1, 1], // USA - Deutschland
				[1, 1]  // Portugal - Ghana
			];

			results.forEach(function(result, index) {
				group.matches.at(index).result(result);
			});
			setTimeout(done, 150);
		});

		it('looks after points', function() {
			expect(group.teams.at(0).id).toEqual(25);
		});

	});

	describe('Comparator (goal difference)', function () {
		// http://de.wikipedia.org/wiki/Fussballweltmeisterschaft_2014#Turnierform
		var spy;
		beforeEach(function (done) {
			spy = jasmine.createSpy('G1');
			WorldCupBracket.matchEvents.on('G1', spy);
			var results = [
				[1, 1], // Deutschland - Portugal
				[1, 2], // Ghana - USA
				[3, 1], // Deutschland - Ghana
				[1, 1], // USA - Portugal
				[1, 1], // USA - Deutschland
				[1, 1]  // Portugal - Ghana
			];

			results.forEach(function(result, index) {
				group.matches.at(index).result(result);
			});
			setTimeout(done, 150);
		});

		it('...then after goal difference...', function() {
			expect(group.teams.at(0).id).toEqual(25);
		});

	});

	describe('Comparator (goals)', function () {
		// http://de.wikipedia.org/wiki/Fussballweltmeisterschaft_2014#Turnierform
		var spy;
		beforeEach(function (done) {
			spy = jasmine.createSpy('G1');
			WorldCupBracket.matchEvents.on('G1', spy);
			var results = [
				[1, 1], // Deutschland - Portugal
				[1, 2], // Ghana - USA
				[3, 2], // Deutschland - Ghana
				[1, 1], // USA - Portugal
				[1, 1], // USA - Deutschland
				[1, 1]  // Portugal - Ghana
			];

			results.forEach(function(result, index) {
				group.matches.at(index).result(result);
			});
			setTimeout(done, 150);
		});

		it('...and at last after goals', function() {
			expect(group.teams.at(0).id).toEqual(25);
		});

	});

});
