class KintypType2Anime extends KinTypBase {
  get main_color () { return this.getAttribute('main_color') || "none"; }

  //DESIGN PHASE
  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("main_color");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "main_color" && oldVal != null){
      document.getElementById("obj_border_f2_e"+this.id).style.backgroundColor = newVal;
    }
  }
  //DESIGN PHASE


  constructor () {
      super();
      //create template
      var dataID;
      var wrapTopTmpl = `<div id="obj_anim1_f2_e`+this.id+`" class="kintyp_flex_centered_c" style="position: relative;">`;
      var oneRow = ""; var the_style = "";
      while(this.topTexts.length > 0){
        var topText =  this.getNode(this.topTexts[0]);
        dataID = topText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        topText.classList.remove("kintyp-top");
        the_style = topText.style.cssText;
        if(the_style) the_style = ' style="'+the_style+'"';
        oneRow = `<div id='span_top_text_f2_e`+this.id+`' class="`+topText.className+`"`+dataID+the_style+`>`+topText.innerHTML+`</div>`;
        this.removeChild(topText);
      }
      wrapTopTmpl = wrapTopTmpl + oneRow + `</div>`;
      
      var wrapBottomTmpl = `<div id="obj_anim2_f2_e`+this.id+`" class="kintyp_flex_centered_c" style="position: relative;">`;
      while(this.bottomTexts.length > 0){
        var bottomText =  this.getNode(this.bottomTexts[0]);
        dataID = bottomText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        bottomText.classList.remove("kintyp-bottom");
        the_style = bottomText.style.cssText;
        if(the_style) the_style = ' style="'+the_style+'"';
        oneRow = `<div id='span_bottom_text_f2_e`+this.id+`' class="`+bottomText.className+`"`+dataID+the_style+`>`+bottomText.innerHTML+`</div>`;
        this.removeChild(bottomText);
      }
      wrapBottomTmpl = wrapBottomTmpl + oneRow + `</div>`;
      
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`
        `+this.back_panel+`
          <div id="obj_cont_top_f2_e`+this.id+`" style="overflow: hidden; position: relative">`+
              wrapTopTmpl+`
          </div>
          <div id="obj_border_f2_e`+this.id+`" class="oh_0_4" style="position: relative; width: 100%; background-color: `+this.main_color+`;"></div>
          <div id="obj_cont_bottom_f2_e`+this.id+`" style="overflow: hidden; position: relative">`+
              wrapBottomTmpl+`
          </div>
      `;
      this.finishConstruction(kintypTmpl);
  }
  


  handleResize(){
      this.setSizes();
      //reset containers sizes
      this.style.width = "100%"; this.style.height = "100%";
      var objTextTop = document.getElementById('obj_cont_top_f2_e'+this.id);      
      var objTextBottom = document.getElementById('obj_cont_bottom_f2_e'+this.id);
      objTextTop.style.width = "100%";
      objTextBottom.style.width = "100%";
      
      //calculate size of content elements
      var textSizesTop = document.getElementById('span_top_text_f2_e'+this.id);      
      var textSizesBottom = document.getElementById('span_bottom_text_f2_e'+this.id);
      var w = textSizesTop.offsetWidth;     
      w = Math.max(w, textSizesBottom.offsetWidth)+2;
      var hTop = textSizesTop.offsetHeight; var hBottom = textSizesBottom.offsetHeight;
      var hMiddle =  document.getElementById('obj_border_f2_e'+this.id).offsetHeight;

      //set sizes of containers
      objTextTop.style.width = w+"px"; objTextTop.style.height = hTop+"px";
      objTextBottom.style.width = (w)+"px"; objTextBottom.style.height = hBottom+"px";

      //set size of whole object
      var h = hTop+hMiddle+hBottom;
      this.style.width = (w)+"px"; this.style.height = h+"px"; 

      this.updateParent(this.style.height);
  }
  
  runAnim(){
    //start animation (animejs library)
    this.handleResize();    
    this.resetAnimObject();
    this.createAnimObject();
    this.animation
    .add({
        targets: '#obj_border_f2_e'+this.id,
        width: ['0%', '100%'],
        easing: "easeInOutQuad",
        duration: this.timeIn
    })
    .add({
        targets: '#obj_anim1_f2_e'+this.id,
        top: ['100%', '0%'],
        easing: "linear",
        duration: 3/4*this.timeIn
    }, '-='+3/4*this.timeIn)
    .add({
        targets: '#obj_anim2_f2_e'+this.id,
        top: ['-100%', '0%'],
        easing: "easeInSine",
        duration: 3/4*this.timeIn,
    }, '-='+3/4*this.timeIn)
    .add({
      targets: '#kintyp_bgr_'+this.id,
      opacity: [0, 1],
      easing: "linear",
      duration: this.timeIn
    }, 0)
    .add({
      duration: 1,
      complete: this.handleAnimInEnd.bind(this)
    })
    
    if(this.hide === "yes"){
	    this.animation		
    
	    .add({
	      duration: this.timeStay,
        complete: this.handleAnimStayEnd.bind(this)
	    })
	    .add({
	        targets: '#obj_anim1_f2_e'+this.id,
	        top: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: 3/8*this.timeOut,
	    })
	    .add({
	        targets: '#obj_anim2_f2_e'+this.id,
	        top: ['0%', '-100%'],
	        easing: "easeInSine",
	        duration: 3/8*this.timeOut,
	    }, '-='+1/4*this.timeOut)
	    .add({
	        targets: '#obj_border_f2_e'+this.id,
	        width: ['100%', '0%'],
	        left: ['0%', '50%'],
	        easing: "easeInOutQuad",
	        duration: 3/4*this.timeOut,
	    }, '-='+1/4*this.timeOut) 
      .add({
        duration: this.wait,
        complete: this.handleAllAnimEnd.bind(this)
      })
	    .add({
	      targets: '#kintyp_bgr_'+this.id,
	      opacity: [1, 0],
	      easing: "linear",
	      duration: this.timeOut
	    }, "-="+this.timeOut)
	    .pause();
    }
    else{
	    this.animation    
      .add({
        duration: this.wait,
        complete: this.handleAllAnimEnd.bind(this)
      })
      .pause();
    }
	    
	    
	    
  }
}
customElements.define('kintyp-type2-anime', KintypType2Anime);