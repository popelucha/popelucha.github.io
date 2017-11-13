
new (function() {
    var ext = this;

    function f(json){
                  console.log("return ",json);
                  vocative = json["name"];
                  console.log("return ",vocative);

    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.

    ext.get_vocative = function(name, callback) {
        var name = name.replace(/ /g, "+");
        console.log('Getting vocative for ' + name+", callback "+callback);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/process.py?np='+name+'&output=json&callback=f&second_callback='+callback,
              dataType: 'jsonp',
              callbackName: 'f',
              success: function(data) {
                  // Got the data - parse it and return the temperature
//                  vocative = data["name"];
                  console.log("return",data);
//                  callback(vocative);
              }

        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Get vocative for the name %s', 'get_vocative', 'Jan'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Czech vocative extension', descriptor, ext);
})({});
