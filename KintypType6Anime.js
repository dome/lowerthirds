class KintypType6Anime extends KinTypBase {
  get border_color_bottom () { return this.getAttribute('border_color_bottom') || "#ffffff"; }
  get border_color_middle () { return this.getAttribute('border_color_middle') || "#ffffff"; }

  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("border_color_bottom", "border_color_middle");
    return commonAttributes;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "border_color_bottom" && oldVal != null){
      document.getElementById('obj_border_f6_e'+this.id).style.borderBottomColor = this.border_color_bottom;
    }
    else if(attrName === "border_color_middle" && oldVal != null){
      document.getElementById('obj_left_f6_e'+this.id).style.borderRightColor = this.border_color_middle;
    }
  }

  constructor () {
    super();
    this.rightLen = 0;
    var dataID;


    var wrapLeftTmpl = `<div id="obj_left_f6_e`+this.id+`" class="kintyp_flex_left_c br_0_5"  style="overflow: hidden; position: relative; border-right-style: solid; border-right-color: `+this.border_color_middle+`">`;
    while(this.leftTexts.length > 0){
      var leftText = this.getNode(this.leftTexts[0]);
      dataID = leftText.getAttribute("data-id");
      if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
      leftText.classList.remove("kintyp-left");          
      wrapLeftTmpl = wrapLeftTmpl + `<div class="`+leftText.className+` kintyp-left-f6-e`+this.id+`" style="position: relative; white-space:nowrap;`+leftText.style.cssText+`"`+dataID+`>`+leftText.innerHTML+`</div>`;
      this.removeChild(leftText);
    }
    wrapLeftTmpl = wrapLeftTmpl + `</div>`;

    var wrapRightTmpl = `<div id="obj_right_f6_e`+this.id+`" class="kintyp_flex_left_c"  style="overflow: hidden; position: relative;">`;
    while(this.rightTexts.length > 0){
      var rightText = this.getNode(this.rightTexts[0]);
      dataID = rightText.getAttribute("data-id");
      if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
      rightText.classList.remove("kintyp-right");          
      wrapRightTmpl = wrapRightTmpl + `<div class="me_too" style="position: relative; overflow: hidden">`;
      wrapRightTmpl = wrapRightTmpl + `<div class="`+rightText.className+` kintyp-right-f6-e`+this.id+`" style="position: relative; white-space:nowrap;`+rightText.style.cssText+`"`+dataID+`>`+rightText.innerHTML+`</div>`;
      wrapRightTmpl = wrapRightTmpl + `</div>`;
      this.removeChild(rightText);
    }
    wrapRightTmpl = wrapRightTmpl + `</div>`;


    //create template
    var kintypTmpl = document.createElement('template');
    kintypTmpl.innerHTML =`
    `+this.back_panel+`

      <div id="obj_texts_f6_e`+this.id+`" class="kintyp_flex_left_r" style="overflow: hidden">`+
        wrapLeftTmpl+
        wrapRightTmpl+`
      </div>
      <div id="obj_border_f6_e`+this.id+`" class="oh_2_0 bb_0_5" style="position: relative; border-bottom-style: solid; border-bottom-color: `+this.border_color_bottom+`"></div>`;
    
    this.finishConstruction(kintypTmpl);
  }

  handleResize(){
    //calculate sizes
    this.setSizes();
    var obj_right = document.getElementById('obj_right_f6_e'+this.id);
    var obj_left = document.getElementById('obj_left_f6_e'+this.id);
    var obj_texts = document.getElementById('obj_texts_f6_e'+this.id);
    var obj_border = document.getElementById('obj_border_f6_e'+this.id);
    var rightW = 0; var rightH = 0; var leftW = 0; var leftH = 0; var borderH = 0;

    var textsRight = this.getElementsByClassName("kintyp-right-f6-e"+this.id);
    for(var i=0;i<textsRight.length;i++){
        var textRight = textsRight[i];
        var w = textRight.getBoundingClientRect().width;
        var h = textRight.getBoundingClientRect().height;
        //textRight.parentElement.style.width = w+"px";
        textRight.parentElement.style.height = h+"px";
        if(w > rightW) rightW = w;
        rightH+=h;
    }

    var textsLeft = this.getElementsByClassName("kintyp-left-f6-e"+this.id);
    for(var i=0;i<textsLeft.length;i++){
        var textLeft = textsLeft[i];
        var w = textLeft.getBoundingClientRect().width;
        var h = textLeft.getBoundingClientRect().height;
        if(w > leftW) leftW = w;
        leftH+=h;
    }

    obj_right.style.width = rightW+"px"; obj_right.style.height = rightH+"px";
    obj_left.style.width = leftW+"px"; obj_left.style.height = leftH+"px";
    
    
    obj_texts.style.width = (leftW+rightW)+"px"; obj_texts.style.height = Math.max(leftH, rightH)+"px";
    obj_border.style.width = (leftW+rightW)+"px"; borderH = obj_border.getBoundingClientRect().height;
    
    this.style.width = (leftW+rightW)+"px"; this.style.height = (Math.max(leftH, rightH)+borderH)+"px";
    
  }
  
  runAnim(){
    this.handleResize();
    this.rightLen = this.getElementsByClassName('kintyp-right-f6-e'+this.id).length;
    var timeOneRight = (this.timeIn/2) / this.rightLen;
    var timeRightOut = (this.timeOut/2) / (this.rightLen+1);
    var rightLen = this.rightLen;

    this.resetAnimObject();
    this.createAnimObject();
    
    this.animation

      .add({
          targets: '.kintyp-right-f6-e'+this.id,
          top: ['100%', '0%'],
          easing: "easeOutSine",
          duration: timeOneRight,
          delay: function(el, i){
            return timeOneRight*(rightLen - i - 1);
          }             
      })
      .add({
          targets: '#obj_left_f6_e'+this.id,
          top: ['100%', '0%'],
          easing: "easeOutSine",
          duration: this.timeIn / 3,
      }, 0)
      .add({
          targets: '.kintyp-left-f6-e'+this.id,
          left: ['100%', '0%'],
          easing: "easeInOutCirc",
          duration: this.timeIn / 2,
      }, this.timeIn / 4)
      .add({
          targets: '#obj_border_f6_e'+this.id,
          left: ['-100%', '0%'],
          easing: "easeInOutCirc",
          duration: this.timeIn / 2,
      }, this.timeIn / 2)
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
	          targets: '.kintyp-left-f6-e'+this.id,
	          left: ['0%', '100%'],
	          easing: "easeInQuart",
	          duration: this.timeOut / 2,
	      })
	      .add({
	          targets: '.kintyp-right-f6-e'+this.id,
	          top: ['0%', '100%'],
	          easing: "easeOutSine",
	          duration: timeRightOut*2,
	          delay: function(el, i){
	            return timeRightOut*i;
	          }             
	      },"-=500")
	      .add({
	          targets: '#obj_border_f6_e'+this.id,
	          left: ['0%', '-100%'],
	          easing: "easeInOutCirc",
	          duration: this.timeOut / 2
	      }, "-="+this.timeOut / 3)
	      .add({
	          targets: '#obj_left_f6_e'+this.id,
	          top: ['0%', '100%'],
	          easing: "easeInOutCirc",
	          duration: this.timeOut / 2,
	      }, "-="+this.timeOut / 2)
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
customElements.define('kintyp-type6-anime', KintypType6Anime);