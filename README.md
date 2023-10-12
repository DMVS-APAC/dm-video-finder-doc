# Dailymotion Video Finder Pro

Dailymotion Video Finder Pro is an Iframe-based solution to search videos from given channels(`owners`). The iframe is also able to communicate with the host via [`cross-window-communication`](https://javascript.info/cross-window-communication).

## Basic Information: 
- Iframe URL: https://staging.dmvs-apac.com/SearchIframe/lab/iframe.html

- **Embed Code:**

```html
<iframe src="https://staging.dmvs-apac.com/SearchIframe/lab/iframe.html?sort=relevance&shortFilter=[exclude_channel_ids=tv]&owners=acm-entertainment&suggestion=acm-entertainment,augusta-margaret-river-mail" id="searchIframe"></iframe>
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
| shortFilter | string | To add a checkbox to filter out short videos. Details |

## shortFilter :
The `shortFilter` query param enables to add filters ( API filters ) to get expected videos in search result. It can add more than filters by `","`. like
```
shortFilter=[exclude_channel_ids=tv]
or 
shortFilter=[exclude_channel_ids=tv,longer_than=1]
```
> Category is called channel in API.
> <details>
  <summary> Categoryies</summary>
  | id | name | description |
|---|---|---|
| animals | Animals | Every species of animal video, from funny home videos of LOLcats and cute puppies, to nature TV shows. Learn about animals and their enviroments with National Geographic and more. |
| auto | Cars | The best auto and motorsports videos. Watch dramatic racing clips and crash footage. Check out the latest cars, trucks and motorcycle models, plus parts and accessory reviews. |
| people | Celeb | Your home for exclusive Celebrity video coverage: interviews, paparazzi, red carpet, premieres, fashion, rumors, candid and other special features on People and their lifestyle. |
| fun | Comedy & Entertainment | Watch shows from The WB, NBC and Rooftop Comedy including Family Guy, Simpsons, SNL, and The Daily Show. Web comedy from National Lampoon, My Damn Channel, Jib Jab and more! |
| creation | Creative | Arts, animation, stop-motion, cartoons, and the best independent web videos and short films. |
| school | Education | Videos about your university experience: classes, dorm life, parties, college sports and campus music. Videos from National Lampoon, Sorority Forever and Hooking Up. |
| videogames | Gaming | The latest videos on console and PC gaming. Find reviews, walkthroughs, cheats, official game trailers and machinima. Content from IGN, Game Zombie, THe Escapist and more. |
| kids | Kids | Watch full episodes of your favorite cartoons, movies, and kids videos for all ages. |
| lifestyle | Lifestyle & How-to | Your video destination for design, style and DIY. Watch how-to videos from filmmaking to fashion, creative entertaining to thrifty homemaking. Videos from Gary Vaynerchuk, Threadbanger, Howcast and more. |
| shortfilms | Movies | Shows, movies, and trailers from Hulu, The WB, Fox, HBO and more. Catch some of the hottest shows shortly after they air, plus the latest in blockbusters and independent film. |
| music | Music | Watch music videos, concerts, and interviews from artists in every genre, from hip-hop and rock to indie and electro. Live performances, news and exclusives. |
| news | News | News, politics, world events, pop culture, entertainment and celebrity gossip. Videos from NBC, Fox, and TVGuide. Citizen journalism and web originals from Barely Political, VBS, Young Hollywood and more. |
| sport | Sports | Sports videos from professional, college, and classic league sports. Find football, basketball, baseball, tennis and golf videos, alongside extreme skate, snowboard, surf, ski, wrestling and combat sports clips. |
| tech | Tech | The best science and technology news, discoveries, product reviews, and geek culture. Videos from National Geographic, Revision 3, PBS, Diagonal View, Stuff We Like, News & Encyclopedia Britannica. |
| travel | Travel | Watch and share travel videos from around the world. Explore global destinations, new cultures, vacation spots and local attractions through video. |
| tv | TV | Watch television shows, interviews and documentaries. Dailymotion TV has tons of channels and programs to chose from. |
| webcam | Webcam | Upload your latest rants, raves, songs and opinions, or watch the biggest personalities on Dailymotion sound off on video. |

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
