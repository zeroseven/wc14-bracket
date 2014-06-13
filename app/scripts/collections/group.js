/*global WorldCupBracket, Backbone*/

WorldCupBracket.Collections = WorldCupBracket.Collections || {};

(function () {
    'use strict';

    WorldCupBracket.Collections.Group = Backbone.Collection.extend({

        model: WorldCupBracket.Models.Group

    });

})();
