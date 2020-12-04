
chrome.runtime.onMessage.addListener((msg,msg2,sendRespose)=>{
    //console.log(msg,msg2);
    const maxValueElement=document.querySelector('[data-testid="slider-handle"]');
    let maxValue=maxValueElement?maxValueElement.getAttribute("aria-valuemax"):0;
    const title=location.pathname.slice(1);
    const response={
        maxValue,
        src:document.querySelector('[data-testid="product-detail-image"]').src,
        title
    }
    sendRespose(response);
    return true;
    
    
});