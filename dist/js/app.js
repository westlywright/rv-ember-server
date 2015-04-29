var View = Backbone.View.extend({

    el: "#app",

    template: _.template("hello: <%= name %>"),

    initialize: function() {
    },

    render: function() {
        this.$el.html(this.template({name: 'test'}));
        return this;
    }

});

var Router = Backbone.Router.extend({

    routes: {
        "help":                 "help",    // #help
        "search/:query":        "search",  // #search/kiwis
        "search/:query/p:page": "search"   // #search/kiwis/p7
    },

    help: function(query, page) {
        var a = new View({page: page});
        a.render();
        console.log('help')
    },

    search: function(query, page) {
        var a = new View({page: page});
        a.render();
    }

});

new Router();
Backbone.history.start({pushState: true});
