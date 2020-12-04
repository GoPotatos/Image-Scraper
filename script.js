console.log("Ready and loaded")
window.onload=()=>{
    console.log("LOaded",chrome.browserAction);
    const display=document.querySelector("#display");
    chrome.downloads.setShelfEnabled(false);
    
    
    chrome.tabs.query({active:true},tabs=>{
        const tab=tabs[0];
        chrome.tabs.sendMessage(tab.id,"Wassup",res=>{
            console.log("response",res);
            const maxValue=+res.maxValue;
            const src=res.src;
            //const resTitle=res.title;
            //const index=resTitle.indexOf("-");
            //const title=index!==-1?resTitle.replace(/\W+/g,"-").slice(0,index-1):resTitle.replace(/\W+/g,"-");
            const title=res.title;
            const srcComponents=src.match(/.*\/images\/([^/]*).*\?/i)||src.match(/.*\/([^/]*)\.jpg/);
            const directory=srcComponents[1];
            //for(let i=0;i<maxValue;i++){
                //downloadFile(maxValue+1);
                console.log(srcComponents);
                if(maxValue){
                    //console.log("Max value exists");
                    downloadFile(maxValue+1)
                }else{
                    //console.log("Max value doesn't exist");
                    const url=srcComponents[0];
                    const filename="Image Scraper/"+title+"/"+title+".jpg"

                    chrome.downloads.download({url,filename},(done)=>{
                        display.innerHTML="<h3>Done!</h3>"
                        console.log(filename,done,url)
                    });
                }
                function downloadFile(i){
            const url=src.slice(0,srcComponents[0].lastIndexOf("/"))+"/img" +(i).toString().padStart(2,0)+".jpg";
            //const filename="Image Scraper/"+title+"/"+title+(i).toString().padStart(2,0)+".jpg";
            const filename="Image Scraper/"+title+"/"+title+"-"+(i).toString()+".jpg";
            //console.log("filename is ",filename)
            chrome.downloads.download({url,filename},()=>{
                display.innerHTML="<h3>"+(maxValue-i+1)+" files have been downloaded from total of "+(maxValue+1)+"</h3>"
                if(i>0){
                downloadFile(--i);
                }else{
                display.innerHTML="<h3>Done!</h3>"
                }
            });
        }
            //}
        });
    });
}
//chrome.runtime.onUpdate
