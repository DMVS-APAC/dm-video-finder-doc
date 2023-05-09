# Dailymotion Search Iframe 

Dailymotion Seach Iframe is a Iframe based solution to search videos from given channels(`owners`). The iframe is also able to communicate with host via [`cross-window-communication`](https://javascript.info/cross-window-communication).

## Basic Information: 
- Iframe URL : https://google.com

- Embed Code:
```html
<iframe src="https://staging.dmvs-apac.com/SearchIframe/lab/iframe.html?sort=relevance&owners=indiatoday" ></iframe>
```
- Iframe is able to capture information from its query parameters. 
- Iframe is able to send and listen events with host site.

## Query Parameters : 
Although its not mandatory, you can send information as query parameters along with iframe url while iframe is loaded.

| Query Param Name | Type | Description | 
| :---: | :---: | --- |
| sort | string | To select the sorting order for search result as default. You can set as `recent`,`relevance`,`random`. [API reference](https://developers.dailymotion.com/api/#video-sort-filter) |
| owners | string | to add the channels name for search result as default. To put more than 1 you can separate by "," |

## Events : 
With [`cross-window-communication`](https://javascript.info/cross-window-communication) the iframe send events based on interaction inside the iframe. Here is how an event is captured from host page.
```JS
// To capture event when video thumbnail is clicked
window.addEventListener("message",(msg)=>{
  if(msg.data && msg.data.from && msg.data.from==="dm-search-click"){
       console.log(msg.data.info);
  }
})
```
### Events from Iframe :
| Event Name | Information | 
| :---: | :---: |
| `dm-search-click` | ```
{hello: 6}
``` |

