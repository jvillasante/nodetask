# Privicee NodeTask

## Node.js module – HTTP GET/POST

This is [an example](http://example.com/ "Title") inline link.

Please build a module using the [request](https://www.npmjs.com/package/request) package that has
two methods, *getURL* and *postURL*. You can think of it as a simple wrapper around ``request``.

    moduleName.getURL(url, callback); // url: path to GET url,
                                      // callback: function of type (err, statusCode, body)

    moduleName.postURL(url, jsonData, callback); // url path to POST,
                                                 // jsonData: json obj to post to server,
                                                 // callback: same as above

### Required:
1. Mocha, write tests for this module
2. Use the [debug module](https://www.npmjs.com/package/debug) for your debug message.
Set debug type to *worker*. Use debug messages in your module!
3. Method *getUrl* - take a URL, ensure it is not null or empty string, then perform *GET* request.
Return error if request returns error object or if ``statusCode !== 200``. Otherwise return null for
the error and pass the body back to the callback.
4. Method *postURL* - take URL, ensure it is not null or empty string, take *postData*, ensure it is
not *null* or *undefined*, then post the JSON data to the server. Return error if request returns
error or if ``statusCode !== 200``. Otherwise return null for the error and pass the body back to the
callback.

### Your Mocha test should check for the following:
1. Successful *getURL* using [github.com](http://www.github.com/)
2. Successful *postURL* using [posttestserver.com](https://posttestserver.com/post.php) (this will
allow you to see your POST data publically follow the URL in the return body.) Please post something
silly like your name and current time for testing.
3. Pass in *null* to *getURL* and make sure it gets error back.
