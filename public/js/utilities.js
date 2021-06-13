
const sections='home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, nY Region, obituaries, opinion, politics, real Estate, science, sports, sunday Review, technology, theater, t-magazine, travel, upshot, uS, world'.split(', ').map(e=>(e.charAt(0).toUpperCase()+e.slice(1)));

const newsTime= function(date){
   //returns the minute and hour of the last news update
   //in case the update is over 24 hours old, the date in the form of mm/dd is added
   const now = new Date();
   const converted = new Date(date);     
   const convertedHours=converted.getHours();
   const convertedMinutes=converted.getMinutes();
   let newsTime=`${("0"+convertedHours).slice(-2)}:${("0"+convertedMinutes).slice(-2)}`;   
   const dayConverted=converted.getDate();
   const monthConverted=converted.getMonth()+1;
   if ((now-converted)>86400000) newsTime+=` - (${("0" + monthConverted).slice(-2)}/${("0" + dayConverted).slice(-2)})`;
   return `<b>[ <i>${newsTime}</i> ]</b> `;
}
//
const iconsUrl=function(modal,url){
   modal.children[0].setAttribute('data-url',url);
   modal.children[1].setAttribute('data-url',url);
   modal.children[2].setAttribute('data-url',url);
}
//
const show={
   more(news){
      news.getElementsByClassName('main')[0].getElementsByClassName('abstract')[0].style.display='block';
      news.getElementsByClassName('share-button-row')[0].style.display='flex';
   },
   less(news){
      news.getElementsByClassName('main')[0].getElementsByClassName('abstract')[0].style.display='none';
      news.getElementsByClassName('share-button-row')[0].style.display='none';
   }  
}

//this is a workaround to hide the footer and keep it to be rendered at the top of the page
const hideFooter = function () {
   const pageFooter = document.getElementsByClassName('page-footer')[0];
   pageFooter.style.display='none';
   setTimeout(()=>{
      pageFooter.style.display='block';
   },8000);

}

export {sections,newsTime,iconsUrl,show,hideFooter};

/*
<footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col s12 footer-name center-children">
            <h5 class="white-text">© 2021 Alisson Ribeiro Loura </h5>            
          </div>          
        </div>
      </div>      
    </footer>
*/