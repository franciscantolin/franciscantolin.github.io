
window.globalCounter = 0;
window.currentSection = null;

function isNewSection(title){
	return !title.match(/_\d+$/) || title.match(/_0$/)
}

function appendTo(container, child, counter){
	if(counter == window.globalCounter)
		$(container).append(child);
}

function applyTemplate(item, template){
	for(var key in item){
		var rgx = new RegExp('{{' + key + '}}', 'g');
		template = template.replace(rgx, item[key]);
	}	
	return template;
}


function loadImages(flickrSetIds, index, counter) {
	$('#content').jflickrfeed({
		flickrbase: 'http://api.flickr.com/services/feeds/',
		feedapi: 'photoset.gne',
		useTemplate: false,
		qstrings: {
			set: flickrSetIds[index],
			nsid: '73806935@N03',
			limit: 50,
			lang: 'en-us'
		},
		headCallback: function(data) { 
			if(isNewSection(data.title))
			{
				var headTemplate = '<h1>{{title}}</h1><h2>{{description}}</h2><hr/>';
			    appendTo(this, applyTemplate(data, headTemplate), counter);
			    var section = $('<ul class="thumbs"></ul>');
			    appendTo(this, section, counter);
			    window.currentSection = section;
			}
		    return window.currentSection;
		},
		itemCallback: function(item) {
			var itemTemplate =  
			'<li>'+
				'<a rel="colorbox" href="{{image_z}}" title="{{title}}">' +
					'<img src="{{image_m}}" alt="{{title}}" height="180px" />' +
				'</a>' +
			'</li>';
			appendTo(this, applyTemplate(item, itemTemplate), counter);
		}
	}, function(data) {
		index += 1;
		if (index < flickrSetIds.length && counter == window.globalCounter)
			loadImages(flickrSetIds, index, counter)
		if(isNewSection(data.title))
		 	$(this).find('a').colorbox();
	});
}

$(document).ready(function(){
    var flickrSets = {
		"lnkPiedras": ["72157628773264369"],
		"lnkIlustraciones": ["72157628870675035", "72157628870721327", "72157628870763783", "72157628870780837"],
		"lnkPublicaciones": ["72157628870806227", "72157628870826587"],
		"lnkMunecas": [],
		"lnkContacto": []
	};

	$('#mainNav A').click(function(){
		window.globalCounter += 1;
		var flickrSet = flickrSets[this.id];
		if(flickrSet && flickrSet.length > 0){
			$('#mainNav .active').removeClass('active');
			$(this).addClass('active');
			$('#content').empty();
			loadImages(flickrSet, 0, window.globalCounter);
		}
		else
			alert("Opción no implementada");
	});
	
	
});
