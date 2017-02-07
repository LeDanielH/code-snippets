var dataLayer = [];
var getSomeInputData = function () {
    var objForData = {};

    $.each(Anal.dataAnalAttributes, function () {
        var $inputs = $(this);
        var dataKey = $inputs.attr('data-anal');

        if (dataKey == 'some_attr_name') {
            dataVal = $inputs.find('input[type=text]').map(function () {
                return $(this).val();
            }).toArray().join(' ').replace(/,/g, '.').replace(/[ ,]+/g, ', ');
        } else if (dataKey = 'some_other_attr_name') {
            dataVal = $inputs.find('span.label').text().toLowerCase() + 'x' + $inputs.find('input[type=text]').val();
        }

        objForData[dataKey] = dataVal;
    });
    try {
		dataLayer.push(objForData);
	} catch(error) {
		console.log('getSomeInputData', error);
	}
}
