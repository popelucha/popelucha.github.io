/* Extension demonstrating a blocking command block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */

new (function() {
    var ext = this;

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
        console.log('Getting vocative for ' + name);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/process.py?np='+name+'&output=json&callback=f',
              dataType: 'jsonp',
              success: function(data) {
                  // Got the data - parse it and return the temperature
                  vocative = data["name"];
                  callback(vocative);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'Get vocative for the name %s', 'get_vocative', 'Jan'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Czech vocative extension', descriptor, ext);
})({});
