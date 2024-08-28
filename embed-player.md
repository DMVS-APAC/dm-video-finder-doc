# How to embed player from Dailymotion Video Finder 

In this document, we will show steps to embed player from [Dailymotion Video Finder](https://dmvs-apac.github.io/dm-video-finder-pro-doc/) using different [embed methods](https://developers.dailymotion.com/guides/getting-started-with-web-sdk/#embed-methods).

## Player Embed Script(PES) :

*1. Get video id *
Capture the event when a video thumbnail is clicked inside the Dailymotion Video Finder and get the video id.
*2. Create PES with `data-video` attribute *
Create player embed script with `data-video` attribute. Set the value of data-video to `videoid`.

```js
// To capture the event when a video thumbnail is clicked
window.addEventListener("message",(msg)=>{
  if(msg.data && msg.data.from && msg.data.from==="dm-search-click"){
       let videoid = msg.data.info.id;
       let script = document.createElement
  }
})
```
