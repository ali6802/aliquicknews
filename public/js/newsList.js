import {sections, iconsUrl, show, hideFooter} from "./utilities.js";
import element from "./renderNewElement.js";
export default {
   //stores the current news section show on the homepage. Its default value is 'home'
   section:'home',
   //it stores the array of news fetched from the NYT api
   newsOutput:[],
   //the element with focus is selected with a single click or touch
   hasFocus:null,   
   loadPage(){
      
      //Loads a list of news sections on the sidenav
      this.sideNavInit();
      //Avoids the footer to be rendered at the top of the page
      hideFooter();
      //renders the web page according to the current section      
      this.update();   
   },
   async update(){
      
      try {
         //Fetches an array of news from the server
         const url = `/api?section=${this.section}`;
         this.newsOutput = await fetch(url).then(resp=>resp.json())         
         .then(resp=>resp.results)
         //renders the array of news on the home page
         const render=this.render();
         const newsBox=document.getElementById('news-box');
         newsBox.appendChild(render);              
      }
      catch (error) {
         console.error(error)        
      }                   
   },
   //After finishing the project, I realized an easier way to render the content. 
   render(){
      //Contains the list of news to be appended on the homepage     
      const newsList= document.createElement('div');
      newsList.className='news-list row';
      newsList.id='news-list';
      //      
      this.newsOutput.reduce((accum,current,index)=>{
         //the array of news is split into two divs
         //two columns,or two group of divs, are rendered on big screen (desktop and big tablets), whereas a single column in mobile devices
         if(index===0||Math.floor(this.newsOutput.length/2+1)===index){
            //a new container is created. It stores half of the newsOutput array elements
            const container = document.createElement('div');
            const col = document.createElement('div');
            container.className='container';
            col.className='col l6 m12';
            col.appendChild(container);
            newsList.appendChild(col);
            //news will be appended into this container
            accum=container;            
         };
         //the social media icons of the modal box
         const icons=document.getElementById('social-media-icons');
         //render news element
         const news=element.render(current,this.hasFocus);
         //creates an id for each news element
         news.id=`n${index+1}`;
         //the 'has focus toggle button' shows the abstract and the share buttons the element has focus (blue) and hide when it does not has focus
         news.getElementsByClassName('main')[0].onclick=(e)=>{
            if(this.hasFocus===null){
               //the click event assigns the 'has focus' property to the element
               this.hasFocus=news.id;
               //check main.css for more info
               news.className='news has-focus';
               //asigns the url the focused news element to the social media icons in the modal box
               iconsUrl(icons,current.url);
               //literally the toggle button that shows the abstract and the share button row when the element has focus
               show.more(news);
            } else if (this.hasFocus===news.id) {
               //when the element already has focus and receives a click event, it loses the has Focus status, like a toggle button.
               //the hasFocus atribute becomes null since it is only allowed one focused element at time
               news.className='news';
               show.less(news);
               //removes the news element url from the social media icons on the modal box
               iconsUrl(icons,null);
               this.hasFocus=null;
            } else {
               //This is a transition variable. Receives the element id that has the current 'has focus' attribute
               const formerFocus=document.getElementById(this.hasFocus);
               formerFocus.className='news';
               //the element that previously has the 'has focus' attribute pass trough the show.less function, which hides the abstract, the share button row and the collor blue
               show.less(formerFocus);
               //the element that received the click event now receives the 'has focus' atribute
               news.className='news has-focus';
               //the element pass through the show.more function, which shows the abstract, the share button row and assigns the color blue
               this.hasFocus=news.id;
               iconsUrl(icons,current.url);
               show.more(news);
            }
         }         
         accum.appendChild(news);
         return accum;
      },"");
      return newsList;      
   },
   sideNavInit(){
      //The list of news section is shown as a list on the side nav
      const sideNavList=document.getElementById('side-nav-list');
      //Sections (Subjects) according to the NYT home page
      sections.forEach((section)=>{
         const li=document.createElement('li');
         const a=document.createElement('a');
         a.href="#";
         a.innerHTML=section;
         li.onclick=(e)=>{
            document.getElementById('sn-button').innerHTML=section;
            //transform the section name shown on the side nav to the respective variable that later is used on to fetch the array of news from the NYT api.
            this.section=section.replace(/\s/g, '').toLowerCase();            
            //
            document.getElementById('news-list').remove();
            //updates the home page
            //Avoids the footer to be rendered at the top of the page
            hideFooter();
            this.update();         
         };
         li.appendChild(a);
         sideNavList.appendChild(li);   
      });
   },   
}