function applyTemplate(item, template){
	for(var key in item){
		var rgx = new RegExp('{{' + key + '}}', 'g');
		template = template.replace(rgx, item[key]);
	}	
	return template;
}


function loadImages(photosetId, container) {
  var photoSet = getPhotoset(photosetId);
  if(photoSet==null){
    alert('Photoset no encontrado!!');
    return;
  }
  for(var i=0;i<photoSet.photos.length;i++)
    $(container).append(buildPhotoElement(photoSet.photos[i]));

  $(container).find('a').colorbox({"width": "650px", "height": "550px"});
}

function buildPhotoElement(photo){
  var photoTemplate = 
    '<a rel="colorbox" href="{{size_z}}" title="{{title}}">' +
      '<div style="width:100%;height:100%;background:url(\'{{size_m}}\') center no-repeat;"></div>'+
    '</a>'; 

  var photoObject = {
    'title'  : photo['title'],
    'url'    : photo['url'],
    'size_z' : photo['url'].replace('.jpg', '_z.jpg'),
    'size_m' : photo['url'].replace('.jpg', '_m.jpg'),
    'size_b' : photo['url'].replace('.jpg', '_b.jpg'),
    'size_s' : photo['url'].replace('.jpg', '_s.jpg')
  };

  return applyTemplate(photoObject, photoTemplate);
}

function getPhotoset(photosetId)
{
  for(var i=0;i<photosets.length;i++)
    if(photosets[i]['id']==photosetId)
      return photosets[i];

  return null;
}

$(document).ready(function(){
	$('#menu A[photosetid]').click(function(){
		var photosetId = $(this).attr('photosetid');
    $('#menu .selected').removeClass('selected');
    $(this).addClass('selected');
    $('.scrollable').remove();

    var scrollableTemplate = '\
    <li class="scrollable" style="display:none"> \
      	<div class="scrollingHotSpotLeft">&nbsp;</div> \
        <div class="scrollingHotSpotRight">&nbsp;</div> \
        <div class="scrollWrapper"> \
          <div class="scrollableArea"> \
          </div> \
        </div> \
    </li>';

    $(this).parent().after(scrollableTemplate);
    loadImages(photosetId, $('.scrollableArea'));

    $(".scrollable").show().smoothDivScroll({ 
      autoScroll: "onstart",
      autoScrollDirection: "backandforth", 
      autoScrollStep: 1, 
      autoScrollInterval: 15,	
      startAtElementId: "startAtMe",
      visibleHotSpots: "always"
    }).bind("click", function() {
      $(this).smoothDivScroll("stopAutoScroll");
    });
    
    // Start autoscrolling again when the user closes
    // the colorbox overlay
    $(document).bind('cbox_closed', function(){
      $(".scrollable").smoothDivScroll("startAutoScroll");
    });

    $(".scrollingHotSpotLeft").css({"display": "block"});
	});
});

