/*global WorldCupBracket, Backbone*/

WorldCupBracket.Collections = WorldCupBracket.Collections || {};

(function () {
    'use strict';

    WorldCupBracket.Collections.Stadium = Backbone.Collection.extend({

        model: WorldCupBracket.Models.Stadium

    });

})();
