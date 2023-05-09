# Dailymotion Search Iframe 

Dailymotion Seach Iframe is a Iframe-based solution to search videos from given channels(`owners`). The iframe is also able to communicate with the host via [`cross-window-communication`](https://javascript.info/cross-window-communication).

## Basic Information: 
- Iframe URL : https://google.com

- **Embed Code:**
```html
<iframe src="https://staging.dmvs-apac.com/SearchIframe/lab/iframe.html?sort=relevance&owners=indiatoday" ></iframe>
```
- Iframe can capture information from its query parameters. 
- Iframe can send and listen events with the host site.

## Query Parameters : 
Although it is not mandatory, you can send information as query parameters along with the iframe URL while the iframe is loaded.

| Query Param Name | Type | Description | 
| :---: | :---: | --- |
| sort | string | To select the sorting order for search results as default. You can set it as `recent`, `relevance`, or `random`. [API reference](https://developers.dailymotion.com/api/#video-sort-filter) |
| owners | string | to add the channels name for search result as default. To put more than 1 you can separate by "," |

## Events : 
With [`cross-window-communication`](https://javascript.info/cross-window-communication) the iframe sends events based on interaction inside the iframe. Here is how an event is captured from the host page.
```JS
// To capture the event when a video thumbnail is clicked
window.addEventListener("message",(msg)=>{
  if(msg.data && msg.data.from && msg.data.from==="dm-search-click"){
       console.log(msg.data.info);
  }
})
```
### Events from Iframe :
| Event Name | Information | 
| :---: | :---: |
| `dm-search-click` | ``` {id:{VIDOE_ID}, thumbnail_480_url:{VIDEO_THUMBNAIL}, duration:{VIDEO_DURATION}}``` |

### Test page : 
- https://staging.dmvs-apac.com/SearchIframe/lab/index.html
