(function (exports, module, undefined) {
  "use strict";

  var db = module.parent.require('./database');
  var meta = module.parent.require('./meta');

  function getData(callback) {
    db.get('plugins:announcement-board', function (err, data) {
      if (err) {
        return callback(err);
      }
      data = JSON.parse(data) || {};
      callback(null, data);
    });
  }

  function setData(data, callback) {
    db.set('plugins:announcement-board', JSON.stringify(data), callback);
    meta.settings.set('announcement-board', data);
  }

  function setDataField(field, data, callback) {
    getData(function (err, odata) {
      odata[field] = data;
      setData(odata, callback);
    });
  }

  function renderBoard(req, res, next) {
    getData(function (err, data) {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.json(data);
    });
  }

  function renderAdmin(req, res, next) {
    getData(function (err, data) {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.render('admin/plugins/announcement-board', data);
    });
  }

  function save(req, res, next) {
    var data = JSON.parse(req.body.data);

    setData(data, function (err) {
      if (err) {
        console.error(err);
        return res.json({
          result: false,
          message: 'Saving failed. Try again later.',
        });
      }
      res.json({
        result: true,
        message: 'Successfully saved configuration',
      });
    });
  }

  exports.init = function (app, middleware, controllers, callback) {
    var router;
    if (app.router) {
      callback = middleware;
      controllers = app.controllers;
      middleware = app.middleware;
      router = app.router;
    } else {
      router = app;
    }

    router.get('/admin/plugins/announcement-board', middleware.admin.buildHeader, renderAdmin);
    router.get('/api/admin/plugins/announcement-board', renderAdmin);
    router.post('/api/admin/plugins/announcement-board', save);

    callback();
  };
  exports.addAdminNavigation = function (header, callback) {
    header.plugins.push({
      route: '/plugins/announcement-board',
      icon: 'fa-list',
      name: 'Announcement configuration'
    });
    callback(null, header);
  };
  exports.appendConfig = function (config, callback) {
    meta.settings.get('announcement-board', function (err, settings) {
      if (err) {
        return callback(null, config);
      }

      config['announcement-default'] = settings;
      callback(null, config);
    });
  }
})(module.exports, module);