
new (function() {
    var ext = this;

    function getVocative(name, callback){
        console.log("vocative from",name);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/process.py?np='+name+'&output=json',
              dataType: 'json',
              success: function(data){
                  console.log("success",data);
                  vocative = data["name"];
                  console.log("vocative",vocative);
                  callback(vocative);
              }
        });
    }

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
        getVocative(name, callback);
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
