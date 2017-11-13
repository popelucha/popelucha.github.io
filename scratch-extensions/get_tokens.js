
new (function() {
    var ext = this;

    function getTags(sentence, callback){
        console.log("tag",sentence);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/tagger.py?sentence='+sentence+'&output=json',
              dataType: 'json',
              success: function(data){
                  console.log("success",data);
                  tagged = data["answer"];
                  console.log("vocative",tagged);
                  callback(tagged);
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

    ext.get_tags = function(sentence, callback) {
        var name = name.replace(/ /g, "+");
        console.log('Getting tags for ' + sentence+", callback "+callback);
        getTags(sentence, callback);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Get tags for the sentence %s', 'get_tags', 'Máma mele maso.'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Czech tagger extension', descriptor, ext);
})({});
