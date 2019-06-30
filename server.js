var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

var slot = 0;

function random_from_array(images){
  slot = Math.floor(Math.random() * images.length);
  return images[slot];
}

function slot_determine(){
var message = '';
        if(slot == 0){
        	message = 'Bobby Bald';
        }
        else if(slot == 1){
        	message = 'Bobby Bentley';
        }
        else if(slot == 2){
        	message = 'Bobby Biceps';
        }
        else if(slot == 3){
        	message = 'Bobby Biracial';
        }
        else if(slot == 4){
        	message = 'Bobby Bloodshed';
        }
        else if(slot == 5){
        	message = 'Bobby Boxer';
        }
        else if(slot == 6){
        	message = 'Bobby Brain';
        }
        return message;
}

function upload_random_image(images){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');


      T.post('statuses/update', {
        status: slot_determine(),
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

fs.readdir(__dirname + '/images', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });


    setInterval(function(){
      upload_random_image(images);
    }, 43200000);
  }
});



