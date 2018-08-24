var serand = require('serand');
var navigation = require('navigation');
var utils = require('utils');

var context;

var ready = false;

var render = function (done) {
    $.ajax({
        url: utils.resolve('accounts:///apis/v/menus/2'),
        dataType: 'json',
        success: function (links) {
            done(null, links);
        },
        error: function (xhr, status, err) {
            done(err || status || xhr);
        }
    });
};

module.exports = function (sandbox, options, done) {
    context = {
        sandbox: sandbox,
        done: done
    };
    if (!ready) {
        return;
    }
    render(function(err, links) {
        if (err) {
            return done(err);
        }
        navigation(sandbox, links, done);
    });
};

serand.on('user', 'ready', function (user) {
    ready = true;
    if (!context) {
        return;
    }
    render(function(err, links) {
        if (err) {
            return done(err);
        }
        navigation(context.sandbox, links, context.done);
    });
});
