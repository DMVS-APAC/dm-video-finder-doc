
(()=>{
    const iframeURL = "https://video-finder-pro.dailymotion.com?";
    const defaultParams = {
        sort: "recent",
        shortFilter: "",
        owners: "",
        suggestion:"",
        searchText:""
    };
    const sample = {
        owners: ["australiancommunitymedia"],
        suggestion: [
            "acm-entertainment","augusta-margaret-river-mail","australiancommunitymedia","bay-post-moruya-examiner","beaudesert-times","bega-district-news","bendigo-advertiser","blayney-chronicle","bunbury-mail","busselton-dunsborough-mail","central-western-daily","cowra-guardian","crookwell-gazette","daily-liberal","dungog-chronicle","farm-online","farm-weekly","forbes-advocate","gloucester-advocate","goulburn-post","great-lakes-advocate","hawkesbury-gazette","hunter-valley-news","illawarra-mercury","katherine-times","lithgow-mercury","liverpool-city-champion","mandurah-mail","manning-river-times","milton-ulladulla-times","moree-champion","mudgee-guardian","muswellbrook-chronicle","namoi-valley-independent","naracoorte-herald","newcastle-herald","northern-beaches-review","parkes-champion-post","port-lincoln-times","port-macquarie-news","port-stephens-examiner","queensland-country-life","redland-city-bulletin","south-coast-register","southern-highland-news","stock-and-land","stock-journal","tenterfield-star","the-advertiser-cessnock","the-advocate","the-advocate-hepburn","the-ararat-advertiser","the-area-news","the-armidale-express","the-border-mail","the-canberra-times","the-courier","the-daily-advertiser","the-esperance-express","the-examiner","the-inverell-times","the-irrigator","the-land","the-macleay-argus","the-maitland-mercury","the-murray-valley-standard","the-north-west-star","the-northern-daily-leader","the-queanbeyan-age","the-senior","the-standard","the-times","the-transcontinental","the-wimmera-mail-times","western-advocate","whyalla-news","yass-tribune"
        ],
        shortFilter: "exclude_channel_ids=tv",
        searchText:"football"
    }

    const embedIframe = document.getElementById("embedIframe");
    const applyBtn = document.getElementById("apply");
    const copy = document.getElementById("copy");copy
    const vfpIframe = document.getElementById("vfpIframe");

    
    const searchText = document.getElementById("searchText");
    const shortFilter = document.getElementById("shortFilter");
    const owners = document.getElementById("owners");
    const suggestion = document.getElementById("suggestion");
    const suggestionJs = document.getElementById("suggestionJs");
    const sampleForSuggestion = document.getElementById("sampleForSuggestion");
    const sampleForOnwers = document.getElementById("sampleForOnwers");
    const sampleForShort = document.getElementById("sampleForShort");

    let finaURL = "";

    // -------------Adding events
    document
        .querySelectorAll('input[name="sortFilter"]')
        .forEach((el)=>{
            el.addEventListener("change",()=>{
                defaultParams.sort = el.value;
                updateEmbedCode();
            })
        });
    searchText.addEventListener("input",()=>{
        defaultParams.searchText = searchText.value;
        updateEmbedCode();
    });
    shortFilter.addEventListener("input",()=>{
        defaultParams.shortFilter = shortFilter.value;
        updateEmbedCode();
    });
    owners.addEventListener("input",()=>{
        defaultParams.owners = owners.value;
        updateEmbedCode();
    });
    suggestion.addEventListener("input",()=>{
        defaultParams.suggestion = suggestion.value;
        updateEmbedCode();
    });
    // ---------sample button event
    sampleForSearch.addEventListener("click",()=>{
        searchText.value = sample.searchText;
        searchText.dispatchEvent(new Event('input'));
    });
    sampleForOnwers.addEventListener("click",()=>{
        owners.value = sample.owners;
        owners.dispatchEvent(new Event('input'));
    });
    sampleForSuggestion.addEventListener("click",()=>{
        suggestion.value = sample.suggestion;
        suggestion.dispatchEvent(new Event('input'));
    });
    sampleForShort.addEventListener("click",()=>{
        shortFilter.value = sample.shortFilter;
        shortFilter.dispatchEvent(new Event('input'));
    });
    // --------- javascript embed for suggestion
    suggestionJs.addEventListener("change",()=>{
        updateEmbedCode();
    })
    // Apply button functionality
    applyBtn.addEventListener("click",()=>{
        vfpIframe.src = finaURL;
    });
    // copy button functionality
    copy.addEventListener("click",()=>{
        let text_to_copy = embedIframe.value;
        if (!navigator.clipboard){
            copy.select();
            document.execCommand("copy");
        } else{
            navigator.clipboard.writeText(text_to_copy).then(
                function(){console.log("copied")}
            )
            .catch(
                function() {}
            );
        }
    });
    // -------------Methods
    function updateEmbedCode() {
        const queryParams = 
            (
                defaultParams.sort && defaultParams.sort!=="recent"? 
                `sort=${defaultParams.sort}` : 
                "" 
            )+
            (
                defaultParams.shortFilter ? 
                `&shortFilter=[${defaultParams.shortFilter}]` : 
                "" 
            )+
            (
                defaultParams.searchText ? 
                `&search=${encodeURI(defaultParams.searchText)}` : 
                "" 
            )+
            (defaultParams.owners? `&owners=${defaultParams.owners}` : "" )+
            (defaultParams.suggestion && !suggestionJs.checked? `&suggestion=${defaultParams.suggestion}` : "" )
            ;
        const javascriptCode = suggestionJs.checked ? `
    let suggestion = [${(defaultParams.suggestion.split(",").map(item => `"${item}"`)).join(", ")}];
    
    window.addEventListener("message",(msg)=>{
        if(msg.data.from && msg.data.from==="dm-search-loaded"){
            onIframeReady();
        }
    });
    function onIframeReady(){
        document.getElementById('vfpIframe').contentWindow.postMessage( {
                from: "dm-parent-add-suggestion",
                info : suggestion
        },"*");
    }`:"";

        finaURL = `${iframeURL}${queryParams}`;
        embedIframe.value = `<iframe id="vfpIframe" src="${finaURL}" ></iframe>${javascriptCode? `
            
<script>${javascriptCode}
</script>`: ""}`

    }

    
    // work on iframe
    window.addEventListener("message",(msg)=>{
        if(msg.data.from && msg.data.from==="dm-search-loaded"){
            onIframeReady();
        }
    });
    function onIframeReady(){
        if(suggestionJs.checked){
            window.suggestionList = defaultParams.suggestion.split(",")
            vfpIframe
                .contentWindow.postMessage({
                    from: "dm-parent-add-suggestion",
                    info : window.suggestionList
                },"*");

        }
    }


    updateEmbedCode();
    applyBtn.click();
})()
