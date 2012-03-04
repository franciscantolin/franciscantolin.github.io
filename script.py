
import urllib2
import json

API_KEY = 'c6098475b1808b1366c5993cca26104f'
SECRET  = 'b5ce48b50764be54'
USER_ID = '73806935@N03'

FLICKR_URL = 'http://api.flickr.com/services/rest/'
FLICKR_PHOTOSETS_GET_LIST = 'method=flickr.photosets.getList&api_key=%s&user_id=%s&format=json'
FLICKR_PHOTOSETS_GET_PHOTOS = 'method=flickr.photosets.getPhotos&api_key=%s&format=json&extras=orginal_format,url_m&photoset_id=%s'

def jsonFlickrApi(res): return res

def getPhotoSetsJson(populate=False):
  return json.dumps(getPhotoSets(populate), sort_keys=True, indent=2).replace('\\\\/', '/').replace('\\\\u', '\u')

def getPhotoSets(populate=False):
  res = []
  data = FLICKR_PHOTOSETS_GET_LIST % (API_KEY, USER_ID)
  result = eval(urllib2.urlopen(FLICKR_URL, data).read())
  if result['stat']=='ok':
    for photoset in result['photosets']['photoset']:
      myPhotoset = {'id': photoset['id'], 'title': photoset['title']['_content'], 'description': photoset['description']['_content']}
      if populate:
        myPhotoset['photos'] = getPhotos(myPhotoset['id'])

      res.append(myPhotoset)
  else:
    print result['stat']

  return res 

def getPhotos(photoSetId):
  res = []
  data = FLICKR_PHOTOSETS_GET_PHOTOS % (API_KEY, photoSetId)
  result = eval(urllib2.urlopen(FLICKR_URL, data).read())
  if result['stat']=='ok':
    for photo in result['photoset']['photo']:
      res.append({'id': photo['id'], 'title': photo['title'], 'url': photo['url_m']})

  return res

if __name__ == "__main__":
  res = getPhotoSetsJson(populate=True)
  print res

