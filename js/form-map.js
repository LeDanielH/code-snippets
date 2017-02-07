var Form = {
    $labels: $('.map__form-label'),
    $inputs: $('.map__form-input'), // used for placeholders animation
    $inputsRequired: $('.map__form-input[required]'), // used for form validation
    $addressInput: $('.map__form-input--address'), // used for cross removing address input
    $mapAddressInput: document.getElementById('form-address'),  // special input used as a serch box for Google maps
    $closeButton: $('.map__form-cross'), // address input close button
    $textarea: $('.map__form-input--why'),
    $nameInput: $('.map__form-input--name'),
    $emailInput: $('.map__form-input--email'),
    $fileNameInput: $('.map__form-input--file'),
    $fileAdd: $('.map__form-file__title-add'),
    $fileUploaded: $('.map__form-file__title-uploaded'),
    $addFileButton: $('.map__form-file__custominputtom'),
    $mapForm: $('.map__form'),
    $mapControls: $('.map__content--addtree .map__controls'),
    $div: $('#mapformcanvas'),
    $dropPin: $('.map__addtree-drop'),
    $hand: $('.map__addtree-drop__hand'),
    oldX: 0,
    distance: 0,
    lastMove: 0,
    lastMouseX: -1,
    mouseTravelDistance: 0,
    validate: { // validation names same as input attr name, to validate another input simply add another key with input name. If you don't want to validate an input, remove it from here and remove required attribute from an input
        name: /^[a-zA-ZàáâäãåąčćęèěéêëėįìíîïłńòóôöõøùúûüųůūÿýżźñçčšřžÀÁÂÄÃÅĄŠŘŽÝĆČĖĘĚÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØŮÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,40}$/,
        email: /^[a-zA-Z0-9!#$%&'\*+\/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'\*+\/=?^_`{|}~]+)*@(([a-zA-Z0-9]([-a-zA-Z0-9]*[a-zA-Z0-9]+)?){1,63}\.)+([a-zA-Z0-9]([-a-zA-Z0-9]*[a-zA-Z0-9]+)?){2,63}$/,
        address: /.*\S.*/, // regex not empty, todo google address validace?
    },

    isInited: false,
    isUploaded: false,
    timeout: null,

    movePlaceholder: function (el) {
        el.closest(Form.$labels).addClass('is-focused');
    },

    resetPlaceholder: function (el) {
        inputLength = el.val().length;
        if (inputLength === 0 && !el.is(":focus")) {
            el.closest(Form.$labels).removeClass('is-focused');
        } else {
            el.closest(Form.$labels).addClass('is-focused');
        }
    },

    showCross: function () {
        addressLength = $(Form.$addressInput).val().length;
        if (addressLength > 0) {
            Form.$closeButton.addClass('visible');
        } else {
            Form.$closeButton.removeClass('visible');
        }
    },

    removeAddressInputContent: function () {
        Form.$addressInput.val('');
        Form.$closeButton.removeClass('visible');
        Form.$dragableMarker.setMap(null);
        Form.$dropPin.removeClass('is-hidden').addClass('is-initial');

        TweenLite.set('.map__addtree-drop', {
            clearProps: 'all'
        });
        Form.timelines.moveHand.play();
    },

    getFileName: function () {
        Form.filename = Form.$fileNameInput.val().split('\\').pop();
        if (Form.filename.length > 25) Form.filename = Form.filename.substr(0, 21) + '...';

        if (Form.filename.length > 0) {
            Form.$fileNameInput.parent().addClass('is-uploaded');
            Form.$fileUploaded.text(Form.filename);
            Form.isUploaded = true;
        }
    },

    removeFileName: function (e) {
        if (Form.isUploaded) {
            e.preventDefault();
            Form.$fileNameInput.parent().removeClass('is-uploaded');
            Form.isUploaded = false;
        }
    },

    isDirty: function (el) {
        el.parent().addClass('is-dirty');
    },

    isEmpty: function (el) {
        el.parent().addClass('is-empty');
        el.parent().removeClass('is-invalid');
        el.parent().removeClass('is-valid');
    },

    isTooLong: function (input) {
        if (input.val().length > 27) {
            input.siblings('.map__form-error').addClass('is-too-long');
        } else {
            input.siblings('.map__form-error').removeClass('is-too-long');
        }
    },

    validateInputs: function (el) {
        var inputAttr = el.attr('name');
        var val = el.val().replace(/ /g, '');

        // if input empty
        if (el.val().length === 0) {

            Form.isEmpty(el);

            // if input not empty
        } else if (el.val().length > 0) {
            el.parent().removeClass('is-empty');

            // if not matching regex
            if (!val.match(Form.validate[inputAttr])) {
                el.parent().addClass('is-invalid');
                el.parent().removeClass('is-valid');

                // if matching regex
            } else if (val.match(Form.validate[inputAttr])) {
                el.parent().removeClass('is-invalid');
                el.parent().addClass('is-valid');
            }
        }

        // will check against input containing required attribute length
        Form.inputsValidLenght = $('.map__form-label.is-valid').length;
    },

    resetForm: function () {
        $(Form.$inputs).each(function () {
            $(this).val('');
            $(this).parent().removeClass('is-valid is-invalid is-empty is-focused is-uploaded');
        });
        Form.$closeButton.removeClass('visible');
        Form.removeAddressInputContent();
    },

    sendData: function () {
        //console.log('data send');
    },

    submitForm: function (e) {
        $(Form.$inputsRequired).each(function () {
            var $this = $(this);
            Form.validateInputs($this);
        });

        //console.log('submittin data');
        if (Form.inputsValidLenght !== Form.$inputsRequired.length) {
            // alert('Form invalid says Daniel: ' + Form.inputsValidLenght + '!=' + Form.$inputsRequired.length);
            e.preventDefault();
            return false;
        }

        //console.log('Form valid says Daniel');

        var url = Form.$mapForm.attr('action');
        //console.log(url);
        if (typeof url === 'undefined' || url === '') { return true; }
        Form.sendData();
        return false;
    },

    mapMarker: {
        url: HlasLesa.assetsUrl + 'img/map/pin-jehla-nohand.png',
        size: new google.maps.Size(62, 97),
        scaledSize: new google.maps.Size(60, 85),
        anchor: new google.maps.Point(30, 90)
    },

    buildMap: function () {

        Form.mapOptions = {
            zoom: 7,
            minZoom: 7,
            maxZoom: 18,
            scrollwheel: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            mapTypeId: gm.MapTypeId.ROADMAP,
            center: { lat: 49.847930, lng: 15.483154 },
            styles: Smap.mapOptions.styles,
            panControl: false
        };

        Form.$map = new gm.Map(Form.$div[0], Form.mapOptions);
        Form.geocoder = new gm.Geocoder();
        Form.infowindow = new gm.InfoWindow();

        Form.$dragableMarker = new gm.Marker({
            map: Form.$map,
            draggable: true,
            icon: Form.mapMarker
        });

        Form.overlay = new google.maps.OverlayView();
        Form.overlay.draw = function () { };
        Form.overlay.setMap(Form.$map);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                Form.initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                Form.$map.setCenter(Form.initialLocation);
            });
        }

        Form.$searchBox = new gm.places.Autocomplete(Form.$mapAddressInput, {
            componentRestrictions: {
                country: 'cz'
            }
        });

        Form.$map.addListener('bounds_changed', function () {
            Form.$searchBox.setBounds(Form.$map.getBounds());
        });

        Form.$searchBox.addListener('place_changed', function () {
            var place = Form.$searchBox.getPlace();
            Form.bounds = new gm.LatLngBounds();
            Form.$dragableMarker.setMap(Form.$map);
            Form.$dragableMarker.title = place.name;
            Form.$dragableMarker.setPosition(place.geometry.location);
            Form.$dropPin.addClass('is-hidden');

            if (place.geometry.viewport) {
                Form.bounds.union(place.geometry.viewport);
            } else {
                Form.bounds.extend(place.geometry.location);
            }

            Form.$map.fitBounds(Form.bounds);
        });
        Smap.initCustomControls(Form.$mapControls, Form.$map);
    },

    timelines: {
        moveHand: new TimelineMax({
            repeat: -1,
            repeatDelay: 2,
            paused: true
        })
    },

    moveHand: function () {
        var duration = 1.7;
        var easeingFoward = Power0.easeOut;
        var easeingBackward = Elastic.easeOut.config(0.55, 0.35); // intentsity, repeats
        Form.timelines.moveHand
            .to(Form.$hand, duration, {
                x: '-30px',
                ease: easeingFoward
            })
            .to(Form.$hand, duration / 3, {
                x: '0px',
                ease: easeingBackward
            })
            .to(Form.$hand, duration, {
                x: '-30px',
                ease: easeingFoward
            })
            .to(Form.$hand, duration / 3, {
                x: '0px',
                ease: easeingBackward
            });
    },

    dropTreeOnMap: function () {
        Draggable.create('.map__addtree-drop', {
            type: 'x, y',
            bounds: '.map__addtree',
            parseTransform: true,

            onDragStart: function () {
                $('.map__addtree-drop').removeClass('is-initial');
                Form.timelines.moveHand.pause();

                setTimeout(function () {
                    $('.map__addtree-drop').addClass('can-shake');
                }, 800)
            },
            onDrag: function (e) {
                var maxTreeRotation = 20;
                var maxShadowTransform = 60;
                var maxShadowScale = 1.2;

                var mouseCurrentXPos = e.pageX;
                var refreshRate = 50;
                var rotationIncrementValue = (mouseCurrentXPos - Form.lastMouseX) / maxTreeRotation;
                var translateIncrementValue = (mouseCurrentXPos - Form.lastMouseX) / maxShadowTransform;
                var scaleIncrementValue = (mouseCurrentXPos - Form.lastMouseX) / maxShadowScale;

                Form.tiltTree = setTimeout(function () {
                    var treeRotationRatio = Math.max(-1, Math.min((rotationIncrementValue), 1));
                    var shadowTranslateRatio = Math.max(-1, Math.min((translateIncrementValue), 1));
                    var shadowScaleRatio = Math.max(-1, Math.min((scaleIncrementValue), 1));

                    $('.map__addtree-drop__tree').css('transform', 'rotate(' + (treeRotationRatio * maxTreeRotation) + 'deg)');
                    $('.map__addtree-drop__shadow').css('transform', 'translateX(' + -(shadowTranslateRatio * maxShadowTransform) + 'px) scaleX(' + Math.abs(shadowScaleRatio * maxShadowScale) + ')');

                    Form.lastMouseX = mouseCurrentXPos;


                }, refreshRate);

                clearTimeout(Form.straightenTree);
                Form.straightenTree = setTimeout(function () {
                    $('.map__addtree-drop__tree').css('transform', 'rotate(' + 0 + 'deg)');
                    $('.map__addtree-drop__shadow').css('transform', 'translateX(' + 0 + 'px)');
                }, refreshRate);
            },

            onDragEnd: function (e) {
                var offsetLeft = Form.$div.offset().left; // get map offset
                var offsetTop = Form.$div.offset().top;

                var dropPinHeight = Form.$dropPin.height();
                var dropPinWidth = Form.$dropPin.width();

                var mouseXAxis = e.pageX - offsetLeft;
                var mouseYAxis = e.pageY - offsetTop;

                var dropPinDifference = e.pageY - Form.$dropPin.offset().top - dropPinHeight;

                var point = new gm.Point(mouseXAxis, mouseYAxis - dropPinDifference);
                var latlong = Form.overlay.getProjection().fromContainerPixelToLatLng(point);

                Form.placeMarker(latlong);
                Form.$map.panTo(latlong);
                Form.$dropPin.addClass('is-hidden');

                $('.map__addtree-drop').removeClass('can-shake');
                Form.geocodePosition(Form.$dragableMarker.getPosition());
                gm.event.addListener(Form.$dragableMarker, 'dragend', function () {
                    Form.geocodePosition(Form.$dragableMarker.getPosition());
                });
            }
        })
    },

    disableAutocomplete: function () {
        gm.event.clearInstanceListeners(Form.$mapAddressInput);
    },

    placeMarker: function (location) {
        Form.$dragableMarker = new gm.Marker({
            map: Form.$map,
            draggable: true,
            icon: Form.mapMarker,
            position: location
        });
    },

    geocodePosition: function (position) {
        Form.geocoder.geocode({
            latLng: position
        }, function (results) {
            if (status = gm.GeocoderStatus.OK) {
                if (results.length > 0) {
                    $addressInput = $(Form.$mapAddressInput);
                    $(Form.$mapAddressInput).val(results[0].formatted_address);
                    $(Form.$mapAddressInput).trigger('focus').trigger('blur');
                    Form.showCross();
                }
            } else {
                $(Form.$mapAddressInput).val(results[0].geometry.location.lat, responses.results[0].geometry.location.lng);
            }
        })

    },

    init: function () {
        if (!smapApi || Form.isInited) {
            return;
        }

        Form.buildMap();

        $(Form.$inputs).on('focus', function () {
            var $this = $(this);
            Form.movePlaceholder($this);
        });

        $(Form.$inputs).on('blur keyup keypress', function () {
            var $this = $(this);
            Form.resetPlaceholder($this);

            if ($this.parent().hasClass('is-dirty')) {
                Form.validateInputs($this);
            }
        });

        $(Form.$inputs).on('blur', function () {
            var $this = $(this);
            Form.isDirty($this);
            Form.validateInputs($this);
        });

        $(Form.$fileNameInput).on('change', Form.getFileName);
        $(Form.$fileNameInput).on('click', function (e) {
            Form.removeFileName(e);
        });
        $(Form.$addressInput).on('keyup keypress', Form.showCross);
        $(Form.$closeButton).on('click', Form.removeAddressInputContent);
        $(Form.$mapForm).on('submit', Form.submitForm);

        $(Form.$textarea).on('click', function () { // make sure textarea gets a focus
            $(this).focus();
        });

        Form.dropTreeOnMap();
        Form.moveHand();

        Form.isInited = true;
    },
    initOnMobile: function () {
        $(Form.$addressInput).on('focus keyup keypress', Form.disableAutocomplete);
    }
};
