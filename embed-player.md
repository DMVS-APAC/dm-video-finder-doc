# How to embed player from Dailymotion Video Finder 

In this document, we will show steps to embed a player from [Dailymotion Video Finder](https://dmvs-apac.github.io/dm-video-finder-pro-doc/) using different [embed methods](https://developers.dailymotion.com/guides/getting-started-with-web-sdk/#embed-methods).

## Player Embed Script(PES) :

1. **Add placeholder for the player** : Add a `div` placeholder on the page where you want the player.
2. **Get video ID**: Capture the event when a video thumbnail is clicked inside the Dailymotion Video Finder and get the video ID.
3. **Create PES with `data-video` attribute**: Create player embed script with `data-video` attribute. Set the value of the data-video to video ID. Append the script to placeholder `div`.

```html
<!-- Player placeholder -->
<div id="my-dailymotion-player"> My Player placeholder </div>

<script>
  // To capture the event when a video thumbnail is clicked
  window.addEventListener("message",(msg)=>{
    if(msg.data && msg.data.from && msg.data.from==="dm-search-video-click"){
      const videoid = msg.data.info.id;
      // creating PES script
      const script = document.createElement("script");
      script.src = "https://geo.dailymotion.com/player/{Player ID}.js";
      script.setAttribute("data-video",videoid);

      // append the PES script to the player placeholder
      document.getElementById("my-dailymotion-player").appendChild(script);
    }
  })
</script>
```
> [PES embed demo](https://dmvs-apac.github.io/dm-video-finder-pro-doc/pes_embed.html)

## Player Library Script(PLS) :

1. **Add the Player library script to your HTML page** : Add the library script within the `<body>` section of the page to get access of Platform API.
2. **Add placeholder for the player** : Add a `div` placeholder on the page where you want the player.
3. **Get video ID**: Capture the event when a video thumbnail is clicked inside the Dailymotion Video Finder and get the video ID.
4. **Create the Player using the Platform API**: Use the `createPlayer()` method and pass in the assigned container id to initialize the player and specify the video ID.

```html
<!-- PLS script -->
<script src="https://geo.dailymotion.com/libs/player/{Player ID}.js"></script>

<!-- Player placeholder -->
<div id="my-dailymotion-player"> My Player placeholder </div>

<script>
  
  // To capture the event when a video thumbnail is clicked
  window.addEventListener("message",(msg)=>{
    if(msg.data && msg.data.from && msg.data.from==="dm-search-video-click"){
      const videoid = msg.data.info.id;
      // create the player
      dailymotion
        .createPlayer("my-dailymotion-player", {
        video: videoid,
      })
      .then((player) => console.log(player))
      .catch((e) => console.error(e));
    }
  })
    
</script>
```
> [PLS embed demo](https://dmvs-apac.github.io/dm-video-finder-pro-doc/pls_embed.html)
