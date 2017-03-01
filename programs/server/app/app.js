var require = meteorInstall({"lib":{"__compatability":{"__globals.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/__compatability/__globals.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Collections = {};                                                                                                     // 1
_app = {                                                                                                              // 2
  NOOP: function () {}                                                                                                // 2
};                                                                                                                    // 2
Package['kadira:flow-router'] = Package['ostrio:flow-router-extra'];                                                  // 4
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 6
  (function () {                                                                                                      // 6
    window.IS_RENDERED = false;                                                                                       // 7
                                                                                                                      //
    if (!window.requestAnimFrame) {                                                                                   // 8
      window.requestAnimFrame = function () {                                                                         // 9
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);                                                                     // 11
        };                                                                                                            // 12
      }();                                                                                                            // 13
    }                                                                                                                 // 14
                                                                                                                      //
    if (!ClientStorage.has('blamed') || !_.isArray(ClientStorage.get('blamed'))) {                                    // 15
      ClientStorage.set('blamed', []);                                                                                // 16
    }                                                                                                                 // 17
                                                                                                                      //
    if (!ClientStorage.has('unlist') || !_.isBoolean(ClientStorage.get('unlist'))) {                                  // 18
      ClientStorage.set('unlist', true);                                                                              // 19
    }                                                                                                                 // 20
                                                                                                                      //
    if (!ClientStorage.has('secured') || !_.isBoolean(ClientStorage.get('secured'))) {                                // 21
      ClientStorage.set('secured', false);                                                                            // 22
    }                                                                                                                 // 23
                                                                                                                      //
    if (!ClientStorage.has('userOnly') || !_.isBoolean(ClientStorage.get('userOnly'))) {                              // 24
      ClientStorage.set('userOnly', false);                                                                           // 25
    }                                                                                                                 // 26
                                                                                                                      //
    var _el = null;                                                                                                   // 28
    $(window).on('dragenter dragover', function (e) {                                                                 // 29
      e.preventDefault();                                                                                             // 30
      e.stopPropagation();                                                                                            // 31
      _el = e.target;                                                                                                 // 32
      var uf = document.getElementById('uploadFile');                                                                 // 33
                                                                                                                      //
      if (!~uf.className.indexOf('file-over')) {                                                                      // 34
        uf.className += ' file-over';                                                                                 // 35
      }                                                                                                               // 36
                                                                                                                      //
      return false;                                                                                                   // 37
    });                                                                                                               // 38
    $(window).on('dragleave', function (e) {                                                                          // 40
      e.preventDefault();                                                                                             // 41
      e.stopPropagation();                                                                                            // 42
                                                                                                                      //
      if (_el === e.target) {                                                                                         // 43
        var uf = document.getElementById('uploadFile');                                                               // 44
                                                                                                                      //
        if (!!~uf.className.indexOf('file-over')) {                                                                   // 45
          uf.className = uf.className.replace(' file-over', '');                                                      // 46
        }                                                                                                             // 47
      }                                                                                                               // 48
                                                                                                                      //
      return false;                                                                                                   // 49
    });                                                                                                               // 50
    $(window).on('drop', function (e) {                                                                               // 52
      e.preventDefault();                                                                                             // 53
      e.stopPropagation();                                                                                            // 54
      var uf = document.getElementById('uploadFile');                                                                 // 55
                                                                                                                      //
      if (!!~uf.className.indexOf('file-over')) {                                                                     // 56
        uf.className = uf.className.replace(' file-over', '');                                                        // 57
      }                                                                                                               // 58
                                                                                                                      //
      return false;                                                                                                   // 59
    });                                                                                                               // 60
    _app.subs = new SubsManager();                                                                                    // 62
    _app.blamed = new ReactiveVar(ClientStorage.get('blamed'));                                                       // 63
    _app.unlist = new ReactiveVar(ClientStorage.get('unlist'));                                                       // 64
    _app.secured = new ReactiveVar(ClientStorage.get('secured'));                                                     // 65
    _app.uploads = new ReactiveVar(false);                                                                            // 66
    _app.userOnly = new ReactiveVar(ClientStorage.get('userOnly'));                                                   // 67
    _app.storeTTL = 86400000;                                                                                         // 68
                                                                                                                      //
    _app.currentUrl = function () {                                                                                   // 69
      return Meteor.absoluteUrl((FlowRouter.current().path || document.location.pathname).replace(/^\//g, '')).split('?')[0].split('#')[0].replace('!', '');
    };                                                                                                                // 71
                                                                                                                      //
    _app.storeTTLUser = 432000000;                                                                                    // 72
    _app.showProjectInfo = new ReactiveVar(false);                                                                    // 73
    _app.serviceConfiguration = new ReactiveVar({});                                                                  // 74
    Meteor.call('getServiceConfiguration', function (error, serviceConfiguration) {                                   // 76
      if (error) {                                                                                                    // 77
        console.error(error);                                                                                         // 78
      } else {                                                                                                        // 79
        _app.serviceConfiguration.set(serviceConfiguration);                                                          // 80
      }                                                                                                               // 81
    });                                                                                                               // 82
    Meteor.autorun(function () {                                                                                      // 84
      ClientStorage.set('blamed', _app.blamed.get());                                                                 // 85
    });                                                                                                               // 86
    Meteor.autorun(function () {                                                                                      // 88
      ClientStorage.set('unlist', _app.unlist.get());                                                                 // 89
    });                                                                                                               // 90
    Meteor.autorun(function () {                                                                                      // 92
      ClientStorage.set('secured', _app.secured.get());                                                               // 93
    });                                                                                                               // 94
    Meteor.autorun(function () {                                                                                      // 96
      ClientStorage.set('userOnly', _app.userOnly.get());                                                             // 97
    });                                                                                                               // 98
                                                                                                                      //
    if (!ClientStorage.has('uploadTransport')) {                                                                      // 100
      ClientStorage.set('uploadTransport', 'ddp');                                                                    // 101
    }                                                                                                                 // 102
                                                                                                                      //
    Template.registerHelper('urlCurrent', function () {                                                               // 104
      return _app.currentUrl();                                                                                       // 105
    });                                                                                                               // 106
    Template.registerHelper('url', function () {                                                                      // 108
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;                          // 108
      return Meteor.absoluteUrl(string);                                                                              // 109
    });                                                                                                               // 110
    Template.registerHelper('filesize', function () {                                                                 // 112
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;                               // 112
      return filesize(size);                                                                                          // 113
    });                                                                                                               // 114
    Template.registerHelper('extless', function () {                                                                  // 116
      var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';                          // 116
      var parts = filename.split('.');                                                                                // 117
                                                                                                                      //
      if (parts.length > 1) {                                                                                         // 118
        parts.pop();                                                                                                  // 119
      }                                                                                                               // 120
                                                                                                                      //
      return parts.join('.');                                                                                         // 121
    });                                                                                                               // 122
    Template.registerHelper('DateToISO', function () {                                                                // 124
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;                               // 124
                                                                                                                      //
      if (_.isString(time) || _.isNumber(time)) {                                                                     // 125
        time = new Date(time);                                                                                        // 126
      }                                                                                                               // 127
                                                                                                                      //
      return time.toISOString();                                                                                      // 128
    });                                                                                                               // 129
                                                                                                                      //
    Template._404.onRendered(function () {                                                                            // 131
      window.IS_RENDERED = true;                                                                                      // 132
    });                                                                                                               // 133
                                                                                                                      //
    Template._layout.helpers({                                                                                        // 135
      showProjectInfo: function () {                                                                                  // 136
        return _app.showProjectInfo.get();                                                                            // 137
      }                                                                                                               // 138
    });                                                                                                               // 135
                                                                                                                      //
    Template._layout.events({                                                                                         // 140
      'click [data-show-project-info]': function (e) {                                                                // 141
        e.preventDefault();                                                                                           // 142
                                                                                                                      //
        _app.showProjectInfo.set(!_app.showProjectInfo.get());                                                        // 143
                                                                                                                      //
        return false;                                                                                                 // 144
      }                                                                                                               // 145
    });                                                                                                               // 140
                                                                                                                      //
    marked.setOptions({                                                                                               // 147
      highlight: function (code) {                                                                                    // 148
        return hljs.highlightAuto(code).value;                                                                        // 149
      },                                                                                                              // 150
      renderer: new marked.Renderer(),                                                                                // 151
      gfm: true,                                                                                                      // 152
      tables: true,                                                                                                   // 153
      breaks: false,                                                                                                  // 154
      pedantic: false,                                                                                                // 155
      sanitize: true,                                                                                                 // 156
      smartLists: true,                                                                                               // 157
      smartypants: false                                                                                              // 158
    });                                                                                                               // 147
    Meteor.startup(function () {                                                                                      // 161
      $('html').attr('itemscope', '');                                                                                // 162
      $('html').attr('itemtype', 'http://schema.org/WebPage');                                                        // 163
      $('html').attr('xmlns:og', 'http://ogp.me/ns#');                                                                // 164
      $('html').attr('xml:lang', 'en');                                                                               // 165
      $('html').attr('lang', 'en');                                                                                   // 166
      var FPS = new FPSMeter({                                                                                        // 168
        ui: true,                                                                                                     // 169
        reactive: false                                                                                               // 170
      });                                                                                                             // 168
      FPS.start();                                                                                                    // 173
                                                                                                                      //
      var regStop = function () {                                                                                     // 174
        $('#__FPSMeter').click(function () {                                                                          // 175
          if (FPS.isRunning) {                                                                                        // 176
            FPS.isRunning = false;                                                                                    // 177
          } else {                                                                                                    // 178
            FPS.stop();                                                                                               // 179
            window.requestAnimFrame(function () {                                                                     // 180
              FPS.start();                                                                                            // 181
              regStop();                                                                                              // 182
            });                                                                                                       // 183
          }                                                                                                           // 184
        });                                                                                                           // 185
      };                                                                                                              // 186
                                                                                                                      //
      regStop();                                                                                                      // 188
    });                                                                                                               // 189
  })();                                                                                                               // 6
}                                                                                                                     // 190
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"files.collection.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/files.collection.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// DropBox usage:                                                                                                     // 1
// Read: https://github.com/VeliovGroup/Meteor-Files/wiki/DropBox-Integration                                         // 2
// env.var example: DROPBOX='{"dropbox":{"key": "xxx", "secret": "xxx", "token": "xxx"}}'                             // 3
var useDropBox = false; // AWS:S3 usage:                                                                              // 4
// Read: https://github.com/Lepozepo/S3#create-your-amazon-s3                                                         // 7
// Read: https://github.com/VeliovGroup/Meteor-Files/wiki/AWS-S3-Integration                                          // 8
// Create and attach CloudFront to S3 bucket: https://console.aws.amazon.com/cloudfront/                              // 9
// env.var example: S3='{"s3":{"key": "xxx", "secret": "xxx", "bucket": "xxx", "region": "xxx", "cfdomain": "https://xxx.cloudfront.net"}}'
                                                                                                                      //
var useS3 = false;                                                                                                    // 12
var Request = void 0,                                                                                                 // 14
    bound = void 0,                                                                                                   // 14
    fs = void 0,                                                                                                      // 14
    client = void 0,                                                                                                  // 14
    sendToStorage = void 0;                                                                                           // 14
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 16
  if (process.env.DROPBOX != null) {                                                                                  // 17
    Meteor.settings.dropbox = JSON.parse(process.env.DROPBOX).dropbox;                                                // 18
  } else if (process.env.S3 != null) {                                                                                // 19
    Meteor.settings.s3 = JSON.parse(process.env.S3).s3;                                                               // 20
  }                                                                                                                   // 21
                                                                                                                      //
  if (Meteor.settings.dropbox && Meteor.settings.dropbox.key && Meteor.settings.dropbox.secret && Meteor.settings.dropbox.token) {
    useDropBox = true;                                                                                                // 24
                                                                                                                      //
    var Dropbox = Npm.require('dropbox');                                                                             // 25
                                                                                                                      //
    fs = Npm.require('fs');                                                                                           // 26
    client = new Dropbox.Client({                                                                                     // 28
      key: Meteor.settings.dropbox.key,                                                                               // 29
      secret: Meteor.settings.dropbox.secret,                                                                         // 30
      token: Meteor.settings.dropbox.token                                                                            // 31
    });                                                                                                               // 28
  } else if (Meteor.settings.s3 && Meteor.settings.s3.key && Meteor.settings.s3.secret && Meteor.settings.s3.bucket && Meteor.settings.s3.region && Meteor.settings.s3.cfdomain) {
    // Fix CloudFront certificate issue                                                                               // 34
    // Read: https://github.com/chilts/awssum/issues/164                                                              // 35
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;                                                                     // 36
    useS3 = true;                                                                                                     // 37
                                                                                                                      //
    var knox = Npm.require('knox');                                                                                   // 38
                                                                                                                      //
    client = knox.createClient({                                                                                      // 40
      key: Meteor.settings.s3.key,                                                                                    // 41
      secret: Meteor.settings.s3.secret,                                                                              // 42
      bucket: Meteor.settings.s3.bucket,                                                                              // 43
      region: Meteor.settings.s3.region                                                                               // 44
    }); // Normalize cfdomain                                                                                         // 40
                                                                                                                      //
    Meteor.settings.s3.cfdomain = Meteor.settings.s3.cfdomain.replace(/\/+$/, '');                                    // 48
  }                                                                                                                   // 49
                                                                                                                      //
  if (useS3 || useDropBox) {                                                                                          // 51
    Request = Npm.require('request');                                                                                 // 52
    bound = Meteor.bindEnvironment(function (callback) {                                                              // 53
      return callback();                                                                                              // 54
    });                                                                                                               // 55
  }                                                                                                                   // 56
}                                                                                                                     // 57
                                                                                                                      //
Collections.files = new FilesCollection({                                                                             // 59
  // debug: true,                                                                                                     // 60
  // throttle: false,                                                                                                 // 61
  // chunkSize: 1024*1024,                                                                                            // 62
  storagePath: 'assets/app/uploads/uploadedFiles',                                                                    // 63
  collectionName: 'uploadedFiles',                                                                                    // 64
  allowClientCode: true,                                                                                              // 65
  "protected": function (fileObj) {                                                                                   // 59
    if (fileObj) {                                                                                                    // 67
      if (!(fileObj.meta && fileObj.meta.secured)) {                                                                  // 68
        return true;                                                                                                  // 69
      } else if (fileObj.meta && fileObj.meta.secured === true && this.userId === fileObj.userId) {                   // 70
        return true;                                                                                                  // 71
      }                                                                                                               // 72
    }                                                                                                                 // 73
                                                                                                                      //
    return false;                                                                                                     // 74
  },                                                                                                                  // 75
  onBeforeRemove: function (cursor) {                                                                                 // 76
    var _this = this;                                                                                                 // 76
                                                                                                                      //
    var res = cursor.map(function (file) {                                                                            // 77
      if (file && file.userId && _.isString(file.userId)) {                                                           // 78
        return file.userId === _this.userId;                                                                          // 79
      }                                                                                                               // 80
                                                                                                                      //
      return false;                                                                                                   // 81
    });                                                                                                               // 82
    return !~res.indexOf(false);                                                                                      // 83
  },                                                                                                                  // 84
  onBeforeUpload: function () {                                                                                       // 85
    if (this.file.size <= 1024 * 1024 * 128) {                                                                        // 86
      return true;                                                                                                    // 87
    }                                                                                                                 // 88
                                                                                                                      //
    return "Max. file size is 128MB you've tried to upload " + filesize(this.file.size);                              // 89
  },                                                                                                                  // 90
  downloadCallback: function (fileObj) {                                                                              // 91
    if (this.params && this.params.query && this.params.query.download === 'true') {                                  // 92
      Collections.files.collection.update(fileObj._id, {                                                              // 93
        $inc: {                                                                                                       // 94
          'meta.downloads': 1                                                                                         // 95
        }                                                                                                             // 94
      });                                                                                                             // 93
    }                                                                                                                 // 98
                                                                                                                      //
    return true;                                                                                                      // 99
  },                                                                                                                  // 100
  interceptDownload: function (http, fileRef, version) {                                                              // 101
    if (useDropBox || useS3) {                                                                                        // 102
      var path = fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipeFrom ? fileRef.versions[version].meta.pipeFrom : void 0;
                                                                                                                      //
      if (path) {                                                                                                     // 104
        // If file is successfully moved to Storage                                                                   // 105
        // We will pipe request to Storage                                                                            // 106
        // So, original link will stay always secure                                                                  // 107
        // To force ?play and ?download parameters                                                                    // 109
        // and to keep original file name, content-type,                                                              // 110
        // content-disposition and cache-control                                                                      // 111
        // we're using low-level .serve() method                                                                      // 112
        this.serve(http, fileRef, fileRef.versions[version], version, Request({                                       // 113
          url: path,                                                                                                  // 114
          headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent')
        }));                                                                                                          // 113
        return true;                                                                                                  // 117
      } // While file is not yet uploaded to Storage                                                                  // 118
      // We will serve file from FS                                                                                   // 120
                                                                                                                      //
                                                                                                                      //
      return false;                                                                                                   // 121
    }                                                                                                                 // 122
                                                                                                                      //
    return false;                                                                                                     // 123
  }                                                                                                                   // 124
});                                                                                                                   // 59
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 127
  Collections.files.denyClient();                                                                                     // 128
  Collections.files.on('afterUpload', function (fileRef) {                                                            // 129
    var _this2 = this;                                                                                                // 129
                                                                                                                      //
    if (useDropBox) {                                                                                                 // 130
      (function () {                                                                                                  // 130
        var makeUrl = function (stat, fileRef, version) {                                                             // 131
          var triesUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;                       // 131
          client.makeUrl(stat.path, {                                                                                 // 132
            long: true,                                                                                               // 133
            downloadHack: true                                                                                        // 134
          }, function (error, xml) {                                                                                  // 132
            bound(function () {                                                                                       // 136
              // Store downloadable link in file's meta object                                                        // 137
              if (error) {                                                                                            // 138
                if (triesUrl < 10) {                                                                                  // 139
                  Meteor.setTimeout(function () {                                                                     // 140
                    makeUrl(stat, fileRef, version, ++triesUrl);                                                      // 141
                  }, 2048);                                                                                           // 142
                } else {                                                                                              // 143
                  console.error(error, {                                                                              // 144
                    triesUrl: triesUrl                                                                                // 145
                  });                                                                                                 // 144
                }                                                                                                     // 147
              } else if (xml) {                                                                                       // 148
                var upd = {                                                                                           // 149
                  $set: {}                                                                                            // 149
                };                                                                                                    // 149
                upd['$set']['versions.' + version + '.meta.pipeFrom'] = xml.url;                                      // 150
                upd['$set']['versions.' + version + '.meta.pipePath'] = stat.path;                                    // 151
                                                                                                                      //
                _this2.collection.update({                                                                            // 152
                  _id: fileRef._id                                                                                    // 153
                }, upd, function (error) {                                                                            // 152
                  if (error) {                                                                                        // 155
                    console.error(error);                                                                             // 156
                  } else {                                                                                            // 157
                    // Unlink original files from FS                                                                  // 158
                    // after successful upload to DropBox                                                             // 159
                    _this2.unlink(_this2.collection.findOne(fileRef._id), version);                                   // 160
                  }                                                                                                   // 161
                });                                                                                                   // 162
              } else {                                                                                                // 163
                if (triesUrl < 10) {                                                                                  // 164
                  Meteor.setTimeout(function () {                                                                     // 165
                    // Generate downloadable link                                                                     // 166
                    makeUrl(stat, fileRef, version, ++triesUrl);                                                      // 167
                  }, 2048);                                                                                           // 168
                } else {                                                                                              // 169
                  console.error("client.makeUrl doesn't returns xml", {                                               // 170
                    triesUrl: triesUrl                                                                                // 171
                  });                                                                                                 // 170
                }                                                                                                     // 173
              }                                                                                                       // 174
            });                                                                                                       // 175
          });                                                                                                         // 176
        };                                                                                                            // 177
                                                                                                                      //
        var writeToDB = function (fileRef, version, data) {                                                           // 179
          var triesSend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;                      // 179
          // DropBox already uses random URLs                                                                         // 180
          // No need to use random file names                                                                         // 181
          client.writeFile(fileRef._id + '-' + version + '.' + fileRef.extension, data, function (error, stat) {      // 182
            bound(function () {                                                                                       // 183
              if (error) {                                                                                            // 184
                if (triesSend < 10) {                                                                                 // 185
                  Meteor.setTimeout(function () {                                                                     // 186
                    // Write file to DropBox                                                                          // 187
                    writeToDB(fileRef, version, data, ++triesSend);                                                   // 188
                  }, 2048);                                                                                           // 189
                } else {                                                                                              // 190
                  console.error(error, {                                                                              // 191
                    triesSend: triesSend                                                                              // 192
                  });                                                                                                 // 191
                }                                                                                                     // 194
              } else {                                                                                                // 195
                makeUrl(stat, fileRef, version);                                                                      // 196
              }                                                                                                       // 197
            });                                                                                                       // 198
          });                                                                                                         // 199
        };                                                                                                            // 200
                                                                                                                      //
        var readFile = function (fileRef, vRef, version) {                                                            // 202
          var triesRead = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;                      // 202
          fs.readFile(vRef.path, function (error, data) {                                                             // 203
            bound(function () {                                                                                       // 204
              if (error) {                                                                                            // 205
                if (triesRead < 10) {                                                                                 // 206
                  readFile(fileRef, vRef, version, ++triesRead);                                                      // 207
                } else {                                                                                              // 208
                  console.error(error);                                                                               // 209
                }                                                                                                     // 210
              } else {                                                                                                // 211
                writeToDB(fileRef, version, data);                                                                    // 212
              }                                                                                                       // 213
            });                                                                                                       // 214
          });                                                                                                         // 215
        };                                                                                                            // 216
                                                                                                                      //
        sendToStorage = function (fileRef) {                                                                          // 218
          _.each(fileRef.versions, function (vRef, version) {                                                         // 219
            readFile(fileRef, vRef, version);                                                                         // 220
          });                                                                                                         // 221
        };                                                                                                            // 222
      })();                                                                                                           // 130
    } else if (useS3) {                                                                                               // 223
      sendToStorage = function (fileRef) {                                                                            // 224
        _.each(fileRef.versions, function (vRef, version) {                                                           // 225
          // We use Random.id() instead of real file's _id                                                            // 226
          // to secure files from reverse engineering                                                                 // 227
          // As after viewing this code it will be easy                                                               // 228
          // to get access to unlisted and protected files                                                            // 229
          var filePath = 'files/' + Random.id() + '-' + version + '.' + fileRef.extension;                            // 230
          client.putFile(vRef.path, filePath, function (error) {                                                      // 231
            bound(function () {                                                                                       // 232
              if (error) {                                                                                            // 233
                console.error(error);                                                                                 // 234
              } else {                                                                                                // 235
                var upd = {                                                                                           // 236
                  $set: {}                                                                                            // 236
                };                                                                                                    // 236
                upd['$set']['versions.' + version + '.meta.pipeFrom'] = Meteor.settings.s3.cfdomain + '/' + filePath;
                upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;                                     // 238
                                                                                                                      //
                _this2.collection.update({                                                                            // 239
                  _id: fileRef._id                                                                                    // 240
                }, upd, function (error) {                                                                            // 239
                  if (error) {                                                                                        // 242
                    console.error(error);                                                                             // 243
                  } else {                                                                                            // 244
                    // Unlink original files from FS                                                                  // 245
                    // after successful upload to AWS:S3                                                              // 246
                    _this2.unlink(_this2.collection.findOne(fileRef._id), version);                                   // 247
                  }                                                                                                   // 248
                });                                                                                                   // 249
              }                                                                                                       // 250
            });                                                                                                       // 251
          });                                                                                                         // 252
        });                                                                                                           // 253
      };                                                                                                              // 254
    }                                                                                                                 // 255
                                                                                                                      //
    if (/png|jpe?g/i.test(fileRef.extension || '')) {                                                                 // 257
      _app.createThumbnails(this, fileRef, function (fileRef, error) {                                                // 258
        if (error) {                                                                                                  // 259
          console.error(error);                                                                                       // 260
        }                                                                                                             // 261
                                                                                                                      //
        if (useDropBox || useS3) {                                                                                    // 262
          sendToStorage(_this2.collection.findOne(fileRef._id));                                                      // 263
        }                                                                                                             // 264
      });                                                                                                             // 265
    } else {                                                                                                          // 266
      if (useDropBox || useS3) {                                                                                      // 267
        sendToStorage(fileRef);                                                                                       // 268
      }                                                                                                               // 269
    }                                                                                                                 // 270
  }); // This line now commented due to Heroku usage                                                                  // 271
  // Collections.files.collection._ensureIndex {'meta.expireAt': 1}, {expireAfterSeconds: 0, background: true}        // 274
  // Intercept FileCollection's remove method                                                                         // 276
  // to remove file from DropBox or AWS S3                                                                            // 277
                                                                                                                      //
  if (useDropBox || useS3) {                                                                                          // 278
    _origRemove = Collections.files.remove;                                                                           // 279
                                                                                                                      //
    Collections.files.remove = function (search) {                                                                    // 280
      var cursor = this.collection.find(search);                                                                      // 281
      cursor.forEach(function (fileRef) {                                                                             // 282
        _.each(fileRef.versions, function (vRef) {                                                                    // 283
          if (vRef && vRef.meta && vRef.meta.pipePath != null) {                                                      // 284
            if (useDropBox) {                                                                                         // 285
              // DropBox usage:                                                                                       // 286
              client.remove(vRef.meta.pipePath, function (error) {                                                    // 287
                bound(function () {                                                                                   // 288
                  if (error) {                                                                                        // 289
                    console.error(error);                                                                             // 290
                  }                                                                                                   // 291
                });                                                                                                   // 292
              });                                                                                                     // 293
            } else {                                                                                                  // 294
              // AWS:S3 usage:                                                                                        // 295
              client.deleteFile(vRef.meta.pipePath, function (error) {                                                // 296
                bound(function () {                                                                                   // 297
                  if (error) {                                                                                        // 298
                    console.error(error);                                                                             // 299
                  }                                                                                                   // 300
                });                                                                                                   // 301
              });                                                                                                     // 302
            }                                                                                                         // 303
          }                                                                                                           // 304
        });                                                                                                           // 305
      }); // Call original method                                                                                     // 306
                                                                                                                      //
      _origRemove.call(this, search);                                                                                 // 308
    };                                                                                                                // 309
  } // Remove all files on server load/reload, useful while testing/development                                       // 310
  // Meteor.startup -> Collections.files.remove {}                                                                    // 313
  // Remove files along with MongoDB records two minutes before expiration date                                       // 315
  // If we have 'expireAfterSeconds' index on 'meta.expireAt' field,                                                  // 316
  // it won't remove files themselves.                                                                                // 317
                                                                                                                      //
                                                                                                                      //
  Meteor.setInterval(function () {                                                                                    // 318
    Collections.files.remove({                                                                                        // 319
      'meta.expireAt': {                                                                                              // 320
        $lte: new Date(+new Date() + 120000)                                                                          // 321
      }                                                                                                               // 320
    }, _app.NOOP);                                                                                                    // 319
  }, 120000);                                                                                                         // 324
  Meteor.publish('latest', function () {                                                                              // 326
    var take = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;                                // 326
    var userOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;                         // 326
    check(take, Number);                                                                                              // 327
    check(userOnly, Boolean);                                                                                         // 328
    var selector = void 0;                                                                                            // 330
                                                                                                                      //
    if (userOnly && this.userId) {                                                                                    // 331
      selector = {                                                                                                    // 332
        userId: this.userId                                                                                           // 333
      };                                                                                                              // 332
    } else {                                                                                                          // 335
      selector = {                                                                                                    // 336
        $or: [{                                                                                                       // 337
          'meta.unlisted': false,                                                                                     // 339
          'meta.secured': false,                                                                                      // 340
          'meta.blamed': {                                                                                            // 341
            $lt: 3                                                                                                    // 342
          }                                                                                                           // 341
        }, {                                                                                                          // 338
          userId: this.userId                                                                                         // 345
        }]                                                                                                            // 344
      };                                                                                                              // 336
    }                                                                                                                 // 349
                                                                                                                      //
    return Collections.files.find(selector, {                                                                         // 351
      limit: take,                                                                                                    // 352
      sort: {                                                                                                         // 353
        'meta.created_at': -1                                                                                         // 354
      },                                                                                                              // 353
      fields: {                                                                                                       // 356
        _id: 1,                                                                                                       // 357
        name: 1,                                                                                                      // 358
        size: 1,                                                                                                      // 359
        meta: 1,                                                                                                      // 360
        type: 1,                                                                                                      // 361
        isPDF: 1,                                                                                                     // 362
        isText: 1,                                                                                                    // 363
        isJSON: 1,                                                                                                    // 364
        isVideo: 1,                                                                                                   // 365
        isAudio: 1,                                                                                                   // 366
        isImage: 1,                                                                                                   // 367
        userId: 1,                                                                                                    // 368
        'versions.thumbnail40.extension': 1,                                                                          // 369
        'versions.preview.extension': 1,                                                                              // 370
        extension: 1,                                                                                                 // 371
        _collectionName: 1,                                                                                           // 372
        _downloadRoute: 1                                                                                             // 373
      }                                                                                                               // 356
    }).cursor;                                                                                                        // 351
  });                                                                                                                 // 376
  Meteor.publish('file', function (_id) {                                                                             // 378
    check(_id, String);                                                                                               // 379
    return Collections.files.find({                                                                                   // 380
      $or: [{                                                                                                         // 381
        _id: _id,                                                                                                     // 383
        'meta.secured': false                                                                                         // 384
      }, {                                                                                                            // 382
        _id: _id,                                                                                                     // 386
        'meta.secured': true,                                                                                         // 387
        userId: this.userId                                                                                           // 388
      }]                                                                                                              // 385
    }, {                                                                                                              // 380
      fields: {                                                                                                       // 392
        _id: 1,                                                                                                       // 393
        name: 1,                                                                                                      // 394
        size: 1,                                                                                                      // 395
        type: 1,                                                                                                      // 396
        meta: 1,                                                                                                      // 397
        isPDF: 1,                                                                                                     // 398
        isText: 1,                                                                                                    // 399
        isJSON: 1,                                                                                                    // 400
        isVideo: 1,                                                                                                   // 401
        isAudio: 1,                                                                                                   // 402
        isImage: 1,                                                                                                   // 403
        extension: 1,                                                                                                 // 404
        'versions.preview.extension': 1,                                                                              // 405
        _collectionName: 1,                                                                                           // 406
        _downloadRoute: 1                                                                                             // 407
      }                                                                                                               // 392
    }).cursor;                                                                                                        // 391
  });                                                                                                                 // 410
  Meteor.methods({                                                                                                    // 412
    filesLenght: function () {                                                                                        // 413
      var userOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;                       // 413
      check(userOnly, Boolean);                                                                                       // 414
      var selector = void 0;                                                                                          // 416
                                                                                                                      //
      if (userOnly && this.userId) {                                                                                  // 417
        selector = {                                                                                                  // 418
          userId: this.userId                                                                                         // 419
        };                                                                                                            // 418
      } else {                                                                                                        // 421
        selector = {                                                                                                  // 422
          $or: [{                                                                                                     // 423
            'meta.unlisted': false,                                                                                   // 425
            'meta.secured': false,                                                                                    // 426
            'meta.blamed': {                                                                                          // 427
              $lt: 3                                                                                                  // 428
            }                                                                                                         // 427
          }, {                                                                                                        // 424
            userId: this.userId                                                                                       // 431
          }]                                                                                                          // 430
        };                                                                                                            // 422
      }                                                                                                               // 435
                                                                                                                      //
      return Collections.files.find(selector).count();                                                                // 436
    },                                                                                                                // 437
    unblame: function (_id) {                                                                                         // 438
      check(_id, String);                                                                                             // 439
      Collections.files.update({                                                                                      // 440
        _id: _id                                                                                                      // 441
      }, {                                                                                                            // 440
        $inc: {                                                                                                       // 443
          'meta.blamed': -1                                                                                           // 444
        }                                                                                                             // 443
      }, _app.NOOP);                                                                                                  // 442
      return true;                                                                                                    // 447
    },                                                                                                                // 448
    blame: function (_id) {                                                                                           // 449
      check(_id, String);                                                                                             // 450
      Collections.files.update({                                                                                      // 451
        _id: _id                                                                                                      // 452
      }, {                                                                                                            // 451
        $inc: {                                                                                                       // 454
          'meta.blamed': 1                                                                                            // 455
        }                                                                                                             // 454
      }, _app.NOOP);                                                                                                  // 453
      return true;                                                                                                    // 458
    },                                                                                                                // 459
    changeAccess: function (_id) {                                                                                    // 460
      check(_id, String);                                                                                             // 461
                                                                                                                      //
      if (Meteor.userId()) {                                                                                          // 462
        var file = Collections.files.findOne({                                                                        // 463
          _id: _id,                                                                                                   // 464
          userId: Meteor.userId()                                                                                     // 465
        });                                                                                                           // 463
                                                                                                                      //
        if (file) {                                                                                                   // 468
          Collections.files.update(_id, {                                                                             // 469
            $set: {                                                                                                   // 470
              'meta.unlisted': file.meta.unlisted ? false : true                                                      // 471
            }                                                                                                         // 470
          }, _app.NOOP);                                                                                              // 469
          return true;                                                                                                // 474
        }                                                                                                             // 475
      }                                                                                                               // 476
                                                                                                                      //
      throw new Meteor.Error(401, 'Access denied!');                                                                  // 477
    },                                                                                                                // 478
    changePrivacy: function (_id) {                                                                                   // 479
      check(_id, String);                                                                                             // 480
                                                                                                                      //
      if (Meteor.userId()) {                                                                                          // 481
        var file = Collections.files.findOne({                                                                        // 482
          _id: _id,                                                                                                   // 483
          userId: Meteor.userId()                                                                                     // 484
        });                                                                                                           // 482
                                                                                                                      //
        if (file) {                                                                                                   // 487
          Collections.files.update(_id, {                                                                             // 488
            $set: {                                                                                                   // 489
              'meta.unlisted': true,                                                                                  // 490
              'meta.secured': file.meta.secured ? false : true                                                        // 491
            }                                                                                                         // 489
          }, _app.NOOP);                                                                                              // 488
          return true;                                                                                                // 494
        }                                                                                                             // 495
      }                                                                                                               // 496
                                                                                                                      //
      throw new Meteor.Error(401, 'Access denied!');                                                                  // 497
    }                                                                                                                 // 498
  });                                                                                                                 // 412
}                                                                                                                     // 500
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"image-processing.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/image-processing.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var bound = Meteor.bindEnvironment(function (callback) {                                                              // 1
  return callback();                                                                                                  // 2
});                                                                                                                   // 3
                                                                                                                      //
var fs = Npm.require('fs-extra');                                                                                     // 5
                                                                                                                      //
var gm = Npm.require('gm');                                                                                           // 6
                                                                                                                      //
_app.createThumbnails = function (collection, fileRef, cb) {                                                          // 8
  check(fileRef, Object);                                                                                             // 9
  var isLast = false;                                                                                                 // 11
                                                                                                                      //
  var finish = function (error) {                                                                                     // 12
    bound(function () {                                                                                               // 13
      if (error) {                                                                                                    // 14
        console.error('[_app.createThumbnails] [finish]', error);                                                     // 15
        cb && cb(void 0, error);                                                                                      // 16
      } else {                                                                                                        // 17
        if (isLast) {                                                                                                 // 18
          cb && cb(fileRef);                                                                                          // 19
        }                                                                                                             // 20
      }                                                                                                               // 21
                                                                                                                      //
      return true;                                                                                                    // 22
    });                                                                                                               // 23
  };                                                                                                                  // 24
                                                                                                                      //
  fs.exists(fileRef.path, function (exists) {                                                                         // 26
    bound(function () {                                                                                               // 27
      if (!exists) {                                                                                                  // 28
        throw Meteor.log.error('File ' + fileRef.path + ' not found in [createThumbnails] Method');                   // 29
      }                                                                                                               // 30
                                                                                                                      //
      var image = gm(fileRef.path);                                                                                   // 31
      var sizes = {                                                                                                   // 32
        preview: {                                                                                                    // 33
          width: 400                                                                                                  // 34
        },                                                                                                            // 33
        thumbnail40: {                                                                                                // 36
          width: 40,                                                                                                  // 37
          square: true                                                                                                // 38
        }                                                                                                             // 36
      };                                                                                                              // 32
      image.size(function (error, features) {                                                                         // 42
        bound(function () {                                                                                           // 43
          if (error) {                                                                                                // 44
            console.error('[_app.createThumbnails] [_.each sizes]');                                                  // 45
            console.error(error);                                                                                     // 46
            return finish(Meteor.Error('[_app.createThumbnails] [_.each sizes]', error));                             // 47
          }                                                                                                           // 48
                                                                                                                      //
          var i = 0;                                                                                                  // 50
          collection.collection.update(fileRef._id, {                                                                 // 51
            $set: {                                                                                                   // 52
              'meta.width': features.width,                                                                           // 53
              'meta.height': features.height                                                                          // 54
            }                                                                                                         // 52
          }, _app.NOOP);                                                                                              // 51
                                                                                                                      //
          _.each(sizes, function (size, name) {                                                                       // 58
            var path = collection.storagePath(fileRef) + '/' + name + '-' + fileRef._id + '.' + fileRef.extension;    // 59
                                                                                                                      //
            var copyPaste = function () {                                                                             // 60
              fs.copy(fileRef.path, path, function (fsCopyError) {                                                    // 61
                bound(function () {                                                                                   // 62
                  if (fsCopyError) {                                                                                  // 63
                    console.error('[_app.createThumbnails] [_.each sizes] [fs.copy]', fsCopyError);                   // 64
                    return finish(fsCopyError);                                                                       // 65
                  }                                                                                                   // 66
                                                                                                                      //
                  var upd = {                                                                                         // 68
                    $set: {}                                                                                          // 68
                  };                                                                                                  // 68
                  upd['$set']['versions.' + name] = {                                                                 // 69
                    path: path,                                                                                       // 70
                    size: fileRef.size,                                                                               // 71
                    type: fileRef.type,                                                                               // 72
                    extension: fileRef.extension,                                                                     // 73
                    meta: {                                                                                           // 74
                      width: features.width,                                                                          // 75
                      height: features.height                                                                         // 76
                    }                                                                                                 // 74
                  };                                                                                                  // 69
                  collection.collection.update(fileRef._id, upd, function (colUpdError) {                             // 79
                    ++i;                                                                                              // 80
                                                                                                                      //
                    if (i === Object.keys(sizes).length) {                                                            // 81
                      isLast = true;                                                                                  // 82
                    }                                                                                                 // 83
                                                                                                                      //
                    finish(colUpdError);                                                                              // 84
                  });                                                                                                 // 85
                });                                                                                                   // 86
              });                                                                                                     // 87
            };                                                                                                        // 88
                                                                                                                      //
            if (/png|jpe?g/i.test(fileRef.extension)) {                                                               // 90
              var img = gm(fileRef.path).define('filter:support=2').define('jpeg:fancy-upsampling=false').define('jpeg:fancy-upsampling=off').define('png:compression-filter=5').define('png:compression-level=9').define('png:compression-strategy=1').define('png:exclude-chunk=all').autoOrient().noProfile().strip().dither(false).filter('Triangle');
                                                                                                                      //
              var updateAndSave = function (upNSaveError) {                                                           // 105
                bound(function () {                                                                                   // 106
                  if (upNSaveError) {                                                                                 // 107
                    console.error('[_app.createThumbnails] [_.each sizes] [img.resize]', upNSaveError);               // 108
                    return finish(upNSaveError);                                                                      // 109
                  }                                                                                                   // 110
                                                                                                                      //
                  fs.stat(path, function (fsStatError, stat) {                                                        // 111
                    if (fsStatError) {                                                                                // 112
                      console.error('[_app.createThumbnails] [_.each sizes] [img.resize] [fs.stat]', fsStatError);    // 113
                      return finish(fsStatError);                                                                     // 114
                    }                                                                                                 // 115
                                                                                                                      //
                    bound(function () {                                                                               // 116
                      gm(path).size(function (gmSizeError, imgInfo) {                                                 // 117
                        bound(function () {                                                                           // 118
                          if (gmSizeError) {                                                                          // 119
                            console.error('[_app.createThumbnails] [_.each sizes] [img.resize] [fs.stat] [gm(path).size]', gmSizeError);
                            return finish(gmSizeError);                                                               // 121
                          }                                                                                           // 122
                                                                                                                      //
                          var upd = {                                                                                 // 123
                            $set: {}                                                                                  // 123
                          };                                                                                          // 123
                          upd['$set']['versions.' + name] = {                                                         // 124
                            path: path,                                                                               // 125
                            size: stat.size,                                                                          // 126
                            type: fileRef.type,                                                                       // 127
                            extension: fileRef.extension,                                                             // 128
                            meta: {                                                                                   // 129
                              width: imgInfo.width,                                                                   // 130
                              height: imgInfo.height                                                                  // 131
                            }                                                                                         // 129
                          };                                                                                          // 124
                          collection.collection.update(fileRef._id, upd, function (colUpdError) {                     // 135
                            ++i;                                                                                      // 136
                                                                                                                      //
                            if (i === Object.keys(sizes).length) {                                                    // 137
                              isLast = true;                                                                          // 138
                            }                                                                                         // 139
                                                                                                                      //
                            finish(colUpdError);                                                                      // 140
                          });                                                                                         // 141
                        });                                                                                           // 142
                      });                                                                                             // 143
                    });                                                                                               // 144
                  });                                                                                                 // 145
                });                                                                                                   // 146
              };                                                                                                      // 147
                                                                                                                      //
              if (!size.square) {                                                                                     // 149
                if (features.width > size.width) {                                                                    // 150
                  img.resize(size.width).interlace('Line').write(path, updateAndSave);                                // 151
                } else {                                                                                              // 152
                  copyPaste();                                                                                        // 153
                }                                                                                                     // 154
              } else {                                                                                                // 155
                var x = 0;                                                                                            // 156
                var y = 0;                                                                                            // 157
                var widthRatio = features.width / size.width;                                                         // 158
                var heightRatio = features.height / size.width;                                                       // 159
                var widthNew = size.width;                                                                            // 160
                var heightNew = size.width;                                                                           // 161
                                                                                                                      //
                if (heightRatio < widthRatio) {                                                                       // 163
                  widthNew = size.width * features.width / features.height;                                           // 164
                  x = (widthNew - size.width) / 2;                                                                    // 165
                }                                                                                                     // 166
                                                                                                                      //
                if (heightRatio > widthRatio) {                                                                       // 168
                  heightNew = size.width * features.height / features.width;                                          // 169
                  y = (heightNew - size.width) / 2;                                                                   // 170
                }                                                                                                     // 171
                                                                                                                      //
                img.resize(widthNew, heightNew).crop(size.width, size.width, x, y).interlace('Line').write(path, updateAndSave);
              }                                                                                                       // 178
            } else {                                                                                                  // 179
              copyPaste();                                                                                            // 180
            }                                                                                                         // 181
          });                                                                                                         // 182
        });                                                                                                           // 183
      });                                                                                                             // 184
    });                                                                                                               // 185
  });                                                                                                                 // 186
  return true;                                                                                                        // 187
};                                                                                                                    // 188
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"service-configurations.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/service-configurations.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _sc = {};                                                                                                         // 1
ServiceConfiguration.configurations.remove({});                                                                       // 2
                                                                                                                      //
if (process.env.ACCOUNTS_METEOR_ID && process.env.ACCOUNTS_METEOR_SEC) {                                              // 4
  _sc.meteor = true;                                                                                                  // 5
  ServiceConfiguration.configurations.upsert({                                                                        // 6
    service: 'meteor-developer'                                                                                       // 7
  }, {                                                                                                                // 6
    $set: {                                                                                                           // 9
      secret: process.env.ACCOUNTS_METEOR_SEC,                                                                        // 10
      clientId: process.env.ACCOUNTS_METEOR_ID,                                                                       // 11
      loginStyle: 'redirect'                                                                                          // 12
    }                                                                                                                 // 9
  });                                                                                                                 // 8
}                                                                                                                     // 15
                                                                                                                      //
if (process.env.ACCOUNTS_GITHUB_ID && process.env.ACCOUNTS_GITHUB_SEC) {                                              // 17
  _sc.github = true;                                                                                                  // 18
  ServiceConfiguration.configurations.upsert({                                                                        // 19
    service: 'github'                                                                                                 // 20
  }, {                                                                                                                // 19
    $set: {                                                                                                           // 22
      secret: process.env.ACCOUNTS_GITHUB_SEC,                                                                        // 23
      clientId: process.env.ACCOUNTS_GITHUB_ID,                                                                       // 24
      loginStyle: 'redirect'                                                                                          // 25
    }                                                                                                                 // 22
  });                                                                                                                 // 21
}                                                                                                                     // 28
                                                                                                                      //
if (process.env.ACCOUNTS_TWITTER_ID && process.env.ACCOUNTS_TWITTER_SEC) {                                            // 30
  _sc.twitter = true;                                                                                                 // 31
  ServiceConfiguration.configurations.upsert({                                                                        // 32
    service: 'twitter'                                                                                                // 33
  }, {                                                                                                                // 32
    $set: {                                                                                                           // 35
      loginStyle: 'redirect',                                                                                         // 36
      secret: process.env.ACCOUNTS_TWITTER_SEC,                                                                       // 37
      consumerKey: process.env.ACCOUNTS_TWITTER_ID                                                                    // 38
    }                                                                                                                 // 35
  });                                                                                                                 // 34
}                                                                                                                     // 41
                                                                                                                      //
if (process.env.ACCOUNTS_FACEBOOK_ID && process.env.ACCOUNTS_FACEBOOK_SEC) {                                          // 43
  _sc.facebook = true;                                                                                                // 44
  ServiceConfiguration.configurations.upsert({                                                                        // 45
    service: 'facebook'                                                                                               // 46
  }, {                                                                                                                // 45
    $set: {                                                                                                           // 48
      secret: process.env.ACCOUNTS_FACEBOOK_SEC,                                                                      // 49
      appId: process.env.ACCOUNTS_FACEBOOK_ID,                                                                        // 50
      loginStyle: 'redirect'                                                                                          // 51
    }                                                                                                                 // 48
  });                                                                                                                 // 47
}                                                                                                                     // 54
                                                                                                                      //
Meteor.methods({                                                                                                      // 56
  getServiceConfiguration: function () {                                                                              // 57
    return _sc;                                                                                                       // 58
  }                                                                                                                   // 59
});                                                                                                                   // 56
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"spiderable.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/spiderable.js                                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// WebApp.connectHandlers.use(new Spiderable({                                                                        // 1
//   rootURL: 'https://files.veliov.com',                                                                             // 2
//   serviceURL: 'https://render.ostr.io',                                                                            // 3
//   auth: 'xxx:yyy'                                                                                                  // 4
// }));                                                                                                               // 5
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./lib/__compatability/__globals.js");
require("./lib/files.collection.js");
require("./server/image-processing.js");
require("./server/service-configurations.js");
require("./server/spiderable.js");
//# sourceMappingURL=app.js.map
