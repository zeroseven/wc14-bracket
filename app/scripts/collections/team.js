/*global WorldCupBracket, Backbone*/

WorldCupBracket.Collections = WorldCupBracket.Collections || {};

(function () {
    'use strict';

    WorldCupBracket.Collections.Team = Backbone.Collection.extend({

        model: WorldCupBracket.Models.Team

    });

})();
