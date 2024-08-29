# How to embed player from Dailymotion Video Finder 

In this document, we will show steps to embed a player from [Dailymotion Video Finder](https://dmvs-apac.github.io/dm-video-finder-pro-doc/) using different [embed methods](https://developers.dailymotion.com/guides/getting-started-with-web-sdk/#embed-methods).

## Player Embed Script(PES) :

1. **Get video ID**: Capture the event when a video thumbnail is clicked inside the Dailymotion Video Finder and get the video ID.
2. **Create PES with `data-video` attribute**: Create player embed script with `data-video` attribute. Set the value of the data-video to video ID.

```js
// To capture the event when a video thumbnail is clicked
window.addEventListener("message",(msg)=>{
  if(msg.data && msg.data.from && msg.data.from==="dm-search-video-click"){
    const videoid = msg.data.info.id;
    // creating PES script
    const script = document.createElement("script");
    script.src = "https://geo.dailymotion.com/player/{Player ID}.js";
    script.setAttribute("data-video",videoid);

    // append the PES script to the player placeholder
    document.getElementById("playerDiv").appendChild(script);
 }
})
```
> [PES embed demo](https://dmvs-apac.github.io/dm-video-finder-pro-doc/pes_embed.html)
