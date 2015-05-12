var View = Backbone.View.extend({

    el: "#app",

    template: _.template("hello: <%= name %>"),

    initialize: function(){
    },

    render: function(){
        this.$el.html(this.template({name: 'test'}));
        return this;
    }

});

var Router = Backbone.Router.extend({

    routes: {
        "help": "help",    // #help
        "search/:query": "search",  // #search/kiwis
        "search/:query/p:page": "search"   // #search/kiwis/p7
    },

    help: function(query, page){
        var a = new View({page: page});
        a.render();
        console.log('help')
    },

    search: function(query, page){
        var a = new View({page: page});
        a.render();
    }

});

$.ajax({
    url: '/api/lydiatest/json/jobseekers/coverletters/1206160',
    method: 'GET',
    data: {
        timestamp:'2015-05-12T18:49:32',
        key:'a5a42be583e281bca02ed0a30ef4bca3f046c46d',
        token:'75021426b67269a575358ffcdc409114c08e94b1',
        user_auth_id:'d09f611f-ad80-11e4-b936-25f3afe0b26e',
        user_key:'5cf07817096344eb1d53bbd62c0c35e8f653855a'
    },
    success: function(data){
        console.log(data)
    },
    error: function(a, b, c){
        console.log(a, b, c)
    }
});


$.ajax({
    url: '/api/lydiatest/json/jobseekers/coverletters/1206160',
    method: 'PUT',
    data: {
        timestamp:'2015-05-12T18:49:32',
        key:'a5a42be583e281bca02ed0a30ef4bca3f046c46d',
        token:'75021426b67269a575358ffcdc409114c08e94b1',
        user_auth_id:'d09f611f-ad80-11e4-b936-25f3afe0b26e',
        user_key:'5cf07817096344eb1d53bbd62c0c35e8f653855a'
    },
    success: function(data){
        console.log(data)
    },
    error: function(a, b, c){
        console.log(a, b, c)
    }
});

new Router();
Backbone.history.start({pushState: true});
