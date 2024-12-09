class KintypType9Anime extends KinTypBase {
  get main_color () { return this.getAttribute('main_color') || "#ffffff"; }
  get anim_in () { return this.getAttribute('anim_in') || "horizontal_from_left"; }
  get anim_out () { return this.getAttribute('anim_out') || "wind_from_left"; }
  get dir_out () { return this.getAttribute('dir_out') || "left"; }
  get glitch () { return this.getAttribute('glitch') || "yes"; }
  get cols () { return this.getAttribute('cols') || "10"; }
  get rows () { return this.getAttribute('rows') || "2"; }

  static get observedAttributes() {
    var commonAttributes = super.observedAttributes;
    commonAttributes.push("main_color", "anim_in", "anim_out", "dir_out", "glitch", "cols", "rows");
    return commonAttributes;
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
    if((attrName === "anim_in" || attrName === "anim_out" || attrName === "dir_out") && oldVal != null){
      this.animation.pause();
      this.animation.seek(this.timeIn + this.timeStay + this.timeOut*0.99);
      this.runAnim();
      this.style.visibility = "visible";
      this.animation.play();
    }
    else if(attrName === "main_color" && oldVal != null){
      document.getElementById("left_border_f9_e"+this.id).style.borderLeftColor = newVal;
    }
    else if((attrName === "cols" || attrName === "rows") && oldVal != null){
      var partsObj = document.getElementById("parts_f9_e"+this.id);
      partsObj.innerHTML = "";
      this.animation.pause();
      this.animation.seek(this.timeIn + this.timeStay + this.timeOut*0.99);
      this.runAnim();
      this.style.visibility = "visible";
      this.animation.play();
    }
  }
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }        
  constructor () {
    super();
    var dataID;
    this.w = 0;
    this.h = 0;

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
    //create template
    var kintypTmpl = document.createElement('template');
    kintypTmpl.innerHTML = `
    `+this.back_panel+`
    <div id="sample_f9_e`+this.id+`" style="display: inline-block">
      <div class="`+effectClassName+`" style="white-space:nowrap; display: inline-block;`+effectText.style.cssText+`"`+dataID+`>`+effectHTML+`</div>
    </div>
    <div id="parts_f9_e`+this.id+`" style="position: absolute; top: 0px; left: 0px; visibility: visible"></div>
    <div id="left_border_f9_e`+this.id+`" class="bl_1_0" style="border-left-style: solid; border-left-color: `+this.main_color+`; width: 100%; height: 0%; position: absolute; top: 0px"></div>`;
    this.finishConstruction(kintypTmpl);

  }
  handleResize(){  
    //calculate sizes
    this.setSizes();
    var sample = document.getElementById("sample_f9_e"+this.id);
    this.sw = sample.getBoundingClientRect().width;
    this.sh = sample.getBoundingClientRect().height;
    this.style.width = this.sw+"px";
    this.style.height = this.sh+"px";
    var w = Math.ceil(this.sw / this.cols);
    var h = Math.ceil(this.sh / this.rows);

  	var partsObj = document.getElementById("parts_f9_e"+this.id);
  	if(partsObj.innerHTML == ""){
      //create dom objects for the particle effect
      this.w = w; this.h = h;
      this.targets = [];
      this.targets_random = [];
      this.targets_some_random = [];
      for(var j=0; j<this.cols; j++){
	      for(var i=0; i<this.rows; i++){
	        var oneDiv = document.createElement('div');
	        oneDiv.innerHTML = sample.innerHTML;
	        oneDiv.style.position = "absolute";
	        oneDiv.style.width = w+"px";oneDiv.style.height = h+"px";
	        oneDiv.style.left = j*w+"px";
	        oneDiv.style.top = i*h+"px";
	        oneDiv.style.opacity = 0;
	        oneDiv.setAttribute("id", "p_f9_e"+this.id+"_"+i+"_"+j);
	        this.targets.push("#p_f9_e"+this.id+"_"+i+"_"+j);
	        this.targets_random.push("#p_f9_e"+this.id+"_"+i+"_"+j);
	        oneDiv.style.overflow = "hidden";
	        var contentDiv = oneDiv.children[0];
	        contentDiv.style.position = "absolute";
	        contentDiv.style.left = -j*w+"px";
          contentDiv.style.top = -i*h+"px";
	        partsObj = document.getElementById("parts_f9_e"+this.id);
	        partsObj.appendChild(oneDiv);
	      }
	    }
	    this.shuffleArray(this.targets_random);
	    sample.style.visibility = "hidden";
			this.style.overflow = "visible";  		
  	}    
    else if(this.w !== w || this.h !== h){
      this.w = w; this.h = h;
      //new positions and sizes of particle objects
	    for(var j=0; j<this.cols; j++){
	      for(var i=0; i<this.rows; i++){
	        var oneDiv = document.getElementById("p_f9_e"+this.id+"_"+i+"_"+j);
	        oneDiv.style.width = w+"px";oneDiv.style.height = h+"px";
	        oneDiv.style.left = j*w+"px";
	        oneDiv.style.top = i*h+"px";
	        var contentDiv = oneDiv.children[0];
	        contentDiv.style.left = -j*w+"px";
	        contentDiv.style.top = -i*h+"px";
	      }
	    }
    }  
    this.updateParent(this.style.height);      
  }
  runAnim(){
    //start animation (animejs)
    this.handleResize();
    this.resetAnimObject();
    this.createAnimObject();
    
    var in_obj = {}, out_obj = {};
    var stg_wait_in = Math.floor((11/12)*this.timeIn / (this.cols*this.rows+3));
    var stg_dur_in = stg_wait_in*4;
    var stg_wait_out = Math.floor((11/12)*this.timeOut / (this.cols*this.rows+3));
    var stg_dur_out = stg_wait_out*4;
    this.targets_some_random = [];
    for(var i=0; i<this.targets_random.length/4; i++) this.targets_some_random[i] = this.targets_random[i];

		if(this.anim_in == "horizontal_from_left" || this.anim_in == "horizontal_from_right"){
      var t_in = this.targets;
      var stagger_in_from = 'first';
      var in_from = 1;
      if(this.anim_in == "horizontal_from_right") {stagger_in_from = 'last'; in_from = -1}
      in_obj = {
        targets: t_in,
        duration: stg_dur_in,
        easing: "easeOutSine",
        scaleY: [0,1],
        scaleX: [10,1],
        translateX: [anime.stagger([in_from*this.sw/10, -in_from*this.sw/10]), "0px"],
        delay: anime.stagger(stg_wait_in, {from: stagger_in_from})
      }              
    }
    else if(this.anim_in == "vertical_from_left" || this.anim_in == "vertical_from_right"){
      var t_in = this.targets;
      var stagger_in_from = 'first';
      if(this.anim_in == "vertical_from_right") stagger_in_from = 'last';
      in_obj = {
        targets: t_in,
        duration: stg_dur_in,
        easing: "easeOutSine",
        scaleX: [0,1],
        scaleY: [10,1],
        translateX: [anime.stagger([this.sw/10, -this.sw/10]), "0px"],
        delay: anime.stagger(stg_wait_in, {from: stagger_in_from})
      }            
    }
    else if(this.anim_in == "reveal"){
      var t_in = this.targets_random;
      var in_from = 1;
      in_obj = {
        targets: t_in,
        duration: stg_dur_in,
        easing: "easeOutSine",
        scaleY: [0,1],
        scaleX: [0,1],
        opacity: [1,1],
        translateX: [anime.stagger([in_from*this.sw/10, -in_from*this.sw/10]), "0px"],
        delay: anime.stagger(stg_wait_in),
      }
    }


    if(this.anim_out == "wind_from_left" || this.anim_out == "wind_from_right"){
      var t_out = this.targets;
      var stagger_out_from = 'first'; if(this.dir_out == "right") stagger_out_from = 'last';
      var wind_dir = 1; if(this.anim_out == "wind_from_right") wind_dir = -1;
      out_obj = {
        targets: t_out,
        duration: stg_dur_out,
        easing: "easeInSine",
        scaleY: [1,0],
        scaleX: [1,2],
        translateX: ["0px", wind_dir*this.sw/10+"px"],
        delay: anime.stagger(stg_wait_out, {from: stagger_out_from}),
      }
    }
    else if(this.anim_out == "hide"){
      var t_out = this.targets;
      var stagger_out_from = 'first'; if(this.dir_out == "right") stagger_out_from = 'last';
      out_obj = {
        targets: t_out,
        duration: stg_dur_out,
        easing: "easeOutSine",
        scaleY: [1,0],
        scaleX: [1,5],
        opacity: [1,0],
        delay: anime.stagger(stg_wait_out, {from: stagger_out_from}),
      }
    }
    
    anime.set(t_in, {
      translateX: "0px",
      translateY: "0px",
      opacity: 1,
      visibility: "visible",
      scaleY: 0,
      scaleX: 0,    
    });
    
    this.animation
    .add({
    	targets:"#left_border_f9_e"+this.id,
    	height: ["0%", "100%"],
    	duration: this.timeIn/6,
    	easing: "easeOutSine",
    })
    .add(in_obj, "-="+this.timeIn/12)
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
	
	    var glitch_offset = 0;
	    if(this.glitch === "yes"){
	      glitch_offset = 75;
	      this.animation.add({
	        targets:this.targets_some_random,
	        scaleX: [1,5,1],
	        scaleY: [1,0.1,1],
	        duration: glitch_offset,
	        easing: "linear"
	      })
	    }
	    
	    this.animation.add({
	    	targets:"#left_border_f9_e"+this.id,
	    	height: ["100%", "0%"],
	    	top: ["0%", "100%"],
	    	duration: this.timeOut/6,
	    	easing: "easeInSine",
	    }, "-="+glitch_offset)
	    .add(out_obj, "-="+this.timeOut/12)
	
	    .add({
	      duration: this.wait,
	      complete:  this.handleAllAnimEnd.bind(this)
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

customElements.define('kintyp-type9-anime', KintypType9Anime);