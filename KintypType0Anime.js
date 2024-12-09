class KintypType0Anime extends KinTypBase {
  get strokeW () { return Number(this.getAttribute('strokeW')) || 4; }
  get main_color () { return this.getAttribute('main_color') || "#ffffff"; }


  //DESIGN PHASE
  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("strokew", "main_color");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if(attrName === "main_color" && oldVal != null){
      document.getElementById('e'+this.id+'_o3').style.backgroundColor = newVal;
      var changeObj = this.getElementsByClassName('rect_border_e'+this.id);
      for(var i=0;i<changeObj.length;i++){
        changeObj[i].style.stroke = newVal;
      }  
    }
    else if(attrName === "strokew" && oldVal != null){
      var theRect = document.getElementById('e'+this.id+'_o5');
      theRect.setAttribute("height", this.aspW1+this.strokeW);
      theRect.setAttribute("transform", "rotate(90) translate(0,-"+(this.aspW1+this.strokeW)+")");
      theRect.setAttribute("stroke-width", 2*this.strokeW);
    }      
  }
  //DESIGN PHASE

  constructor () {
      super();
      
      //create template
      var dataID;
      var wrapLeftTmpl = `<div id="e`+this.id+`_o1" class="kintyp_flex_centered_c" style="height: 100%;">`;
      while(this.leftTexts.length > 0){
        var leftText = this.getNode(this.leftTexts[0]);
        dataID = leftText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        leftText.classList.remove("kintyp-left");
        wrapLeftTmpl = wrapLeftTmpl + `<div class="`+leftText.className+` obj_hide1_xplus_f0_e`+this.id+`" style="position: relative; white-space: nowrap;`+leftText.style.cssText+`"`+dataID+`>`+leftText.innerHTML+`</div>`;
        this.removeChild(leftText);
      }
      wrapLeftTmpl = wrapLeftTmpl + `</div>`;
      
      var wrapRightTmpl = `<div id="e`+this.id+`_o2" class="kintyp_flex_centered_c obj_hide1_yplus_f0_e`+this.id+`" style="position: absolute; height: 100%;">`;
      while(this.rightTexts.length > 0){
        var rightText = this.getNode(this.rightTexts[0]);
        dataID = rightText.getAttribute("data-id");
        if(dataID) dataID = " data-id=\""+dataID+"\""; else dataID = "";
        rightText.classList.remove("kintyp-right");
        wrapRightTmpl = wrapRightTmpl + `<div class="obj_right_f0_e`+this.id+` `+rightText.className+`" style="white-space: nowrap;`+rightText.style.cssText+`"`+dataID+`>`+rightText.innerHTML+`</div>`;
        this.removeChild(rightText);
      }
      wrapRightTmpl = wrapRightTmpl + `</div>`;
      
      var kintypTmpl = document.createElement('template');
      kintypTmpl.innerHTML =`
        <style>
          #e`+this.id+`_o3{
            background-color: `+this.main_color+`;
          }
          .rect_border_e`+this.id+` {
            box-sizing: border-box;
            stroke: `+this.main_color+`;
            stroke-dasharray: `+(1.05*(2*this.aspW1+2*this.aspH))+`;
            stroke-dashoffset: `+(1.05*(2*this.aspW1+2*this.aspH))+`;
          }
        </style>
        `+this.back_panel+`
        <div id="e`+this.id+`_o6" class="obj_hide2_yplus_f0_e`+this.id+`" style="position: absolute; width: 100%; height: 100%;">
          <div id="e`+this.id+`_o3" class="obj_show_widthplus_xplus_e`+this.id+`" style="height: 100%; width: 100%; overflow: hidden; position: absolute; top: 0px;"></div>
        </div>
        <div class="obj_show_widthplus_e`+this.id+`" style="height: 100%; width: 100%; overflow: hidden; position: absolute; top: 0px;">`+
          wrapLeftTmpl+`
        </div>
        <div class="obj_show_widthplus_2_e`+this.id+`" style="height: 100%; width: 0%; overflow: hidden; position: absolute; top: 0px;">
          
          <svg style="position: absolute; height: 100%;" id="e`+this.id+`_o4" class="obj_hide2_xplus_f0_e`+this.id+` svg_hide_e`+this.id+`" width="`+this.aspW1+`" height="`+this.aspH+`" viewBox="0 0 `+this.aspW1+` `+this.aspH+`">
            <rect id="e`+this.id+`_o5" class="rect_border_e`+this.id+`" x="0" y="0" width="`+this.aspH+`" height="`+(this.aspW1+this.strokeW)+`" fill="none" transform='rotate(90) translate(0,-`+(this.aspW1+this.strokeW)+`)' stroke-width="`+2*this.strokeW+`" />
          </svg>`+wrapRightTmpl+`
          
        </div>
        
        </div>

      `;

      this.finishConstruction(kintypTmpl);
  }
  
  handleShowAnimRevealed(){
    var obj = this.querySelector('.obj_show_widthplus_e'+this.id); 
    obj.style.width = this.middle+'%';
    obj = this.querySelector('.obj_show_widthplus_2_e'+this.id); 
    obj.style.width = '100%';
    obj = this.querySelector('.obj_show_widthplus_xplus_e'+this.id); 
    obj.style.width = (100-this.middle)+'%'; obj.style.left = this.middle+'%';
    obj = this.querySelector('.rect_border_e'+this.id);
    obj.style.strokeDashoffset = 0;
  }

  handleResize(){
    //calculate all elements based on the area taken by the content
    this.setSizes();
    
    var maxH = 0; var rightW = 0; var leftW = 0; var leftH = 0; var rightH = 0;
    var leftTexts = this.getElementsByClassName("obj_hide1_xplus_f0_e"+this.id);    
    var rightTexts = this.getElementsByClassName("obj_right_f0_e"+this.id);
    for(var i=0;i<leftTexts.length;i++){
        var w = leftTexts[i].getBoundingClientRect().width;
        if(w > leftW) leftW = w;
        leftH+=leftTexts[i].getBoundingClientRect().height;
    }
    for(var i=0;i<rightTexts.length;i++){
        var w = rightTexts[i].getBoundingClientRect().width;
        if(w > rightW) rightW = w;
        rightH+=rightTexts[i].getBoundingClientRect().height;
    }
    maxH = Math.max(leftH, rightH);

    this.style.width = leftW + rightW + "px";
    this.style.height = maxH + "px";

    var obj = document.getElementById('e'+this.id+'_o1'); obj.style.width = leftW+"px";
    obj = document.getElementById('e'+this.id+'_o2'); obj.style.width = rightW+"px"; obj.style.left = leftW+"px";
    obj = document.getElementById('e'+this.id+'_o4'); obj.style.width = leftW+"px";


    var theSVG = document.getElementById('e'+this.id+'_o4');
    theSVG.setAttribute("width", leftW);
    theSVG.setAttribute("height", maxH);
    theSVG.setAttribute("viewBox", "0 0 "+leftW+" "+maxH);

    var theRect = document.getElementById('e'+this.id+'_o5');
    theRect.setAttribute("width", maxH);
    theRect.setAttribute("height", leftW+this.strokeW);
    theRect.setAttribute("transform", "rotate(90) translate(0,-"+(leftW+this.strokeW)+")");
    theRect.style.strokeDasharray = 1.05*(2*leftW+2*maxH);
    theRect.style.strokeDashoffset = 0;

    this.aspW1 = leftW; this.aspW2 = rightW; this.aspH = maxH;
    this.middle = 100*leftW / (leftW+rightW);
  }
  
  runAnim(){
    //start animation using animejs library
    this.handleResize();

    this.resetAnimObject();
    this.createAnimObject();

    this.leftTextsL = this.getElementsByClassName('obj_hide1_xplus_f0_e'+this.id).length;
    var animHideOnePer = 0.375;
    this.animHideOne = this.timeOut*animHideOnePer;
    this.allTime = this.timeIn+this.timeStay+this.timeOut;
    this.delayOneText = (this.allTime-2*this.animHideOne - this.timeIn-this.timeStay) / this.leftTextsL;    
    
    var timeStay = this.timeStay;
    var delayOneText = this.delayOneText;
    
    this.animation
    
      .add({
        targets: '#kintyp_bgr_'+this.id,
        opacity: [0, 1],
        easing: "linear",
        duration: this.timeIn
      })    
      .add({
        targets: '.obj_show_widthplus_e'+this.id,
        width: ['0%', this.middle+'%'],
        easing: "easeOutSine",
        duration: this.timeIn
      }, 0) 
      .add({
        targets: '.obj_show_widthplus_2_e'+this.id,
        width: ['0%', '100%'],
        easing: "easeOutSine",
        duration: this.timeIn
      }, 0)
      .add({
        targets: '.obj_show_widthplus_xplus_e'+this.id,
        width: ['0%', (100-this.middle)+'%'],
        left: ['0%', this.middle+'%'],
        easing: "easeOutSine",
        duration: this.timeIn,          
      }, 0)
	    .add({
	      duration: 1,
	      complete: this.handleAnimInEnd.bind(this)
	    })
      .add({
        targets: '.rect_border_e'+this.id,
        strokeDashoffset: [1.05*(2*this.aspW1+2*this.aspH), 0],
        easing: "easeOutSine",
        duration: this.timeIn*1.5
      }, 0)
      
      
      
	    if(this.hide === "yes"){
		    this.animation		
	      .add({
	        targets: '.obj_hide1_xplus_f0_e'+this.id,
	        left: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: this.animHideOne,
	        delay: function(el, i) {
	          return timeStay*0.5+delayOneText*i;        
	        }        
	      })
	      
	      .add({
	        targets: '.obj_hide2_xplus_f0_e'+this.id,
	        left: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: this.animHideOne,
	      }, '-='+this.delayOneText*this.leftTextsL)
	      .add({
	        targets: '.obj_hide1_yplus_f0_e'+this.id,
	        top: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: this.animHideOne,
	      }, '-='+(this.animHideOne/2))
	      .add({
	        targets: '.obj_hide2_yplus_f0_e'+this.id,
	        top: ['0%', '100%'],
	        easing: "easeInSine",
	        duration: this.animHideOne,
	        complete: this.handleAllAnimEnd.bind(this)
	      }, '-='+(this.animHideOne/2))
	      .add({
	        targets: '#kintyp_bgr_'+this.id,
	        opacity: [1, 0],
	        easing: "linear",
	        duration: this.timeOut
	      },  "-="+this.timeOut)
	      .add({
	        duration: this.wait,
	        complete: this.handleAnimStayEnd.bind(this)
	      },  this.timeIn+this.timeStay)
	      
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
customElements.define('kintyp-type0-anime', KintypType0Anime);