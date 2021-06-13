import {newsTime} from "./utilities.js";
export default {   
   render(current){
      //contains all elements for a given news
      const news=document.createElement('div');
      //contains the headline with its publishing time and its abstract (hidden when it is not focused) 
      const main=document.createElement('div');
      // separates the headlines and the abstrack from the buttons
      // a divider was chosen because a click on the main div (headline+abstract) works as a 'toggle button' for the focused element (blue when focused), such that a click below the divider line does not change the focus of an element
      const divider=document.createElement('div');
      news.className='news';      
      main.className='main';      
      divider.className='divider';
      //create Title Element
      const title=this.title(current.title,current.updated_date);
      //create abstract title
      const abstract=this.abstract(current.abstract);
      //create read and share buttons row
      const readShare=this.readShare(current.url);
      //appendChildren;
      main.appendChild(title);
      abstract.appendChild(divider);
      main.appendChild(abstract);
      news.appendChild(main);
      news.appendChild(readShare);
      return news;   
   },
   title(text,date){
      //contains the headline preceeded by the updated time
      const div=document.createElement('div');
      div.className='news-title';
      const title=document.createElement('p');
      //the date text comes before the headline
      title.innerHTML=newsTime(date)+text;
      //
      div.appendChild(title);
      return div;
   },
   abstract(text){
      //this is the abstract div, that is only show when the news element has focus (blue)
      const div=document.createElement('div');
      div.className='abstract';
      //create text node
      const abs=document.createElement('p');
      abs.innerHTML=text;
      //append text into div
      div.appendChild(abs);
      return div;
   },
   readShare(url){
      //this is the share button row div 
      const div = document.createElement('div');
      div.className='share-button-row center-children';
      //create share modal Button
      const share = document.createElement('a');
      share.className='modal-trigger center-children';
      //links the button to the modal share element box in the 'main document'
      share.href='#modal1';
      share.innerHTML='Share';
      //create Read Article Link
      const read = document.createElement('a');
      read.className='full-article center-children';
      read.href=url;
      read.target='_blank';
      read.innerHTML='Read Full Article';
      //append buttons
      div.appendChild(share);
      div.appendChild(read);
      return div;
   },   
}