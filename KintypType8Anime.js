class KintypType8Anime extends KinTypBase {
  get main_color () { return this.getAttribute('main_color') || "#ffffff"; }

  //DESIGN PHASE
  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("main_color");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "main_color" && oldVal != null){
      document.getElementById("obj_rotate_bottom_f8_e"+this.id).style.backgroundColor = newVal;
    }
  }
  //DESIGN PHASE
  

  constructor () {
      super();

      var dataID;
      var wrapTopTmpl = ``;
      while(this.topTexts.length > 0){
        var topText = this.getNode(this.topTexts[0]);
        dataID = topText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        topText.classList.remove("kintyp-top");
        wrapTopTmpl = wrapTopTmpl + `<div class="`+topText.className+` kintyp-top-f8-e`+this.id+`" style="position: relative; white-space:nowrap;`+topText.style.cssText+`"`+dataID+`>`+topText.innerHTML+`</div>`;
        this.removeChild(topText);
      }

      var wrapBottomTmpl = ``;
      while(this.bottomTexts.length > 0){
        var bottomText = this.getNode(this.bottomTexts[0]);
        dataID = bottomText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        bottomText.classList.remove("kintyp-bottom");
        wrapBottomTmpl = wrapBottomTmpl + `<div class="`+bottomText.className+` kintyp-bottom-f8-e`+this.id+`" style="position: relative; white-space:nowrap;`+bottomText.style.cssText+`"`+dataID+`>`+bottomText.innerHTML+`</div>`;
        this.removeChild(bottomText);
      }
      //create template
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`
      `+this.back_panel+`

        <div id="obj_translate_top_f8_e`+this.id+`" style="position: relative; overflow: hidden">
            <div id="obj_top_f8_e`+this.id+`" class="kintyp_flex_centered_c"  style="position: relative;">`+
                wrapTopTmpl+`
            </div>
        </div>

        <div id="obj_bottom_perspective_f8_e`+this.id+`">
            <div id="obj_rotate_bottom_f8_e`+this.id+`" style="transform-origin: 0% 0%; position: relative; overflow: hidden; background-color: `+this.main_color+`;">
                <div id="obj_bottom_f8_e`+this.id+`" class="kintyp_flex_centered_c"  style="position: relative;">`+
                  wrapBottomTmpl+`
                </div>
            </div>
        </div>`;

      this.finishConstruction(kintypTmpl);
  }


  handleResize(){
    //calculate sizes      
    this.setSizes();
    var objW = 0; var objTopH = 0; var objBottomH = 0;

    var textsTop = document.getElementsByClassName("kintyp-top-f8-e"+this.id);
    for(var i=0;i<textsTop.length;i++){
        var textTop = textsTop[i];
        var w = textTop.getBoundingClientRect().width;
        var h = textTop.getBoundingClientRect().height;
        if(w > objW) objW = w;
        objTopH+=h;
    }
    var textsBottom = document.getElementsByClassName("kintyp-bottom-f8-e"+this.id);
    for(var i=0;i<textsBottom.length;i++){
        var textBottom = textsBottom[i];
        var w = textBottom.getBoundingClientRect().width;
        var h = textBottom.getBoundingClientRect().height;
        if(w > objW) objW = w;
        objBottomH+=h;
    }

    var obj_top = document.getElementById('obj_top_f8_e'+this.id);
    obj_top.style.width = objW + "px"; obj_top.style.height = objTopH + "px";
    var obj_translate_top = document.getElementById('obj_translate_top_f8_e'+this.id);
    obj_translate_top.style.width = objW + "px"; obj_translate_top.style.height = objTopH + "px";

    var obj_bottom = document.getElementById('obj_bottom_f8_e'+this.id);
    obj_bottom.style.width = objW + "px"; 
    obj_bottom.style.height = objBottomH + "px";
    var obj_bottom_perspective = document.getElementById('obj_bottom_perspective_f8_e'+this.id);
    obj_bottom_perspective.style.perspective = objW*2+"px";
    var obj_rotate_bottom = document.getElementById('obj_rotate_bottom_f8_e'+this.id);
    obj_rotate_bottom.style.width = objW + "px"; obj_rotate_bottom.style.height = objBottomH + "px";
    

    this.style.width = objW + "px"; this.style.height = objTopH + objBottomH + "px";
    this.style.overflow = "visible";
  }
  
  runAnim(){
    //start animation (animejs)
    this.handleResize();
    this.resetAnimObject();
    this.createAnimObject();
    this.animation
    .add({
        targets: '#obj_rotate_bottom_f8_e'+this.id,
        opacity: [0.5,1],
        rotateY: ['-90deg', '-0deg'],
        easing: "linear",
        duration: this.timeIn/2,
    })
    .add({
        targets: '#obj_top_f8_e'+this.id,
        top: ['100%', '0%'],
        easing: "easeOutSine",
        duration: this.timeIn/2,
    }, this.timeIn/4)
    
    .add({
        targets: '#obj_bottom_f8_e'+this.id,
        left: ['-100%', '0%'],
        easing: "spring",
        duration: this.timeIn/2,
    }, this.timeIn/2)
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
	        targets: '#obj_top_f8_e'+this.id,
	        top: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: this.timeOut/2,
	    })
	    .add({
	        targets: '#obj_bottom_f8_e'+this.id,
	        left: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: this.timeOut/2,
	    }, "-="+this.timeOut/2)
	    .add({
	        targets: '#obj_rotate_bottom_f8_e'+this.id,
	        left: ['0%', '100%'],
	        width: ['100%', '0%'],
	        easing: "easeInSine",
	        duration: this.timeOut/2,
	    })
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
customElements.define('kintyp-type8-anime', KintypType8Anime);