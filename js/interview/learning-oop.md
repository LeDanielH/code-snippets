# OOP - ExtJS

+ Class = blueprint of a concept > **building**
	+ defines structure of an instance > **nubmer of floors**
	+ defines behaviour of an instance > **has an elevator**
	+ defines properties of an instance > **address**
+ Instance/Object = actualization of the blueprint > **Empire State Building**


### BASIC EXAMPLE

```javascript
	
	// DEFINING SQUARE CLASS

	Ext.define('Square', {
		side: 0, //default value
		getArea: function() {
			return this.side * this.side;
		}

	});


	// CREATING AN INSTANCE OF OUR SQUARE CLASS

	var squareObject = Ext.create('Square');
	squareObject.side = 4;
	Ext.Msg.alert('Message', 'The area is: ' + squareObject.getArea());
```


### EXAMPLE USING A CONSTRUCTOR

```javascript

	// DEFINING SQUARE CLASS

	Ext.define('Square', {
		side: 0,
		constructor: function(side) {
			if (side) {
				this.side = side;
			}
		}
		getArea: function() {
			return this.side * this.side
		}
	});


	// CREATING AN INSTANCE OF OUR SQUARE CLASS

	var squareObject = Ext.create('Square', 4);
	Ext.Msg.alert('Message', 'The area is: ' + squareObject.getArea());



```


### EXAMPLE USING A CONSTRUCTOR WITH MULTIPLE PROPERTIES
```javascript

	// DEFINING SQUARE CLASS

	Ext.define('Square' {
		side: 0,
		color: 'red',
		border: true

		/* CONSTRUCTOR LONG WAY */
		constructor: function(config) {
			if (config.side) {
				this.side = config.side;
			}
			if (config.color) {
				this.color = config.color
			}
			// border is a boolean so we skip the if block
			this.border = config.border
		}

		/* CONSTRUCTOR SHORT WAY USING APPLY */
		constructor: function(config) {
			Ext.apply(this, config)
		}
	});

	// CREATING AN INSTANCE OF OUR SQUARE CLASS

	var squareObject = Ext.create('Square' {
		side: 4,
		color: 'green',
		border: false
	});
	Ext.Msg.alert('Message', [
			'The area of the',
			squareObject.color,
			'square',
			(squareObject.border?'with a border':''), // if there is a border write this...
			'is:',
			squareObject.getArea()
		].join(' ')
	);

```

### ADDING MORE CLASSES > REPETITION!
 ```javascript

	// DEFINING CLASSES

	Ext.define('Square', {
		side: 0,
		color: 'red',
		border: true
		constructor: function(config) {
			Ext.apply(this, config);
		},

		getArea: function() {
			return this.side * this.side;
		},

		getShapeName: function() {
			return 'square';
		}
	});

	Ext.define('Rectangle', {
		base: 0,
		height: 0,
		color: 'green',
		border: true,
		constructor: function(config) {
			Ext.apply(this, config);
		},

		getArea: function() {
			return this.base * this.height;
		},

		getShapeName: function() {
			return 'rectangle';
		}

	});

	Ext.define('Circle', {
		radius: 0,
		color: 'blue',
		border: true
		constructor: function(config) {
			Ext.apply(this, config);
		}
		getArea: function() {
			return Math.PI.toFixed(2) * Math.pow(this.radius, 2);
		},

		getShapeName: function() {
			return 'circle';
		}
	});


	// CREATING INSTANCES

	var squareObject = Ext.create('Square', {
			side: 5,
			border: false
		}),
		rectangleObject = Ext.create('Rectangle', {
			base: 10,
			height: 4,
		}),
		circleObject = Ext.create('Circle', {
			radius: 6
		});


	/* MESSAGES THE USUAL WAY*/
	
	Ext.Msg.alert('Message', [
		[
			'The area of the', 
			squareObject.color,
			'square',
			(squareObject.border ? 'with a border': ''),
			'is',
			squareObject.getArea() + '.'
		].join(' '), [
			'The area of the',
			rectangleObject.color,
			'rectangle',
			(rectangleObject.border ? 'with a border': ''),
			'is',
			rectangleObject.getArea() + '.'
		].join(' '), [
			'The area of the',
			circleObject.color,
			'circle',
			(circleObject.border ? 'with a border': ''),
			'is',
			circleObject.getArea() + '.'

		].join(' ')
	].join('<br>'));


	/* MESSAGES THE OTHER WAY */
	
	// DEFINING FUNCTION TO GENERATE THE MESSAGE

	function generateTestSentence(shape) {
		return [
			'The area of the',
			shape.color,
			shape.getShapeName(),
			(shape.border ? 'with a border' : ''),
			'is',
			shape.getArea() + '.'
		].join(' ');
	}

	// CALLING THE FUNCTION GENERATING THE MESSAGE
	Ext.Msg.alert('Message', [
		generateTestSentence(squareObject), 
		generateTestSentence(rectangleObject), 
		generateTestSentence(circleObject)
	].join('<br/>'));
 ```


### INHERITANCE > PARENT & CHILD CLASSES

```javascrippt
	
	// DEFINING PARENT CLASS

	Ext.define('Shape', {
		color: 'gray',
		border: true,
		shapeName: 'shape',
		constructor: function(config) {
			Ext.apply(this, config)
		},
		getShapeName: function() {
			return this.shapeName;
		},
		getTestSentence: function () {
			return [
				'The area of the', 
				this.color, 
				this.getShapeName(), 
				(this.border ? 'with a border' : ''), 
				'is:', this.getArea()
			].join(' ');
		}
	});


	// DEFINING CHILD CLASS

	Ext.define('Square', {
		extend: 'Shape',
		side: 0,
		color: 'red',
		shapeName: 'square',
		getArea: function() {
			return this.side * this.side
		}
	});


	// DEFINING INSTANCE OF A CHILD CLASS
	var squareInstance = Ext.create('Square', {
		side: 5
	});


	// GET MESSAGE
	Ext.Msg.alert('Message', [squareInstance.getTestSentence()].join('<br>'));

```
+ note: Do not override number with a string when working with classes


### Config Block
+ Use it to prevent direct read/write of an object's properties
+ restricts access to the object's properties so they can only be set and retrieved using accessor methods.
+ You should not include configs already defined in a parent class’s config block.

```javascript
	

	// PARENT
	Ext.define('Shape', {

		config: {
			color: 'gray', // creates getColor|setColor
			border: true, // creates getBorder|setBorder
			shapeName: 'shape' // creates getShapeName|setShapeName	
		},

		constructor: function (config) {
			Ext.apply(this, config);
			// Initialize the config block for this class
			// This auto-generates the accessor methods
			this.initConfig(config);
		}

		// We have removed the getShapeName method. It's auto-generated since shapeName is in the config block.

		getTestSentence: function() {
			return [
				'The area of the',
				this.getShapeName(),
				(this.getBorder ? 'with a border' : ''),
				'is',
				this.getArea()
			].join(' ');
		}
	});

	// CHILD
	Ext.define('Square', {
		extend: 'Shape',
		
		// In a child class, the config block should only contain new configs particular for this class
		config: {
			side: 0 // getSide and setSide are now avaiable
		}

		// Parent class properties are defined outside the config block
		color: 'red',
		shapeName: 'square',
		getArea: function() {
			return this.getSide() * this.getSide();
		},

		/* 'side' is a property defined through the 'config' block, 
		We can use this method before the value is modified. 
		For instance, checking that 'side' is a number 
		*/
		applySide: function(newValue, oldValue) {
			return (Ext.isNumber(newValue)? newValue : oldValue)
		}
	});

	// INSTANCE OF A CHILD
	var squareInstance = Ext.create('Square', {
		side: 4
	})

	// The following line won't modify the value of 'side' anymore
	squareInstance.side = 'five';

	// To modify it instead, use:
	squareInstance.setSide(5);

	Ext.Msg.alert('Message', [ square.getTestSentence() ].join('<br />'));

```


### Ext.Base class
+ In Ext JS, all classes are children of a base class Ext.Base unless explicitly specified.
+ Just like our Square class extends from Shape, Shape automatically extends from Ext.Base.

```javascript

	Ext.define('Shape', {
		// Properties and methods here
	});

	/* is an equivalent to this */

	Ext.define('Shape', {
		// Properties and methods here
		extend: 'Ext.Base'
	});

	/* 
	This is why we can use this.initConfig(config); in the constructor of Shape. 
	initConfig() is a method of Ext.Base and is inherited by anything extending from it. 
	initConfig() initializes the config block for its class and auto-generates the accessor methods.
	*/
```


### Real property encapsulation
+ The main goal of encapsulation is to protect objects from unwanted and/or invalid property modification. These modifications would inevitably result in errors.
+ Nothing prevents us from calling square.setSide(‘five’), which would result in an error since side expects a numeral. We prevent this by using Apply method.
+ apply method lets us test the proposed value before modification. This method copies all of the properties of config to the specified object.


### Naming Conventions
+ **Classes**
	+ numbers are discouraged & no underscores or any other non-alphanumeric char.
	+ never use 'Ext' as top level namespace
	+ camelCase literally JsonProxy instead of JSONProxy

+ **Source Files**
	+ The names of the classes map directly to the file paths in which they are stored. As a result, there must only be one class per file.
	+ Ext.form.action.Submit is stored in path/to/src/**Ext/form/action/Submit.js**

+ **Methods and Variables**
	+ numbers allowed but discouraged, no underscores or any other non-alphanumeric char.
	+ getHtml() instead of getHTML()
	+ 'var base64Encoder' acceptable

+ **Class Properties**
	+ Static class properties that are constants should be all upper-cased.
	+ Ext.MessageBox.YES = "Yes"; MyCompany.alien.Math.PI = "4.13"


### Declaration = Ext.define(className, members, onClassCreated);
+ members = collection of class members in key-value pairs
+ onClassCreated - optional

```javascript
	
	Ext.define('My.sample.Person', {
		name: 'Uknown',
		constructor: funtion(name) {
			if(name) {
				this.name = name;
			}
		},
		eat: function(foodType) {
			alert(this.name + " is eating: " + foodType);
		}
	});
	
	/* 
	use *Ext.create* instead of *new My.Sample.Person()*.
	Dynamic loading is the advantage whatever that means
	*/

	var daniel = Ext.create('My.sample.Person', 'Daniel');
	daniel.eat('chicken');
```

### Configuration - using 'config' and 'apply'

```javascript
	
	// CREATING A PARENT CLASS

	Ext.define('My.own.Window', {
		extend: 'Ext.Component'
		/* @readonly */
		isWindow: true,
		config: {
			title: 'Title Here',
			bottomBar: {
				height: 50,
				resizable: false
			}
		},
		applyTitle: function(title) {
			if (!Ext.isString(title) || title.length === 0) {
				alert('Title must be valid non-empty string');
			} else {
				return title;
			}
		},
		applyBottomBar: function(bottomBar) {
			if (bottomBar) {
				if(!this.bottomBar) {
					return Ext.create('My.own.WindowBottomBar', bottomBar)
				} else {
					this.bottomBar.setConfig(bottomBar);
				}
			}
		}
	});


	// CREATING A CHILD CLASS

	Ext.define('My.own.WindowBottomBar', {
		config: {
			height: undefined,
			resizable: true
		}
	});


	// CREATING AN INSTANCE OF A PARENT CLASS
	
	var myWindow = Ext.create('My.own.Window', {
		title: 'Hello World',
		bottomBar: {
			height: 60
		}
	});


	// CALLING FUNCTIONS
	alert(myWindow.getTitle());
	myWindow.setTitle('What\'s up world!')
	alert(myWindow.getTitle());
	myWindow.setTitle(null); // returns an alert with an error -> see above
	myWindow.setBottomBar({ height: 100 });
	alert(myWindow.getBottomBar().getHeight()); // alerts 100
```

### Statics

```javascript

	Ext.define('Computer', {
		statics: {
			instanceCount: 0,
			factory: function(brand) {
				// 'this' in static methods refer to the class itself
				return new this({
					brand: brand
				})
			}
		},
		config: {
			brand: null
		}
	});

	var dellComputer = Computer.factory('Dell');
	var appleComputer = Computer.factory('Mac')
```


# Layouts and Containers
+ The most commonly used Container is Panel

```javascript

	Ext.create('Ext.panel.Panel', {
		renderTo: Ext.getBody(),
		width: 400,
		height: 300,
		title: 'Container Panel',
		layout: 'column',
		items: [
			{
				xtype: 'panel',
				title: 'Child Panel 1',
				height: 100,
				// width: '75%'
				columnWidth: 0.5
			}, {
				xtype: 'panel',
				title: 'Child Panel 2',
				height: 100,
				// width: '75%'
				columnWidth: 0.5
			}
		]
	})
```


### HOW THE LAYOUT SYSTEM WORKS

**updateLayout()
+ Internally the framework calls the Container’s updateLayout method which calculates the correct sizes and positions for all of the Container’s children. 
+ Any of the Container’s children will have their updateLayout method called as well. 
+ You typically will not have to ever call updateLayout() in your application code since the framework should handle it for you.

+ A re-layout is triggered when the Container is resized, or when child Component.
+ To prevent the framework from automatically laying out so we can batch multiple operations together we use the suspendLayout flag.

```javascript
	
	var containerPanel = Ext.create('Ext.panel.Panel', {
		renderTo: Ext.getBody(),
		width: 400,
		height: 200,
		title: 'Container Panel',
		layout: 'column',
		suspendLayout: true
	});

	// We could add these both at the same time by passing an array to add(), but we add them separately for now
	containerPanel.add({
		xtype: 'panel',
		title: 'Child Panel 1',
		height: 100,
		columnWidth: 0.5
	});
	containerPanel.add({
		xtype: 'panel',
		title: 'Child Panel 2',
		height: 100,
		columnWidth: 0.5
	});
	
	// To turn off suspend layout
	containerPanel.suspendLayout = false;

	// To trigger layout
	containerPanel.updateLayout();
```


# COMPONENTS

+ All Components are subclasses of the Ext.Component class.
+  A typical application’s Component hierarchy starts with a Viewport at the top, which has other Containers and/or Components nested within it
+ This example showed how to add already instantiated Components to a Container, good in small application

```javascript

	var childPanel1 = Ext.create('Ext.panel.Panel', {
		title: 'Child Panel 1',
		html: 'A Panel'
	});

	var childPanel2 = Ext.create('Ext.panel.Panel', {
		title: 'Child Panel 2',
		html: 'A Panel'
	});

	Ext.create('Ext.container.Viewport', {
		items: [childPanel1, childPanel2]
	})
```


### XTYPES AND LAZY INSTANTIATION

+ Ext.panel.Panel has an xtype of 'panel'
+ In a large application, not all of the Components need to be instantiated right away, and some Components might never be instantiated > 
+ xtype allowes Container’s children to be configured up front, but not instantiated until the Container determines it is necessary. (tab that is not clicked does not have to be rendered yet.)

```javascript

	Ext.create('Ext.tab.Panel', {
		renderTo: Ext.getBody(),
		height: 100,
		width: 200,
		items: [
		    Ext.create('Ext.tab.Panel', {
		    	//xtype: 'panel',
		    	title: '',

		    }),
			{
				xtype: 'panel',
				title: 'Tab One',
				html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In asperiores, omnis magnam blanditiis, voluptatem, vero corrupti aliquam alias assumenda doloribus nam ratione amet possimus eaque! Neque officia cupiditate dolore quo.',
				listeners: {
					render: function() {
						Ext.MessageBox.alert('Rendered One', 'Tab one was rendered.');
					}
				}

			}, {
				xtype: 'panel',
				title: 'Tab Two',
				html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. In asperiores, omnis magnam blanditiis, voluptatem, vero corrupti aliquam alias assumenda doloribus nam ratione amet possimus eaque! Neque officia cupiditate dolore quo.',
				listeners: {
					render: function() {
						Ext.MessageBox.alert('Rendered One', 'Tab two was rendered.');
					}
				}

			}
		]
	});
```


### SHOWING AND HIDING
```javascript

	var panel = Ext.create('Ext.panel.Panel', {
		renderTo: Ext.getBody(),
		title: 'Test',
		html: 'Test Panel',
		hideMode: 'visibility' // default is css property 'display'
	});
	panel.hide();
	panel.show();
```


### FLOATING COMPONENTS
+  are positioned outside of the document flow using CSS absolute positioning

```javascript

	var panel = Ext.create('Ext.panel.Panel', {
		width: 200,
		height: 100,
		floating: true, // position: absolute
		title: 'Test',
		html: 'Test Panel'
	});
```
+ The above code instantiates a Panel but does not render it.
+ Floating Components are automatically rendered to the document body the first time their show method is called, no need for 'renderTo'.

```javascript
	
	panel.show(); // render and show the floating panel
```
+ other methods related to floating components
	+ **draggable** - enable draging floating component
	+ **shadow** - customizes the look of a floating component
	+ **alignTo()** - aligns floating Component to a specific element
	+ **center()** - centers component to its Container

## CREATING CUSTOM COMPONENTS

### TEMPLATE METHODS
```javascript

	Ext.define('My.custom.Component', {
		extend: 'Ext.Component',
		onRender: function() {
			this.callParent(arguments); // call the superclass onRender method
			// perform additional rendering tasks here.
			console.log(2);
		}
	});

	Ext.define('My.custom.OtherComponent', {
		extend: 'My.custom.Component',
		onRender: function() {
			console.log(1);
			this.callParent(arguments);
			console.log(3);
		}
	});

	// 1 2 3
```
+ When subclassing, however, it is it is essential to use template methods to perform class logic, not events. Events may be programmatically suspended, or may be stopped by a handler.


### WHICH CLASS TO EXTEND
+ The Panel class has many capabilities: Border, Header, Header tools, Footer, Containing and managing child Components... > 
+ If these are not needed, then using a Panel is a waste of resources.
+ If the required UI Component is to contain other Components, but does not need any of the previously mentioned additional capabilities of a Panel, then Ext.container.Container is the appropriate class to extend. 
+ If the required UI Component must have a header, footer, or toolbars, then Ext.panel.Panel is the appropriate class to extend. Panel is a container!
+ example of custom component:
	+ the following class is a Component that wraps an HTML image element, and allows setting and getting of the image’s src attribute. It also fires a load event when the image is loaded.

```javascript

	// DEFINING CUSTOM'S COMPONENTS CLASS BY EXTENDING 'Ext.Component'
	Ext.define('Ext.ux.Image', {
		extend: 'Ext.Component',
		alias: 'widget.managedimage', // this component wil have an xtype of 'managedimage'
		autoEl: {
			tag: 'img',
			src: 'Ext.BLANK_IMAGE_URL',4
			cls: 'my-managed-image'
		},
		onRender: function() {
			this.autoEl = Ext.apply(
				{},
				this.initialConfig,
				this.autoEl
			);
			this.callParent(arguments);
			this.el.on('load', this.onLoad, this)
		},
		onLoad: function() {
			this.fireEvent('load', this)
		},
		setSrc: function(src) {
			if (this.rendered) {
				this.el.dom.src = src;
			} else {
				this.src = src;
			}
		},
		getSrc: function(src) {
			return this.el.dom.src || this.src;
		}
	});

	// USING CUSTOM COMPONENT
	var imageObject = Ext.Create('Ext.ux.Image');
	Ext.Create('Ext.panel.Panel', {
		title: 'Image Panel',
		height: 200,
		renderTo: Ext.getBody(),
		items: [imageObject];
	});

	imageObject.on('load', function() {
		console.log('image loaded: ', imageObject.getSrc());
	});

	imageObject.setSrc('http://www.sencha.com/img/sencha-large.png');
```

#MVC CODE

### MODEL
+ contains data, we ususally start by creating the model
+ also may contain business logic covering validation, formating...

```javascript

	Ext.define('MVC.model.Person', {
		extend: 'Ext.data.Model',
		fields: [
			{
				name: 'name',
				type: 'string'
			}, {
				name: 'age',
				type: 'int'
			}
		]
	});
```

### VIEW
+ usually the second step

```javascript

	Ext.define('MVC.view.Detail', {
		extend: 'Ext.form.Panel',
		xtype: 'mvc-DetailView',
		title: 'Detail Panel',
		frame: true,
		items: [
			{
				xtype: 'textfield',
				name: 'name',
				fieldLabel: 'Name'
			}, {
				xtype: 'textfield'
				name: 'age',
				fieldLabel: 'Age'
			}, {
				xtype: 'button',
				text: 'Save',
				itemId: 'SaveRecord'
			}
		]
	});
```

### CONTROLLER
+ buttons event logic belongs here
+ global message bus listening for events on configured components
+ this controller listens for the click event on the save button

```javascript

	Ext.define('MVC.controller.Detail', {
		extend: 'Ext.app.Controller',

		init: function() {
			this.control({
				'mvc-DetailView > button#SaveRecord': {
					click: this.onSaveButtonClick
				}
			});
		},

		onSaveButtonClick: function(btn) {
			var detailView = btn.up('mvc-DetailView'); // get reference to the form
			var data = detailView.getValues(); // get the form inputs
			var store = Ext.getStore('People'); // see if the record exists
			var record = store.getById(parseInt(data.id, 10));
			detailView.updateRecord(); // manually update the record
		}

	});
```

# MVVM
+ model, viewmodel, model + optional viewcontroller
+ the viewmodel facilitates and updates on the model and view through data-bindings rather than events

### MODEL
+ same as in MVC

### VIEW

```javascript

	Ext.define('MVVM.view.Detail', {
		extend: 'Ext.form.Panel',
		xtype: 'mvvm-DetailView',
		requires: [
			'MVVM.view.DetailViewModel'
		],
		controller: 'detailController',
		title: 'Detail Panel',
		frame: true,

		viewModel: {
			type: 'detailForm' // references DetailViewModel
		}

		items: [
			{
				xtype: 'textfield',
				bind: {rec.name},
				fieldLabel: 'Name'
			}, {
				xtype: 'textfield'
				bind: {rec.age},
				fieldLabel: 'Age'
			}, {
				xtype: 'button',
				text: 'Save',
				itemId: 'SaveRecord'
				listeners: {
					'click': 'onSave'
				}
			}
		]
	});
```

### VIEWMODEL

```javascript

	Ext.define('MVVM.view.DetailViewModel', {
		extend: 'Ext.app.ViewModel'
		alias: 'viewmodel.detailform',
		data: {
			rec: null
		}
	});

	$scope.username        |      <-- <input ng-model="username" /> enduser changes the value
	$scope.username -->    |          <input ng-model="username" /> it changes if you change the value of the username
```

### VIEWCONTROLLER
```javascript

	Ext.define('MVVM.view.DetailViewController', {
		extend: 'Ext.app.ViewController',
		alias: 'controller.detailController',
		onSave: function() {
			if (this.getView().isValid()) {
				// do stuff...
			}
		}
	});
```

### Two Way Data-Binding in ExtJS:

```javascript

	Ext.define('MVVM.view.UserViewModel', {
		extend: 'Ext.app.ViewModel'
		alias: 'viewmodel.user',
		data: {
			firstname: 'Daniel',
			lastname: 'Hockza'
		},

		formulas: {
	        // We'll explain formulas in more detail soon.
	        name: function (get) {
	            var fn = get('firstName'), ln = get('lastName');
	            return (fn && ln) ? (fn + ' ' + ln) : (fn || ln || '');
	        }
	    }
	});

	Ext.define('MyApp.view.UserView', {
		extend: 'Ext.panel.Panel',
        layout: 'form',
        viewModel: {
        	type: 'user'
        },
        items: [{
	        fieldLabel: 'First Name',
		        bind: '{firstName}' // ng-model="firstname"
		    },{
		        fieldLabel: 'Last Name',
		        bind: '{lastName}'
		    }, {
		    	xtype: 'label',
		    	bind: '{name}'
		    },
		    {
		        xtype: 'button',
		        text: 'Submit',
		        bind: {
		            hidden: '{!name}'
		        }
	    }]
	});
```



#### This is where the biggest files are: 
+ D:\Github\MvcMvvm\ext\build\examples