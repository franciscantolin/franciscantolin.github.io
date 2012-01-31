
import urllib2


flickrSets = ["72157628773264369","72157628870675035","72157628870806227", "72157628870826587"]
dataSource = {}


url = 'http://api.flickr.com/services/rest/'
data = 'method=flickr.photosets.getPhotos&api_key=e4e06da15884248c088a010bac66a8e0&format=json&extras=orginal_format,url_m'

def jsonFlickrApi(res): return res

for set in flickrSets:
    photosetData = data + '&photoset_id=' + set
    result = urllib2.urlopen(url, photosetData)
    photos = eval(result.read())
    dataSource[set] = photos['photoset']

for key in dataSource.keys():
    photoset = dataSource[key]
    print "%s -> %s" % (photoset['id'], len(photoset['photo']))
    for photo in photoset['photo']:
        print "    -> %s" % photo['url_m']
