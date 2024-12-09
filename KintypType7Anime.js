class KintypType7Anime extends KinTypBase {
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
      document.getElementById("obj_translate_right_f7_e"+this.id).style.borderBottomColor = newVal;
    }
  }
  //DESIGN PHASE

  constructor () {
    
      super();
      var dataID;

      var leftTexts = this.getElementsByClassName("kintyp-left");
      var wrapLeftTmpl = ``;
      while(leftTexts.length > 0){
        var leftText = this.getNode(leftTexts[0]);
        dataID = leftText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        leftText.classList.remove("kintyp-left");
        wrapLeftTmpl = wrapLeftTmpl + `<div class="`+leftText.className+` kintyp-left-f7-e`+this.id+` t_padding_right" style="position: relative; white-space:nowrap;`+leftText.style.cssText+`"`+dataID+`>`+leftText.innerHTML+`</div>`;
        this.removeChild(leftText);
      }

      var rightTexts = this.getElementsByClassName("kintyp-right");
      var wrapRightTmpl = ``;
      while(rightTexts.length > 0){
        var rightText = this.getNode(rightTexts[0]);
        dataID = rightText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        rightText.classList.remove("kintyp-right");
        wrapRightTmpl = wrapRightTmpl + `<div class="`+rightText.className+` kintyp-right-f7-e`+this.id+` pr_3_0 pb_0_5" style="position: relative; white-space:nowrap;`+rightText.style.cssText+`"`+dataID+`>`+rightText.innerHTML+`</div>`;
        this.removeChild(rightText);
      }

      //create template
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`
      `+this.back_panel+`

        <div id="obj_texts_f7_e`+this.id+`" class="kintyp_flex_left_r" style="align-items: flex-end;">

          <div id="obj_rotate_left_f7_e`+this.id+`" style="transform-origin: 100% 100%; overflow: hidden; position: relative;">
              <div id="obj_left_f7_e`+this.id+`" class="kintyp_flex_left_c mt_1_0"  style="transform-origin: 100% 100%; overflow: hidden; position: relative;">`+
              wrapLeftTmpl+`
              </div>
          </div>
          <div id="obj_border_right_f7_e`+this.id+`" style="overflow: hidden; position: relative;">
              <div id="obj_translate_right_f7_e`+this.id+`" style="overflow: hidden; position: relative; border-bottom-style: solid; border-bottom-color: `+this.main_color+`" class="bb_0_5">
                  <div id="obj_right_f7_e`+this.id+`" class="kintyp_flex_left_c"  style="overflow: hidden; position: relative;">`+
                  wrapRightTmpl+`
                  </div>
              </div>
          </div>
          
        </div>`;
      
      this.finishConstruction(kintypTmpl);
  }

  handleResize(){      
      //calculate sizes
      this.setSizes();

      var rightW = 0; var rightH = 0; var leftW = 0; var leftH = 0;
      var textsLeft = document.getElementsByClassName("kintyp-left-f7-e"+this.id);
      for(var i=0;i<textsLeft.length;i++){
          var textLeft = textsLeft[i];
          var w = textLeft.offsetWidth;
          var h = textLeft.offsetHeight;
          if(w > leftW) leftW = w;
          leftH+=h;
      }
      var textsRight = document.getElementsByClassName("kintyp-right-f7-e"+this.id);
      for(var i=0;i<textsRight.length;i++){
          var textRight = textsRight[i];
          var w = textRight.getBoundingClientRect().width;
          var h = textRight.getBoundingClientRect().height;
          if(w > rightW) rightW = w;
          rightH+=h;
      }

      var obj_left = document.getElementById('obj_left_f7_e'+this.id);
      var obj_rotate_left = document.getElementById('obj_rotate_left_f7_e'+this.id);
      var obj_translate_right = document.getElementById('obj_translate_right_f7_e'+this.id);
      var obj_border_right = document.getElementById('obj_border_right_f7_e'+this.id);
      var obj_right = document.getElementById('obj_right_f7_e'+this.id);


      obj_left.style.width = leftW+"px"; obj_left.style.height = leftH+"px";
      obj_rotate_left.style.width = leftW+"px"; obj_rotate_left.style.height = leftH+"px";
      obj_right.style.width = rightW+"px"; obj_right.style.height = rightH+"px";
      obj_translate_right.style.width = rightW+"px"; obj_translate_right.style.height = rightH+"px";
      obj_border_right.style.width = rightW+"px"; obj_border_right.style.height = rightH+"px";

      this.style.width = (leftW+rightW)+"px"; this.style.height = (Math.max(leftH, rightH))+"px";
  }
  
  runAnim(){
      //start animation (animejs)
      this.handleResize();
			  	
      this.resetAnimObject();
      this.createAnimObject();
      this.animation

      .add({
          targets: '#obj_translate_right_f7_e'+this.id,
          left: ['100%', '0%'],
          easing: "easeOutSine",
          duration: this.timeIn/3,
      })
      .add({
          targets: '#obj_right_f7_e'+this.id,
          top: ['100%', '0%'],
          easing: "easeOutSine",
          duration: this.timeIn/4,
      }, this.timeIn/4)
      
      .add({
          targets: '#obj_left_f7_e'+this.id,
          easing: "easeOutSine",
          duration: this.timeIn/4,
          top: ['100%', '0%']
      }, this.timeIn/4)
      .add({
          targets: '#obj_rotate_left_f7_e'+this.id,
          rotate: ['-180deg', '0deg'],
          easing: "easeInSine",
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
	          targets: '#obj_rotate_left_f7_e'+this.id,
	          rotate: ['0deg', '-180deg'],
	          easing: "easeInSine",
	          duration: this.timeOut/2,
	      })
	      .add({
	          targets: '#obj_left_f7_e'+this.id,
	          rotate: ['0deg', '-90deg'],
	          easing: "easeOutSine",
	          duration: this.timeOut/6,
	      })
	      .add({
	          targets: '#obj_right_f7_e'+this.id,
	          top: ['0%', '100%'],
	          easing: "easeInSine",
	          duration: this.timeOut/3,
	      }, "-="+this.timeOut/3)
	      .add({
	          targets: '#obj_translate_right_f7_e'+this.id,
	          left: ['0%', '100%'],
	          easing: "easeInSine",
	          duration: this.timeOut/3,
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
customElements.define('kintyp-type7-anime', KintypType7Anime);