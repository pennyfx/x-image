/*

I have a custom element repo stub that you can use when creating new 
elements.  It saves on the basic setup.

https://github.com/x-tag/web-component-stub

*/


xtag.register('x-image', {
	lifecycle: {
	  created: function(){
	    var self = this;

	    // Need to create a wrapper for relativity
	    var wrapper = document.createElement('div');
	    wrapper.className = 'x-image-wrapper';
	    this.appendChild(wrapper);

	    // Create and show loader
	    var loader = this.loader = document.createElement('div');
	    wrapper.appendChild(loader);
	    loader.className = 'x-image-loader';
	    this.showLoader();

	    // Create IMG element, send it off
	    var image = this.image = document.createElement('img');

	    // You can cache a handle to this element by using the xtag data object
	    this.xtag.data.image = image;

	    image.addEventListener('load', hideLoader);

	    // this needs some sort of visual indicator when an image failed to load.
	    image.addEventListener('error', hideLoader);

	    // It looks like getters/setters already exist for the other attributes, why copy all of them down?
	    
	    xtag.toArray(this.attributes).forEach(function(item) {
	      if(item.name != 'id') image.setAttribute(item.name, item.value);
	    });
	    wrapper.appendChild(image);

	    function hideLoader() {
	      	self.hideLoader();
	    }
	  },

	  // You can axe this since you have getters and setters for the relavent attributes
	  attributeChanged: function(name, value) {
	  	// If the SRC changes, we need to show the loader right away
	    if(name == 'src') this.showLoader();
	    // Mirror changes to the x-image to the img
	    if(name != 'id') this.image.setAttribute(name, value);
	  }
	},
	accessors: {
	  src: {
	    get: function() {
	      return this.getAttribute('src');
	    },
	    // We have an 'attribute' pseudo that will do the attribute setting on the x-element for you
	    // you'll still need to relay other attributes to the img element  
	    'set:attribute()': function(value) {	      
	      this.showLoader();
	      // relay to image element
	      this.xtag.data.image.src = value;
	    }
	  },
	  width: {
	    get: function() {
	      return this.getAttribute('width');
	    },
	    // Use attribute pseudo
	    'set:attribute()': function(value) {
	      this.xtag.data.image.setAttribute('width', value);
	    }
	  },
	  height: {
	    get: function() {
	      return this.getAttribute('height');
	    },
	    // Use attribute pseudo
	    'set:attribute()': function(value) {	      
	      this.xtag.data.image.setAttribute('height', value);
	    }
	  }
	},
	methods: {
	  showLoader: function() {
	  	xtag.removeClass(this, 'x-image-inactive');
	    xtag.addClass(this, 'x-image-display');
	  },
	  hideLoader: function() {
	    xtag.removeClass(this, 'x-image-display');
	  }
	},
	events: {
	  // Image "load" and "error" events don't bubble, so cannot
	  // use them here
	  transitionend: function(e) {
	  	xtag.addClass(this, 'x-image-inactive');
	  }
	}
});