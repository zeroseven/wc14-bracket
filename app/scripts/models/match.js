/*global WorldCupBracket, Backbone*/

WorldCupBracket.Models = WorldCupBracket.Models || {};

(function () {
    'use strict';

    WorldCupBracket.Models.Match = Backbone.Model.extend({

        url: '',

        initialize: function(attributes, options) {
          this.home = WorldCupBracket.teams.get(attributes['home']);
          this.guest = WorldCupBracket.teams.get(attributes['guest']);
          this.stadium = WorldCupBracket.stadiums.get(attributes['stadium']);
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
