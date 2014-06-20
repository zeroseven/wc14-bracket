/*global WorldCupBracket, Backbone, JST*/

WorldCupBracket.Views = WorldCupBracket.Views || {};

(function () {
    'use strict';

    WorldCupBracket.Views.Champion = Backbone.View.extend({

        template: JST['app/scripts/templates/champion.hbs'],

        initialize: function () {
            var that = this;
            this.listenTo(WorldCupBracket.matchEvents, 'finale', function (e,winner) {
              that.champion = winner.name();
              this.render();
            });
        },

        render: function () {
            $('.hexagon__content#champion').html(this.template({champion:this.champion}));
        },

        champion : '',



    });

})();
