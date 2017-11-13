
new (function() {
    var ext = this;

    function getVocative(name, callback){
        console.log("vocative from",name);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/process.py?np='+name+'&output=json',
              dataType: 'json',
              success: function(data){
                  console.log("success",data);
                  callback(data["name"]);
              }
        });
    }

    function getGender(name, callback){
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/process.py?np='+name+'&output=json',
              dataType: 'json',
              success: function(data){
                  callback(data["gender"]);
              }
        });
    }

    function getTopics(sentence, callback){
        console.log("topics",sentence);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/topicks/process.py?text='+sentence+'&format=json',
              dataType: 'json',
              success: function(data){
                  console.log("response",data);
                  callback(data[0]);
              }
        });
    }

    function getPolarity(sentence, callback){
        console.log("polarity",sentence);
        $.ajax({
              url: 'https://nlp.fi.muni.cz/projekty/declension/names/polarity.py?topic='+sentence+'&output=json',
              dataType: 'json',
              success: function(data){
                  console.log("response",data);
                  callback(data["polarity"]);
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

    ext.get_gender = function(name, callback) {
        var name = name.replace(/ /g, "+");
        console.log('Getting gender for ' + name+", callback "+callback);
        getGender(name, callback);
    };

    ext.get_polarity = function(sentence, callback) {
        var sentence = sentence.replace(/ /g, "+");
        console.log('Getting polarity for ' + sentence+", callback "+callback);
        getPolarity(polarity, callback);
    };

    ext.get_topics = function(sentence, callback) {
        var sentence = sentence.replace(/ /g, "+");
        console.log('Getting topics for ' + sentence+", callback "+callback);
        getTopics(sentence, callback);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Get vocative for the name %s', 'get_vocative', 'kamarád'],
            ['R', 'Get gender for the name %s', 'get_gender', 'm'],
            ['b', 'Get polarity for sentence %s', 'get_polarity', 1],
            ['R', 'Get topics for sentence %s', 'get_topics', ''],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Czech chatbot support', descriptor, ext);
})({});
