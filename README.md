# Dailymotion Video Finder

Dailymotion Video Finder Pro is an Iframe-based solution to search videos from given channels(`owners`). The iframe is also able to communicate with the host via [`cross-window-communication`](https://javascript.info/cross-window-communication).

## Basic Information: 
- Iframe URL: https://video-finder-pro.dailymotion.com/

- **Embed Code:**

```html
<iframe src="https://video-finder-pro.dailymotion.com?sort=relevance&owners=acm-entertainment&suggestion=acm-entertainment,augusta-margaret-river-mail" id="searchIframe"></iframe>

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
| shortFilter | string | To add a checkbox to filter out short videos. [Details](#shortfilter) |
| theme | string | To set theme. you can set it `dark`. By default it has `light` theme |

## shortFilter:
The `shortFilter` query param enables the addition of filters ( [API filters](https://developers.dailymotion.com/api/#video-filters) ) to get expected videos in search results. It also creates a checkbox in UI to control searching. It can add more than 1 filter by adding a "," between values. like
```
shortFilter=[exclude_channel_ids=tv]
or 
shortFilter=[exclude_channel_ids=tv,longer_than=1]
```
> Category is called [channel in API]((https://api.dailymotion.com/channels)).
<details>
<summary> Category IDs and names based on API </summary>

  
| Channnel ID        | Category name                   |
|------------|------------------------|
| animals    | Animals                |
| auto       | Cars                   |
| people     | Celeb                  |
| fun        | Comedy & Entertainment |
| creation   | Creative               |
| school     | Education              |
| videogames | Gaming                 |
| kids       | Kids                   |
| lifestyle  | Lifestyle & How-to     |
| shortfilms | Movies                 |
| music      | Music                  |
| news       | News                   |
| sport      | Sports                 |
| tech       | Tech                   |
| travel     | Travel                 |
| tv         | TV                     |
| webcam     | Webcam                 |

</details>

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
| `dm-search-loaded` | To inform iframe is loaded. It can be used as a start point to sent event into iframe. |
| `dm-search-click` | ``` {id:{VIDOE_ID}, thumbnail_480_url:{VIDEO_THUMBNAIL}, duration:{VIDEO_DURATION}}``` |

### Events To Iframe :
The iframe can also listen to events from the host page if any information is required to pass to the iframe. Here is how an event is sent.

```JS
// To add suggestion list of channels
document.getElementById('searchIframe').contentWindow.postMessage( {
     from: "dm-parent-add-suggestion", // event name
     info : ["CHANNEL_NAME_1", "CHANNEL_NAME_2", ...] // array of channel names
},"*");
```

| Event Name | Information | 
| :---: | :---: |
| `dm-parent-add-suggestion` | ``` ["CHANNEL_NAME_1", "CHANNEL_NAME_2", ...]``` |

### Test page : 
- [Demo Page](https://dmvs-apac.github.io/dm-video-finder-pro-doc/lab.html)
- [Demo Page(ACM use case with dark theme)](https://dmvs-apac.github.io/dm-video-finder-pro-doc/lab_acm.html)
- [VFP playground](https://dmvs-apac.github.io/dm-video-finder-pro-doc/vfp-studio/vfp-studio.html)
