class KintypType3Anime extends KinTypBase {
  get bgr_color_top () { return this.getAttribute('bgr_color_top') || "transparent"; }
  get bgr_color_bottom () { return this.getAttribute('bgr_color_bottom') || "transparent"; }
  get border_color_top () { return this.getAttribute('border_color_top') || "transparent"; }
  get border_color_bottom () { return this.getAttribute('border_color_bottom') || "transparent"; }

  //DESIGN PHASE
  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("bgr_color_top", "bgr_color_bottom", "border_color_top", "border_color_bottom");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "bgr_color_top" && oldVal != null){
      document.getElementById("obj_anim3_f3_e"+this.id).style.backgroundColor = newVal;
    }
    else if(attrName === "bgr_color_bottom" && oldVal != null){
      document.getElementById("obj_anim4_f3_e"+this.id).style.backgroundColor = newVal;
    }
    else if(attrName === "border_color_top" && oldVal != null){
      document.getElementById("obj_anim1_f3_e"+this.id).style.borderBottomColor = newVal;
    }
    else if(attrName === "border_color_bottom" && oldVal != null){
      document.getElementById("obj_anim2_f3_e"+this.id).style.borderTopColor = newVal;
    }
  }
  //DESIGN PHASE

  constructor () {
      super();
      
      //create template
      var dataID;
      var wrapTopTmpl = `<div class="kintyp_flex_centered_c" id="obj_anim3_f3_e`+this.id+`" style="position: absolute; background-color: `+this.bgr_color_top+`; bottom: 0px">`;
      var allRows = "";
      while(this.topTexts.length > 0){
        var topText = this.getNode(this.topTexts[0]);
        dataID = topText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        topText.classList.remove("kintyp-top");
        allRows = allRows + `<div class="`+topText.className+` kintyp-top-f3-e`+this.id+`" style="white-space:nowrap;`+ topText.style.cssText+`"`+dataID+`>`+topText.innerHTML+`</div>`;
        this.removeChild(topText);
      }
      wrapTopTmpl = wrapTopTmpl + allRows + `</div>`;
      
      allRows = "";
      var wrapBottomTmpl = `<div class="kintyp_flex_centered_c" id="obj_anim4_f3_e`+this.id+`" style="position: relative; background-color: `+this.bgr_color_bottom+`">`;
      while(this.bottomTexts.length > 0){
        var bottomText = this.getNode(this.bottomTexts[0]);
        dataID = bottomText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        bottomText.classList.remove("kintyp-bottom");
        allRows = allRows + `<div class="`+bottomText.className+` kintyp-bottom-f3-e`+this.id+`" style="white-space:nowrap;`+bottomText.style.cssText+`"`+dataID+`>`+bottomText.innerHTML+`</div>`;
        this.removeChild(bottomText);
      }
      wrapBottomTmpl = wrapBottomTmpl + allRows + `</div>`;
      
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`
      `+this.back_panel+`
          
          <div id="obj_top_cont_f3_e`+this.id+`" style="position: relative">
              <div id="obj_mask_top_f3_e`+this.id+`" style="overflow: hidden; position: absolute; bottom: 0px">`+
                  wrapTopTmpl+`
              </div>
              <div id="obj_anim1_f3_e`+this.id+`" style="box-sizing: content-box; border-bottom-width: 2px; border-bottom-style:solid; border-bottom-color: `+this.border_color_top+`; position: absolute; top: 0px; width: 100%"></div>
          </div>

          <div id="obj_bottom_cont_f3_e`+this.id+`" style="position: relative">
              <div id="obj_mask_bottom_f3_e`+this.id+`" style="overflow: hidden; position: relative;">`+
                  wrapBottomTmpl+`
              </div>
              <div id="obj_anim2_f3_e`+this.id+`" style="width: 100%; border-top-width: 2px; border-top-style:solid; border-top-color: `+this.border_color_bottom+`; position: absolute; top: 0px"></div>            
          </div>
      
      `;
      this.finishConstruction(kintypTmpl);
  }

  handleResize(){
    //calculate sizes
    this.setSizes();
    var objMaskTop = document.getElementById('obj_mask_top_f3_e'+this.id);      
    var objMaskBottom = document.getElementById('obj_mask_bottom_f3_e'+this.id);
    var obj_bottom_cont = document.getElementById('obj_bottom_cont_f3_e'+this.id);
    var obj_top_cont = document.getElementById('obj_top_cont_f3_e'+this.id);
    var obj_anim1 = document.getElementById('obj_anim1_f3_e'+this.id);
    var obj_anim3 = document.getElementById('obj_anim3_f3_e'+this.id);
    
    //init container sizes
    this.style.width = "100%";
    objMaskTop.style.width = "100%";
    obj_top_cont.style.width = "100%";
    objMaskBottom.style.width = "100%";
    obj_bottom_cont.style.width = "100%";
    obj_anim3.style.width = "100%";

    var maxW = 0; var topH = 0; var bottomH = 0;
    var topTexts = document.getElementsByClassName("kintyp-top-f3-e"+this.id);
    var bottomTexts = document.getElementsByClassName("kintyp-bottom-f3-e"+this.id);
    for(var i=0;i<topTexts.length;i++){
        var w = topTexts[i].getBoundingClientRect().width;
        topH+=topTexts[i].getBoundingClientRect().height;
        if(w > maxW) maxW = w;
    }
    for(var i=0;i<bottomTexts.length;i++){
        var w = bottomTexts[i].getBoundingClientRect().width;
        if(w > maxW) maxW = w;
        bottomH+=bottomTexts[i].getBoundingClientRect().height;
    }
    
    //set containers sizes
    objMaskTop.style.width = maxW+"px"; objMaskTop.style.height = "100%"; objMaskBottom.style.width = maxW+"px"; 
    obj_bottom_cont.style.width = maxW+"px"; obj_bottom_cont.style.height = bottomH+"px";
    obj_top_cont.style.width = maxW+"px"; obj_top_cont.style.height = topH+"px";
    obj_anim1.style.height = topH + "px"; obj_anim1.style.width = maxW + "px";
    obj_anim3.style.width = maxW + "px";
    this.style.width = maxW+"px"; this.style.height = (topH+bottomH+2)+"px";
  }
  
  runAnim(){
    //start animation (animejs)
    this.handleResize();
    this.resetAnimObject();
    this.createAnimObject();
    this.animation
      
      .add({
          targets: '#obj_anim1_f3_e'+this.id+', #obj_anim2_f3_e'+this.id,
          width: ['0%', '100%'],
          easing: "easeInSine",
          duration:  this.timeIn/2
      })
      .add({
          targets: '#obj_anim1_f3_e'+this.id,
          top: ['0%', '-100%'],
          easing: "linear",
          duration:  this.timeIn/2
      })
      
      .add({
          targets: '#obj_anim2_f3_e'+this.id,
          top: ['0%', '100%'],
          easing: "linear",
          duration:  this.timeIn/2
      },  this.timeIn/2)

      .add({
        targets: '#kintyp_bgr_'+this.id,
        opacity: [0, 1],
        easing: "linear",
        duration: this.timeIn
      }, 0)
      
      //show texts
      .add({
          targets: '#obj_mask_top_f3_e'+this.id,
          height: ['0%', '100%'],
          easing: "linear",
          duration:  this.timeIn/2
      }, this.timeIn/2)
      .add({
          targets: '#obj_mask_bottom_f3_e'+this.id,
          height: ['0%', '100%'],
          easing: "linear",
          duration:  this.timeIn/2
      }, this.timeIn/2)
	    .add({
	      duration: 1,
	      complete: this.handleAnimInEnd.bind(this)
	    })

	    if(this.hide === "yes"){
      //hide
		    this.animation		
		    .add({
		      duration: this.timeStay,
	        complete: this.handleAnimStayEnd.bind(this)
		    })
	      .add({
	          targets: '#obj_anim3_f3_e'+this.id,
	          bottom: ['0%', '110%'],
	          easing: "easeOutSine",
	          duration:  this.timeOut/2
	      })
	      .add({
	          targets: '#obj_anim4_f3_e'+this.id,
	          top: ['0%', '110%'],
	          easing: "easeOutSine",
	          duration: this.timeOut/2
	      }, '-='+this.timeOut/2)            
	      .add({
	          targets: '#obj_anim1_f3_e'+this.id,
	          left: ['0%', '110%'],
	          easing: "easeInOutSine",
	          duration: this.timeOut/2
	      })
	      .add({
	          targets: '#obj_anim2_f3_e'+this.id,
	          left: ['0%', '-110%'],
	          easing: "easeInOutSine",
	          duration: this.timeOut/2,
	      }, '-='+this.timeOut/2)
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
customElements.define('kintyp-type3-anime', KintypType3Anime);