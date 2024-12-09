class KintypType1Anime extends KinTypBase {
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
      document.getElementById("obj_show_anim3_f1_e"+this.id).style.borderBottomColor = newVal;
    }
  }
  //DESIGN PHASE

  constructor () {
      super();
      var dataID;
      this.angle = 30; this.contw = 0; this.conth = 0; this.maskLeftW = 0; this.maskLeftH = 0; 
      var wrapLeftTmpl = `<div id="obj_text_left_f1_e`+this.id+`" style="display: inline-block; position: relative; transform-origin: 0% 0%; ">`;
      var wrapRightTmpl = `<div id="obj_text_right_f1_e`+this.id+`" style="display: inline-block; position: relative; transform-origin: 0% 0%; ">`;
      var effectClassName = ""; var effectHTML = "";
      if(this.effectTexts.length > 0){
          var effectText = this.getNode(this.effectTexts[0]);
          dataID = effectText.getAttribute("data-id");
          if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
          effectText.classList.remove("kintyp");
          effectClassName = effectText.className;
          effectHTML = effectText.innerHTML;
          this.removeChild(effectText);
      }
      wrapLeftTmpl = wrapLeftTmpl + `<div class="`+effectClassName+` obj_show_anim1_f1_e`+this.id+` pb_1_5" style="position: relative; display: inline-block; white-space: nowrap; top: 0px; left: 0px;`+effectText.style.cssText+`"`+dataID+`>`+effectHTML+`</div></div>`;
      wrapRightTmpl = wrapRightTmpl + `<div class="`+effectClassName+` obj_show_anim2_f1_e`+this.id+` pb_1_5" style="position: relative; display: inline-block; white-space: nowrap; top: 0px; left: 0px;`+effectText.style.cssText+`"`+dataID+`>`+effectHTML+`</div></div>`;

      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML = `
      `+this.back_panel+`
      <div style="width: 100%; height: 95%; overflow: hidden; position: absolute">
          <div id="mask_left_f1_e`+this.id+`" class="obj_hide_anim1_f1_e`+this.id+`" style="position: absolute; overflow: hidden; transform-origin: 0% 0%; left: -50%;">`+
          wrapLeftTmpl+`
          </div>
          <div id="mask_right_f1_e`+this.id+`" style="position: absolute; overflow: hidden; transform-origin: 0% 0%; left: 50%;">`+
          wrapRightTmpl+`
          </div>
      </div>
      <div class="obj_hide_anim2_f1_e`+this.id+`" style="position: absolute; width: 100%; height: 100%; top: 0px">
          <div id="obj_show_anim3_f1_e`+this.id+`" class="bb_1_5" style="position: absolute; border-bottom-style: solid; border-bottom-color: `+this.main_color+`; width: 100%; height: 100%;"></div>
      </div>`;

      this.finishConstruction(kintypTmpl);
  }

  updateAnimation(){
    super.updateAnimation();
    var positionSeconds = this.animation.progress*this.animation.duration/100;
    if(positionSeconds >= this.timeIn){
      this.handleShowAnimRevealed();    
    }
    else{
      var objMaskLeft = document.getElementById('mask_left_f1_e'+this.id);
      var objMaskRight = document.getElementById('mask_right_f1_e'+this.id);
      objMaskRight.style.visibility = 'visible';
      objMaskLeft.style.width = this.maskLeftW;
      objMaskLeft.style.height = this.maskLeftH;
    }
  }  

  handleShowAnimRevealed(){
    var objMaskLeft = document.getElementById('mask_left_f1_e'+this.id);
    var objMaskRight = document.getElementById('mask_right_f1_e'+this.id);
    this.querySelector('.obj_show_anim1_f1_e'+this.id).style.left = "50%";
    objMaskRight.style.visibility = 'hidden';
    objMaskLeft.style.width = this.contw*2+"px";
    objMaskLeft.style.height = this.conth*2+"px";
  }

  handleResize(){
    this.setSizes();
    var angle = this.angle;
    var cosV = Math.cos(angle * (Math.PI / 180));
    var sinV = Math.sin(angle * (Math.PI / 180));
    var objMaskLeft = document.getElementById('mask_left_f1_e'+this.id);
    var objTextLeft = document.getElementById('obj_text_left_f1_e'+this.id);      
    var objMaskRight = document.getElementById('mask_right_f1_e'+this.id);
    var objTextRight = document.getElementById('obj_text_right_f1_e'+this.id);
    var h = objTextLeft.offsetHeight;var w = objTextLeft.offsetWidth;

    this.contw = (w*cosV-h*sinV); this.conth = (w*sinV+h*cosV);
    this.maskLeftW = (this.contw + h*sinV)+"px"; this.maskLeftH = (this.conth+ h*cosV)+"px";
    
    objMaskLeft.style.width = this.maskLeftW;objMaskLeft.style.height = this.maskLeftH;
    objTextLeft.style.transform = "rotate("+(angle)+"deg)"; 
    objMaskLeft.style.transform = "rotate(-"+(angle)+"deg)"; 

    objMaskRight.style.width = (this.contw)+"px";objMaskRight.style.height = (this.conth)+"px";    
    objTextRight.style.transform = "rotate("+(angle)+"deg)"; 
    objMaskRight.style.transform = "rotate(-"+(angle)+"deg)"; 

    objMaskLeft.style.left = "-50%"; objMaskRight.style.left = "50%";
    this.style.width = w+"px"; this.style.height = h+"px";

    if(objMaskRight.style.visibility === 'hidden'){
      objMaskLeft.style.width = this.contw*2+"px";
      objMaskLeft.style.height = this.conth*2+"px";
    }
    objMaskRight.style.left = w+objMaskLeft.offsetLeft+"px";
  }
  
  runAnim(){  
      this.handleResize();
      var objMaskLeft = document.getElementById('mask_left_f1_e'+this.id);
      var objMaskRight = document.getElementById('mask_right_f1_e'+this.id);
      objMaskRight.style.visibility = 'visible';
      objMaskLeft.style.width = this.maskLeftW;
      objMaskLeft.style.height = this.maskLeftH;
      
      this.resetAnimObject();
      this.createAnimObject();

      this.animation
      .add({
        targets: '#kintyp_bgr_'+this.id,
        opacity: [0, 1],
        easing: "linear",
        duration: this.timeIn
      })    
      .add({
          targets: '.obj_show_anim1_f1_e'+this.id,
          left: ['110%', '50%'],
          easing: "linear",
          duration: this.timeIn
      }, 0)
      .add({
          targets: '.obj_show_anim2_f1_e'+this.id,
          left: ['-100%', '-50%'],
          easing: "linear",
          duration: this.timeIn,
          complete: this.handleShowAnimRevealed.bind(this)
      }, 0)
      .add({
          targets: '#obj_show_anim3_f1_e'+this.id,
          width: ['0%', '100%'],
          left: ['55%', '0%'],
          easing: "easeOutSine",
          duration: this.timeIn,
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
	          targets: '.obj_hide_anim1_f1_e'+this.id,
	          top: ['0%', '105%'],
	          easing: "easeInSine",
	          duration: this.timeOut/2
	      })
	      .add({
	          targets: '.obj_hide_anim2_f1_e'+this.id,
	          width: ['100%', '0%'],
	          easing: "easeInSine",
	          duration: this.timeOut/2,
	      })
	      .add({
	        targets: '#kintyp_bgr_'+this.id,
	        opacity: [1, 0],
	        easing: "linear",
	        duration: this.timeOut
	      },  "-="+this.timeOut)    
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
customElements.define('kintyp-type1-anime', KintypType1Anime);