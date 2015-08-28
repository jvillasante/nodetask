var should = require('chai').should();
var nodetask = require('../index');
var getUrl = nodetask.getUrl,
    postUrl = nodetask.postUrl;

describe('#getUrl', function() {
  it('should reject malformed urls', function(done) {
    var count = 0;
    var urls = [
      'htt://www.github.com',
      null,
      '',
      undefined
    ];

    urls.forEach(function(url) {
      getUrl(url, function(err, statusCode, body) {
        should.exist(err);
        should.not.exist(statusCode);
        should.not.exist(body);
        ++count;
      });

      if (count === urls.length) {
        done();
      }
    });
  });

  it('should GET succesfully', function(done) {
    var github = 'http://www.github.com';

    getUrl(github, function(err, statusCode, body) {
      should.not.exist(err);
      should.exist(statusCode);
      statusCode.should.equal(200);
      should.exist(body);
      done();
    });
  });
});

describe('#postUrl', function() {
  it('should reject malformed urls', function(done) {
    var count = 0;
    var urls = [
      'htt://www.github.com',
      null,
      '',
      undefined
    ];

    urls.forEach(function(url) {
      postUrl(url, {}, function(err, statusCode, body) {
        should.exist(err);
        should.not.exist(statusCode);
        should.not.exist(body);
        ++count;
      });

      if (count === urls.length) {
        done();
      }
    });
  });

  it('should reject invalid post data', function(done) {
    var count = 0;
    var postEndpoint = 'https://posttestserver.com/post.php';
    var postData = [null, undefined];

    postData.forEach(function(data) {
      postUrl(postEndpoint, data, function(err, statusCode, body) {
        should.exist(err);
        should.not.exist(statusCode);
        should.not.exist(body);
        ++count;
      });

      if (count === postData.length) {
        done();
      }
    });
  });

  it('should POST succesfully', function(done) {
    var postEndpoint = 'https://posttestserver.com/post.php';
    var postData = {
      nickname: 'jvillasante',
      currentTime: Date.now()
    };

    postUrl(postEndpoint, postData, function(err, statusCode, body) {
      should.not.exist(err);
      should.exist(statusCode);
      statusCode.should.equal(200);
      should.exist(body);
      done();
    });
  });
});
