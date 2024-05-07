var playlisturl = document.querySelector('input');



//37
async function show(){
    const playlistId = playlisturl.value.substring(38);
    const totaltime = [];
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=your_key`);
    const data = await res.json();
    const videos = await data.items;
    

    videos.forEach( async(element) => {
        const videoId = element?.contentDetails?.videoId;
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=your_key`);
        const details = await response.json();
        totaltime.push(details.items[0]?.contentDetails?.duration)
        const div = document.createElement('div');
        const hr = document.createElement('span');
        const mn = document.createElement('span');
        const sec = document.createElement('span');
        const dur = document.createElement('h1');
        const text = details.items[0]?.contentDetails?.duration;
        dur.innerText = text;
        div.appendChild(dur);
        if(text?.length > 8){
            hr.innerText = text.substring(2,3) + ' hours ';
            mn.innerText = text.substring(4,6) + ' minute ';
            sec.innerText = text.substring(7,9) + ' second ';

            const totaltimeinsec = (Number(text.substring(2,3) * 60 * 60 ) + Number(text.substring(4,6) * 60 ) + Number(text.substring(7,9))) + ' seconds ';
            // div.appendChild(hr);
            // div.appendChild(mn);
            sec.innerText = totaltimeinsec;
            div.appendChild(sec);
        }
        
        if(text?.length < 9){
            //5-7 second
            mn.innerText = (Number(text.substring(2,4) * 60 ) + Number(text.substring(5,7))) + ' second ';
            div.appendChild(mn);
        }
        document.body.appendChild(div);
    });

    console.log(totaltime.length)
}


