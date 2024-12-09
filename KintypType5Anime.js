class KintypType5Anime extends KinTypBase {
  get bgr_color_top () { return this.getAttribute('bgr_color_top') || "transparent"; }
  get bgr_color_bottom () { return this.getAttribute('bgr_color_bottom') || "transparent"; }

  //DESIGN PHASE
  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("bgr_color_top", "bgr_color_bottom");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "bgr_color_top" && oldVal != null){
      document.getElementById('obj_top_f5_e'+this.id).style.backgroundColor = newVal;
    }
    else if(attrName === "bgr_color_bottom" && oldVal != null){
      document.getElementById('obj_mask_bottom_f5_e'+this.id).style.backgroundColor = newVal;
    }
  }
  //DESIGN PHASE

  constructor () {
      super();
      //create template
      var dataID;
      var wrapTopTmpl = ``;
      var allRows = "";
      while(this.topTexts.length > 0){
        var topText = this.getNode(this.topTexts[0]);
        dataID = topText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        topText.classList.remove("kintyp-top");
        allRows = allRows + `<div class="`+topText.className+`" style="white-space:nowrap;`+topText.style.cssText+`"`+dataID+`>`+topText.innerHTML+`</div>`;
        this.removeChild(topText);
      }
      wrapTopTmpl = allRows;
      
      allRows = "";      
      var wrapBottomTmpl = ``;
      while(this.bottomTexts.length > 0){
        var bottomText = this.getNode(this.bottomTexts[0]);
        dataID = bottomText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        bottomText.classList.remove("kintyp-bottom");
        allRows = allRows + `<div class="`+bottomText.className+`" style="white-space:nowrap;`+bottomText.style.cssText+`"`+dataID+`>`+bottomText.innerHTML+`</div>`;
        this.removeChild(bottomText);
      }
      wrapBottomTmpl = allRows;
      
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`          
      `+this.back_panel+`
          <div id="obj_mask_top_f5_e`+this.id+`" style="overflow: hidden; position: relative">
              <div id="obj_top_f5_e`+this.id+`" class="kintyp_flex_left_c" style="position: relative; top: 0%; left: 0%; padding-left: 10%; ; background-color: `+this.bgr_color_top+`">`+
                  wrapTopTmpl+`
              </div>
          </div>
          <div id="obj_mask_bottom_f5_e`+this.id+`" style="overflow: hidden; position: relative; background-color: `+this.bgr_color_bottom+`">
            <div id="obj_bottom_f5_e`+this.id+`" class="kintyp_flex_left_c"  style="position: relative; left: 0%; padding-left: 10%;">`+
                  wrapBottomTmpl+`
            </div>
          </div>      
      `;

      this.finishConstruction(kintypTmpl);
  }
  handleResize(){
    //calculate sizes
    this.setSizes();
    var obj_mask_top_f5 = document.getElementById('obj_mask_top_f5_e'+this.id);
    var obj_top_f5 = document.getElementById('obj_top_f5_e'+this.id);
    var h = obj_top_f5.getBoundingClientRect().height;
    obj_mask_top_f5.style.height = h+"px";
    var obj_bottom_f5 = document.getElementById('obj_bottom_f5_e'+this.id);
    h += obj_bottom_f5.getBoundingClientRect().height;
    this.style.height = h + "px";
    this.updateParent(this.style.height);
  }
  
  runAnim(){
    //start animation (animejs)
    this.handleResize();
    this.resetAnimObject();
    this.createAnimObject();
    this.animation
      
      .add({
          targets: '#obj_mask_bottom_f5_e'+this.id,
          left: ['-100%', '0%'],
          easing: "easeOutCubic",
          duration: this.timeIn/2
      })
      .add({
          targets: '#obj_top_f5_e'+this.id,
          top: ['100%', '0%'],
          easing: "easeOutSine",
          duration: this.timeIn/2
      }, "-="+this.timeIn/4)
      .add({
          targets: '#obj_bottom_f5_e'+this.id,
          left: ['-100%', '0%'],
          easing: "easeOutCubic",
          duration: this.timeIn/2
      }, "-="+this.timeIn/4)
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
	          targets: '#obj_top_f5_e'+this.id,
	          top: ['0%', '100%'],
	          easing: "easeInSine",
	          duration: this.timeOut/2,
	      })
	      .add({
	          targets: '#obj_bottom_f5_e'+this.id,
	          left: ['0%', '-50%'],
	          easing: "easeInSine",
	          duration: this.timeOut/2,
	      }, "-="+this.timeOut/4)
	      .add({
	          targets: '#obj_mask_bottom_f5_e'+this.id,
	          left: ['0%', '-110%'],
	          easing: "easeInSine",
	          duration: this.timeOut/2,
	      }, "-="+this.timeOut/4)
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

customElements.define('kintyp-type5-anime', KintypType5Anime);