
new (function() {
    var ext = this;
        window.f = function(json){
                  console.log("return ",json);
                  vocative = json["name"];
                  console.log("return ",vocative);
                  callback = json["callback"];
                  callback(vocative);

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
