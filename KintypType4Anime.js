class KintypType4Anime extends KinTypBase {
  get border_size () { return this.getAttribute('border_size') || "1"; }
  get border_color () { return this.getAttribute('border_color') || "#ffffff"; }
  get bgr_color () { return this.getAttribute('bgr_color') || "#ffffff"; }
  get txt_color_below () { return this.getAttribute('txt_color_below') || "#ffffff"; }
  get txt_color_above () { return this.getAttribute('txt_color_above') || "#000000"; }
  get border_radius () { return this.getAttribute('border_radius') || "0"; }

  //DESIGN PHASE
  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("border_size", "border_color", "bgr_color", "txt_color_below", "txt_color_above", "border_radius");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "border_size" && oldVal != null){
      document.getElementById("obj_line_f4_e"+this.id).style.borderBottomWidth = newVal+"px";
    }
    else if(attrName === "border_color" && oldVal != null){
      document.getElementById("obj_line_f4_e"+this.id).style.borderBottomColor = newVal;
    }
    else if(attrName === "bgr_color" && oldVal != null){
      document.getElementById("obj_anim4_f4_e"+this.id).style.backgroundColor = newVal;
    }
    else if(attrName === "txt_color_below" && oldVal != null){
      var changeObj = this.getElementsByClassName("kintyp-f4-e"+this.id);
      for(var i=0;i<changeObj.length;i++){
        changeObj[i].style.color = newVal;
      }  
    }
    else if(attrName === "txt_color_above" && oldVal != null){
      var changeObj = this.getElementsByClassName("kintyp-f4-above-e"+this.id);
      for(var i=0;i<changeObj.length;i++){
        changeObj[i].style.color = newVal;
      }  
    }
    else if(attrName === "border_radius" && oldVal != null){
      this.handleResize();
    }
  }
  //DESIGN PHASE

  
  constructor () {
      super();      
      //create template

      var dataID;
      var belowTexts = this.getElementsByClassName("kintyp");
      var wrapBelowTmpl = `<div class="kintyp_flex_centered_c" id="obj_anim3_f4_e`+this.id+`" style="position: absolute; bottom: 0px;">`;
      var allRows = "";
      for(var i=0; i<belowTexts.length;i++){
        var belowText = this.getNode(belowTexts[i]);
        dataID = belowText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        var theClass = String(belowText.className); theClass = theClass.replace("kintyp", "");
        allRows = allRows + `<div class="`+theClass+` kintyp-f4-e`+this.id+`" style="white-space:nowrap; color: `+this.txt_color_below+`"`+dataID+`>`+belowText.innerHTML+`</div>`;
      }
      wrapBelowTmpl = wrapBelowTmpl + allRows + `</div>`;
      
      allRows = "";
      var aboveTexts = this.getElementsByClassName("kintyp");
      var wrapAboveTmpl = `<div class="kintyp_flex_centered_c" id="obj_anim4_f4_e`+this.id+`" style="position: relative; background-color: `+this.bgr_color+`;">`;
      while(aboveTexts.length > 0){
        var aboveText = this.getNode(aboveTexts[0]);
        dataID = aboveText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        aboveText.classList.remove("kintyp");
        allRows = allRows + `<div class="`+aboveText.className+` kintyp-f4-above-e`+this.id+`" style="white-space:nowrap; color: `+this.txt_color_above+`"`+dataID+`>`+aboveText.innerHTML+`</div>`;
        this.removeChild(aboveText);
      }
      wrapAboveTmpl = wrapAboveTmpl + allRows + `</div>`;
      
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`
          <div id="obj_below_cont_f4_e`+this.id+`" style="position: absolute">
              <div id="obj_below_mask_f4_e`+this.id+`" style="overflow: hidden; position: absolute; bottom: 0px">`+
                  wrapBelowTmpl+`
              </div>
              <div id="obj_line_f4_e`+this.id+`" style="border-bottom-width: `+this.border_size+`px; border-bottom-style: solid; border-bottom-color: `+this.border_color+`; position: absolute; top: 0px; height: 100%"></div>
          </div>

          <div id="obj_above_cont_f4_e`+this.id+`" style="position: relative;">
              <div id="obj_above_mask_f4_e`+this.id+`" style="overflow: hidden; position: relative">`+
                  wrapAboveTmpl+`
              </div>
          </div>
      
      `;
      this.finishConstruction(kintypTmpl);
  }
  
  handleResize(){
    //calculate sizes
    this.setSizes();
    this.style.borderRadius = Number(this.border_radius)*this.ratio+"vw";
    var obj = document.getElementById("obj_anim3_f4_e"+this.id);
    obj.style.borderRadius = Number(this.border_radius)*this.ratio+"vw";
    obj = document.getElementById("obj_anim4_f4_e"+this.id);
    obj.style.borderRadius = Number(this.border_radius)*this.ratio+"vw";


    var maxW = 0; var h = 0;
    var texts = this.getElementsByClassName("kintyp-f4-e"+this.id);
    for(var i=0;i<texts.length;i++){
        var w = texts[i].getBoundingClientRect().width;
        h+=texts[i].getBoundingClientRect().height;
        if(w > maxW) maxW = w;
    }
    var obj_below_cont = document.getElementById('obj_below_cont_f4_e'+this.id);
    var obj_above_cont = document.getElementById('obj_above_cont_f4_e'+this.id);      
    var obj_below_mask = document.getElementById('obj_below_mask_f4_e'+this.id);
    var obj_above_mask = document.getElementById('obj_above_mask_f4_e'+this.id);      
    
    this.style.width = "100%";
    obj_below_cont.style.width = "100%";
    obj_above_cont.style.width = "100%";
    obj_below_mask.style.width = "100%";
    obj_above_mask.style.width = "100%";

    obj_below_mask.style.width = maxW+"px"; 
    obj_above_mask.style.width = maxW+"px"; 
    obj_below_cont.style.width = maxW+"px"; obj_below_cont.style.height = h+"px";
    obj_above_cont.style.width = maxW+"px"; obj_above_cont.style.height = h+"px";
    this.style.width = maxW+"px"; this.style.height = (h+4)+"px";
  }
  
  runAnim(){
    //start animation (animejs)
    this.handleResize();
    this.resetAnimObject();
    this.createAnimObject();

    anime.set('#obj_above_mask_f4_e'+this.id, { height: "0%" });
    
    this.animation
      .add({
          targets: '#obj_line_f4_e'+this.id,
          width: ['0%', '100%'],
          easing: "easeInSine",
          duration: this.timeIn/3
      })
      .add({
          targets: '#obj_line_f4_e'+this.id,
          top: ['0%', '-100%'],
          easing: "easeInSine",
          duration: this.timeIn/3
      })
      .add({
          targets: '#obj_below_mask_f4_e'+this.id,
          height: ['0%', '100%'],
          easing: "easeInSine",
          duration: this.timeIn/3
      }, this.timeIn/3)
      
      .add({
          targets: '#obj_above_mask_f4_e'+this.id,
          height: ['0%', '100%'],
          easing: "easeOutSine",
          duration: this.timeIn/3
      })
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
	          targets: '#obj_above_mask_f4_e'+this.id,
	          height: ['100%', '0%'],
	          easing: "easeInSine",
	          duration: this.timeOut/3,
	      })
	      
	      .add({
	          targets: '#obj_below_mask_f4_e'+this.id,
	          height: ['100%', '0%'],
	          easing: "easeInSine",
	          duration: this.timeOut/3
	      })
	      
	      .add({
	          targets: '#obj_line_f4_e'+this.id,
	          top: ['-100%', '0%'],
	          easing: "easeInSine",
	          duration: this.timeOut/3
	      }, '-='+this.timeOut/3)
	      .add({
	          targets: '#obj_line_f4_e'+this.id,
	          left: ['0%', '105%'],
	          easing: "easeOutSine",
	          duration: this.timeOut/3,
	      })  
	      .add({
	        duration: this.wait,
	        complete: this.handleAllAnimEnd.bind(this)
	      })
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
customElements.define('kintyp-type4-anime', KintypType4Anime);