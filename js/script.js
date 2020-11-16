window.onload = function () {
    // Date picker
    $('#date').pickadate({
        max: new Date()
    });
}

// Dropdown plugin data
var ddData = [{
    text: "Template 1",
    value: "template_1.jpg",
    selected: true,
    description: "Template description",
    imageSrc: "template/template_1.jpg"
}, {
    text: "Template 2",
    value: "template_2.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/template_2.jpg"
}, {
    text: "Template 3",
    value: "template_3.jpg",
    selected: false,
    description: "Description with LinkedIn",
    imageSrc: "template/template_3.jpg"
}, {
    text: "Template 4",
    value: "template_4.jpg",
    selected: false,
    description: "Description with Foursquare",
    imageSrc: "template/template_4.jpg"
}, {
    text: "Template 5",
    value: "certificate1.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/certificate1.jpg"
}, {
    text: "Template 6",
    value: "certificate2.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/certificate2.jpg"
}, {
    text: "Template 7",
    value: "certificate3.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/certificate3.jpg"
}, {
    text: "Template 8",
    value: "certificate4.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/certificate4.jpg"
}, {
    text: "Template 9",
    value: "certificate5.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/certificate5.jpg"
}, {
    text: "Template 10",
    value: "certificate6.jpg",
    selected: false,
    description: "Template description",
    imageSrc: "template/certificate6.jpg"
}];


var template;
$('#myDropdown').ddslick({
    data: ddData,
    width: 400,
    selectText: "Select your template",
    imagePosition: "right",
    onSelected: function (data) {
        //callback function: do something with selectedData;
        // console.log(data.selectedData.value);
        template = data.selectedData.value;
        $('#template-img').attr('src', "template/" + template);
    }
});
// console.log(template);
$('#view-btn').hide();
$("#generate-btn").click(function (e) {
    e.preventDefault();
    var name = document.getElementById('fname').value;
    var event = document.getElementById('event').value;
    var date = document.getElementById('date').value;
    console.log(template + " " + event + " " + name + " " + "date");
    $.ajax({

        url: 'apis/index.php',
        data: {
            name: name,
            event: event,
            date: date,
            template: template
        },
        type: 'POST',
        success: function (response) {
            console.log((response));

            var res = JSON.parse(response);
            if (res.status == "success") {
                // alert(res.message);
                // $("#generate-btn").hide();
                // $('#view-btn').show();
                var location = res.message;
                swal('Certificate generated', '', 'success').then((
                    value) => {
                    window.location = "./certificates/" + location + ".jpg";
                });
            } else {
                swal(res.message, '', 'error');

            }
        }
    });
});

(function ($) { // Begin jQuery
    $(function () { // DOM ready
        // Toggle open and close nav styles on click
        $('#nav-toggle').click(function () {
            $('nav ul').slideToggle();
        });
        // Hamburger to X toggle
        $('#nav-toggle').on('click', function () {
            this.classList.toggle('active');
        });
    }); // end DOM ready
})(jQuery); // end jQuery