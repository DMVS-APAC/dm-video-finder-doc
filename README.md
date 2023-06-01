# Dailymotion Search Iframe 

Dailymotion Seach Iframe is a Iframe-based solution to search videos from given channels(`owners`). The iframe is also able to communicate with the host via [`cross-window-communication`](https://javascript.info/cross-window-communication).

## Basic Information: 
- Iframe URL: https://google.com

- **Embed Code:**

```html
<iframe src="https://staging.dmvs-apac.com/SearchIframe/lab/iframe.html?sort=relevance&owners=acm-entertainment&suggestion=acm-entertainment,augusta-margaret-river-mail" id="searchIframe"></iframe>
```
- Iframe can capture information from its query parameters. 
- Iframe can send and listen to events with the host site.

## Query Parameters : 
Although it is not mandatory, you can send information as query parameters along with the iframe URL before the iframe is loaded like in the above example.

| Query Param Name | Type | Description | 
| :---: | :---: | --- |
| sort | string | To select the sorting order for search results as default. You can set it as `recent`, `relevance`, or `random`. [API reference](https://developers.dailymotion.com/api/#video-sort-filter) |
| owners | string | To add the channels name for search results as default. To put more than 1 you can separate by "," |
| suggestion | string | To add the suggestion list of channels' names. To put more than 1 you can separate by "," |

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

### Events To Iframe :
The iframe can also listen to events from the host page if any information is required to pass to the iframe. Here is how an event is sent.

```JS
// To add suggestion list of channels
document.getElementById('searchIframe').contentWindow.postMessage( {
     from: "dm-parent-add-suggestion", // event name
     info : ["CHANNEL_NAME_1", "CHANNEL_NAME_2", ...] // array of channel names
},"*");

document.getElementById('searchIframe').contentWindow.postMessage( {
    from: "dm-parent-add-style",
    info : "https://staging.dmvs-apac.com/SearchIframe/lab/custom-style.css"
},"*");
```

| Event Name | Information | 
| :---: | :---: |
| `dm-parent-add-suggestion` | ``` ["CHANNEL_NAME_1", "CHANNEL_NAME_2", ...]``` |
| `dm-parent-add-style` | link address for style. eg.,`https://staging.dmvs-apac.com/SearchIframe/lab/custom-style.css` |

### Test page : 
- https://staging.dmvs-apac.com/SearchIframe/lab/index.html
