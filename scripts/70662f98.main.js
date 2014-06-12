"use strict";!function(){var a=null,b=null,c=null,d=function(a){return function(b){return 0===arguments.length?this.get(a):void this.set(a,b)}},e=function(d){var e=function(b,c){var e=new WorldCupBracket.Collections.Match;return d[b].forEach(function(d,f){e.add({id:b+f,date:new Date(d[1])},{home:c[d[0][0]],guest:c[d[0][1]],stadium:a.get(d[2])})}),e};["A","B","C","D","E","F","G","H"].forEach(function(a,d){var f=b.slice(4*d,4*d+4),g=new i.Models.Group({id:a},{teams:f,matches:e(a,f)});c.add(g);var h=new i.Views.Group({model:g,el:$(".group--"+a.toLowerCase())});h.render()})},f=function(a,b){return"finals"===a?0===b?"final":"consolation":{bestOf16:"bo16",quarterFinals:"qf",semiFinals:"sf"}[a]+"-"+(b+1)},g=function(b,c){var d=new i.Collections.Match;c.forEach(function(c,e){var g=f(b,e),h=new i.Models.Match({id:g,date:new Date(c[1]),home:c[0][0],guest:c[0][1]},{stadium:a.get(c[2])});d.add(h);var j=new i.Views.KnockoutMatch({id:"AF "+(e+1),model:h,el:$("#"+g)});j.render()})},h=_.extend({},Backbone.Events),i=window.WorldCupBracket={Models:{},Collections:{},Views:{},Routers:{},Mixins:{accessor:d},matchEvents:h,init:function(d){a=new i.Collections.Stadium,a.reset(d.stadiums),b=new i.Collections.Team,b.reset(d.teams),c=new i.Collections.Group,_.pairs(d.knockoutMatches).forEach(function(a){g.apply(this,a)}.bind(this)),e(d.groupMatches)}}}(),this.JST=this.JST||{},this.JST["app/scripts/templates/group-match.hbs"]=Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var f,g="",h="function",i=this.escapeExpression;return g+='<td class="match__date">',(f=c.date)?f=f.call(b,{hash:{},data:e}):(f=b&&b.date,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</td>\n<td class="match__time">',(f=c.time)?f=f.call(b,{hash:{},data:e}):(f=b&&b.time,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</td>\n<td class="match__stadium">',(f=c.stadium)?f=f.call(b,{hash:{},data:e}):(f=b&&b.stadium,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</td>\n<td class="match__city">',(f=c.city)?f=f.call(b,{hash:{},data:e}):(f=b&&b.city,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</td>\n<td class="match__teams">',(f=c.home)?f=f.call(b,{hash:{},data:e}):(f=b&&b.home,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+" &ndash; ",(f=c.guest)?f=f.call(b,{hash:{},data:e}):(f=b&&b.guest,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</td>\n<td class="match__results group__border">\n	<input class="goals goals--home" type="text" value="',(f=c.homeGoals)?f=f.call(b,{hash:{},data:e}):(f=b&&b.homeGoals,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" />\n	<span class="group__text">|</span>\n	<input class="goals goals--guest" type="text" value="',(f=c.guestGoals)?f=f.call(b,{hash:{},data:e}):(f=b&&b.guestGoals,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" />\n</td>\n'}),this.JST["app/scripts/templates/group.hbs"]=Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var f,g="",h="function",i=this.escapeExpression;return g+='<div class="group__border group__border--main">\n	<h2 class="group__name">',(f=c.name)?f=f.call(b,{hash:{},data:e}):(f=b&&b.name,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</h2>\n	<h3 class="group__teams">',(f=c.teams)?f=f.call(b,{hash:{},data:e}):(f=b&&b.teams,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</h3>\n	<table class="group__table"></table>\n</div>\n<div class="group__rank">\n	<label class="group__background" for="',(f=c.idFirst)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idFirst,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" class="group__id">',(f=c.idFirst)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idFirst,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</label>\n	<input class="group__border" type="text" id="',(f=c.idFirst)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idFirst,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" value="" disabled>\n</div>\n<div class="group__rank">\n	<label class="group__background" for="',(f=c.idSecond)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idSecond,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" class="group__id">',(f=c.idSecond)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idSecond,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</label>\n	<input class="group__border" type="text" id="',(f=c.idSecond)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idSecond,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" value="" disabled>\n</div>\n'}),this.JST["app/scripts/templates/knockout-match.hbs"]=Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var f,g="",h="function",i=this.escapeExpression;return g+='<div style="position: relative; z-index: 3;">\n	<div class="match__id">',(f=c.id)?f=f.call(b,{hash:{},data:e}):(f=b&&b.id,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</div>\n	<div class="match__teams">\n		<span class="match__teams--home">',(f=c.home)?f=f.call(b,{hash:{},data:e}):(f=b&&b.home,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+':</span><span class="match__teams--guest">',(f=c.guest)?f=f.call(b,{hash:{},data:e}):(f=b&&b.guest,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</span>\n	</div>\n	<div class="match__team-fields">\n		<input type="text" class="group__border group__border--home group__border--bottom" disabled id="',(f=c.idHome)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idHome,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" value="',(f=c.homeName)?f=f.call(b,{hash:{},data:e}):(f=b&&b.homeName,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'">\n		<input type="text" class="group__border group__border--guest group__border--bottom" disabled id="',(f=c.idGuest)?f=f.call(b,{hash:{},data:e}):(f=b&&b.idGuest,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" value="',(f=c.guestName)?f=f.call(b,{hash:{},data:e}):(f=b&&b.guestName,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'">\n	</div>\n	<div class="match__results match__results--knockout">\n		<input class="goals goals--home group__border group__border--home group__border--bottom" type="text" value="',(f=c.homeGoals)?f=f.call(b,{hash:{},data:e}):(f=b&&b.homeGoals,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" />\n		<span class="group__text"> : </span>\n		<input class="goals goals--guest group__border group__border--guest group__border--bottom" type="text" value="',(f=c.guestGoals)?f=f.call(b,{hash:{},data:e}):(f=b&&b.guestGoals,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'" />\n	</div>\n	<div class="cf">\n		<div class="match__date">',(f=c.date)?f=f.call(b,{hash:{},data:e}):(f=b&&b.date,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</div>\n		<div class="match__time">',(f=c.time)?f=f.call(b,{hash:{},data:e}):(f=b&&b.time,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+'</div>\n	</div>\n	<span class="match__city">',(f=c.city)?f=f.call(b,{hash:{},data:e}):(f=b&&b.city,f=typeof f===h?f.call(b,{hash:{},data:e}):f),g+=i(f)+"</span>\n</div>\n"}),WorldCupBracket.Models=WorldCupBracket.Models||{},function(){var a=WorldCupBracket.Mixins.accessor;WorldCupBracket.Models.Team=Backbone.Model.extend({url:"",initialize:function(){},defaults:{},validate:function(){},parse:function(a){return a},"short":function(){return this.get("short")||this.get("name")},points:a("points"),name:a("name"),addPoints:function(a){this.points(this.points()+a)}})}(),WorldCupBracket.Models=WorldCupBracket.Models||{},function(){WorldCupBracket.Models.Match=Backbone.Model.extend({url:"",initialize:function(a,b){b=b||{},this.home=b.home,this.guest=b.guest,this.stadium=b.stadium,this.on("change:result",this.persistResult,this),this.loadResults()},defaults:{},validate:function(){},parse:function(a){return a},result:function(){var a=Array.prototype.slice.call(arguments,0),b=new Error("Expected either no arguments, Array of length 2, or two Numbers");switch(arguments.length){case 0:return this.get("result");case 1:if(!_.isArray(a[0])||2!==a[0].length)throw b;this.set("result",a[0]);break;case 2:this.set("result",a);break;default:throw b}},persistResult:function(a,b,c){if(c.skipPersist!==!0){localStorage.results=localStorage.results||"{}";var d=JSON.parse(localStorage.results);d[this.id]=this.get("result"),localStorage.results=JSON.stringify(d)}},loadResults:function(){try{var a=JSON.parse(localStorage.results);a[this.id]&&this.set("result",a[this.id],{skipPersist:!0})}catch(b){}},finished:function(){var a=this.get("result");return _.isArray(a)&&2===a.length&&_.isNumber(a[0])&&_.isNumber(a[1])},points:function(){if(this.finished()){var a=this.result(),b=a[0],c=a[1];return b>c?[3,0]:c>b?[0,3]:[1,1]}}})}(),WorldCupBracket.Models=WorldCupBracket.Models||{},function(){WorldCupBracket.Models.Stadium=Backbone.Model.extend({url:"",initialize:function(){},defaults:{},validate:function(){},parse:function(a){return a}})}(),WorldCupBracket.Models=WorldCupBracket.Models||{},function(){WorldCupBracket.Models.Group=Backbone.Model.extend({initialize:function(a,b){this.teams=new WorldCupBracket.Collections.Team(b.teams,{comparator:function(a,b){return b.points()-a.points()}}),this.matches=b.matches,this.matches.on("change:result",_.debounce(this.updateTable,100),this)},defaults:{},validate:function(){},parse:function(a){return a},finished:function(){return this.matches.reduce(function(a,b){return a&&b.finished()},!0)},updateTable:function(){this.teams.each(function(a){a.points(0)}),this.matches.each(function(a){if(a.finished()){var b=a.points();a.home.addPoints(b[0]),a.guest.addPoints(b[1])}}),this.teams.sort(),this.finished()&&(console.log("finished"),WorldCupBracket.matchEvents.trigger(this.id+"1",this.id+"1",this.teams.at(0)),WorldCupBracket.matchEvents.trigger(this.id+"2",this.id+"2",this.teams.at(1)))}})}(),WorldCupBracket.Collections=WorldCupBracket.Collections||{},function(){WorldCupBracket.Collections.Stadium=Backbone.Collection.extend({model:WorldCupBracket.Models.Stadium})}(),WorldCupBracket.Collections=WorldCupBracket.Collections||{},function(){WorldCupBracket.Collections.Group=Backbone.Collection.extend({model:WorldCupBracket.Models.Group})}(),WorldCupBracket.Collections=WorldCupBracket.Collections||{},function(){WorldCupBracket.Collections.Team=Backbone.Collection.extend({model:WorldCupBracket.Models.Team})}(),WorldCupBracket.Views=WorldCupBracket.Views||{},function(){WorldCupBracket.Views.Group=Backbone.View.extend({template:JST["app/scripts/templates/group.hbs"],tagName:"div",id:"",events:{},initialize:function(){this.listenTo(this.model,"change",this.render),[this.idFirst(),this.idSecond()].forEach(function(a){this.listenTo(WorldCupBracket.matchEvents,a,this.setWinners)}.bind(this))},render:function(){this.$el.html(this.template(this));var a=this.$el.find(".group__table");return this.model.matches.each(function(b){var c=new WorldCupBracket.Views.GroupMatch({model:b});a.append(c.render().el)}),this.model.updateTable(),this},name:function(){return"Gruppe "+this.model.id},teams:function(){return this.model.teams.map(function(a){return a.get("name")}).join(" | ")},idFirst:function(){return this.model.id+"1"},idSecond:function(){return this.model.id+"2"},setWinners:function(a,b){this.$el.find("#"+a).val(b.name())}})}(),WorldCupBracket.Collections=WorldCupBracket.Collections||{},function(){WorldCupBracket.Collections.Match=Backbone.Collection.extend({model:WorldCupBracket.Models.Match}),WorldCupBracket.Collections.Match.bestOf16=function(){}}(),WorldCupBracket.Views=WorldCupBracket.Views||{},function(){var a=function(a){return a=parseInt(a,10),10>a?"0"+a:a},b=Backbone.View.extend({events:{"change .goals":"setResult"},initialize:function(){},render:function(){return this.$el.html(this.template(this)),this},date:function(){var b=this.model.get("date");return a(b.getDate())+"."+a(b.getMonth()+1)},time:function(){var b=this.model.get("date");return a(b.getHours())+":"+a(b.getMinutes())},stadium:function(){return this.model.stadium.get("name")},city:function(){return this.model.stadium.get("city")},home:function(){return this.model.home.short()},guest:function(){return this.model.guest.short()},homeGoals:function(){return(this.model.result()||["",""])[0]},guestGoals:function(){return(this.model.result()||["",""])[1]},setResult:function(){var a=this.$el.find(".goals"),b=a.map(function(){return Number.parseInt($(this).val(),10)});this.model.result(b.get())}});WorldCupBracket.Views.GroupMatch=b.extend({template:JST["app/scripts/templates/group-match.hbs"],tagName:"tr",className:"match match--group"}),WorldCupBracket.Views.KnockoutMatch=b.extend({template:JST["app/scripts/templates/knockout-match.hbs"],initialize:function(){b.prototype.initialize.apply(this,arguments),[this.model.get("home"),this.model.get("guest")].forEach(function(a){this.listenTo(WorldCupBracket.matchEvents,a,this.setTeam)}.bind(this))},home:function(){return this.model.get("home")},guest:function(){return this.model.get("guest")},idHome:function(){return this.id+"-home"},idGuest:function(){return this.id+"-guest"},homeName:function(){return void 0!==this.model.home?this.model.home.short():void 0},guestName:function(){return void 0!==this.model.guest?this.model.guest.short():void 0},setTeam:function(a,b){a===this.model.get("home")?this.model.home=b:a===this.model.get("guest")&&(this.model.guest=b),this.render()}})}();