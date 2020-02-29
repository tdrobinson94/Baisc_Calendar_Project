'use strict';
const $ = require('jquery');
const _ = require('lodash');
const { MONTHS } = require('./utilities/months.constant.js');

let clock = new Date();
let month = clock.getMonth();
let year = clock.getFullYear();
var day = clock.getDate();

//Template literals for info that goes inside of $('.num-box')
const num_container = `<div class="num-container"><span class="num"></span></div>`;
const weekday = `<div class="weekday"><span class="num-date"></span></div>`;
const main_info = `<div class="main-info"></div>`;
const date_value = `<div class="date-value"></div>`;
const close_day = `<div class="close-day entypo-down-open"></div>`;

console.log("Begin your javascript");


// Creates the contents of each calendar box
(function setupWeeks() {
    let numOfBoxes = $('.num-box').length + 1;

    //Add html for each row or week
    for (let i=1; i<=numOfBoxes; i++) {        
        $('.num-box').html(num_container + weekday + main_info + date_value + close_day);
    }
})();

$(window).bind('mousewheel DOMMouseScroll touchmove', function () {
    $("html, body").stop(true, false);
});

//================ Adding month name to top of calendar dynamically ===============//
$(document).find('#month').html(`
    <option value="${month}" selected>${MONTHS[month].name}</option>
    <option value="0">${MONTHS[0].name}</option>
    <option value="1">${MONTHS[1].name}</option>
    <option value="2">${MONTHS[2].name}</option>
    <option value="3">${MONTHS[3].name}</option>
    <option value="4">${MONTHS[4].name}</option>
    <option value="5">${MONTHS[5].name}</option>
    <option value="6">${MONTHS[6].name}</option>
    <option value="7">${MONTHS[7].name}</option>
    <option value="8">${MONTHS[8].name}</option>
    <option value="9">${MONTHS[9].name}</option>
    <option value="10">${MONTHS[10].name}</option>
    <option value="11">${MONTHS[11].name}</option>
    `)

//================ Adding year to top of calendar dynamically ===============//
$(document).find('#year').html(`
    <option value="${year - 5}">${year - 5}</option>
    <option value="${year - 4}">${year - 4}</option>
    <option value="${year - 3}">${year - 3}</option>
    <option value="${year - 2}">${year - 2}</option>
    <option value="${year - 1}">${year - 1}</option>
    <option value="${year}" selected>${year}</option>
    <option value="${year + 1}">${year + 1}</option>
    <option value="${year + 2}">${year + 2}</option>
    <option value="${year + 3}">${year + 3}</option>
    <option value="${year + 4}">${year + 4}</option>
    <option value="${year + 5}">${year + 5}</option>
    `)

//========================================== Calendar Basics ===========================================//
$('.month-selector, .year-selector').on('change', function (event) {
    event.preventDefault();
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('clicked-day');
    $('.num-date').removeClass('first-day');
    $('.num-box').removeClass('selected-day');

    //=================== Render Current month days as well as next month days ==================//
    let renderMonth = function () {
        MONTHS[1].days = Number($('#year').val()) % 4 == 0 ? 29 : 28;
        let currentMonth = $(document).find('#month').val();
        let nextMonth = Number($(document).find('#month').val()) + 2;
        let currentYear = $(document).find('#year').val();
        let startOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        let monthDays = MONTHS[$(document).find('#month').val()].days;
        let days = $(document).find('.days').children();
        $(document).find('.num').empty();
        _.range(1, 43).forEach(function (dayIndex, i) {
            let day = $(days[startOfMonth + dayIndex - 1]);
            if (clock.getDate() === dayIndex && clock.getMonth() == $('#month').val() && clock.getFullYear() == $('#year').val()) {
                day.find('.num-container').parent().addClass("day_background_color");
                day.find('.weekday').children().addClass('current-day');
                day.find('.weekday').parent().addClass('clicked-day');
                day.find('.num-container').parent().addClass("selected-day");
                day.find('.transaction-button').addClass('show');
                day.find('.num-date').parent().parent().removeClass("dead_month_color");
            } else {
                day.find('.num-container').parent().removeClass("day_background_color");
                day.find('.weekday').children().removeClass('current-day');
                day.find('.num-date').parent().parent().removeClass("dead_month_color");
            }
            if (dayIndex > monthDays) {
                day.find('.num').html(dayIndex - monthDays).parent().parent().addClass("dead_month_color");
                if (nextMonth == 13) {
                    nextMonth = 1;
                    currentYear = Number(currentYear) + 1;
                }
                if (nextMonth < 10) {
                    let newMonth = nextMonth;
                    let standardMonth = '0' + nextMonth;
                    if ((dayIndex - monthDays) < 10) {
                        let newDayIndex = (dayIndex - monthDays);
                        let standardDayIndex = '0' + (dayIndex - monthDays);
                        day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);
                        day.find('.num-date').html(newDayIndex).parent().parent().addClass("dead_month_color");
                    } else {
                        day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
                        day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
                    }
                } else {
                    let standardMonth = '0' + nextMonth;
                    if ((dayIndex - monthDays) < 10) {
                        let newDayIndex = (dayIndex - monthDays);
                        let standardDayIndex = '0' + (dayIndex - monthDays);
                        day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + standardDayIndex);;
                        day.find('.num-date').html(newDayIndex).parent().parent().addClass("dead_month_color");
                    } else {
                        day.find('.date-value').html(currentYear + '-' + standardMonth + '-' + (dayIndex - monthDays));
                        day.find('.num-date').html((dayIndex - monthDays)).parent().parent().addClass("dead_month_color");
                    }
                }
            } else {
                day.find('.num').html(dayIndex);
                let thisMonth = (Number(currentMonth) + 1);
                if (thisMonth < 10) {
                    let newMonth = thisMonth
                    let standardNewMonth = '0' + thisMonth;
                    if (dayIndex < 10) {
                        let newDays = dayIndex;
                        let standardNewDays = '0' + dayIndex;
                        day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + standardNewDays);
                        day.find('.num-date').html(newDays);
                    } else {
                        day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (dayIndex));
                        day.find('.num-date').html((dayIndex));
                    }
                } else {
                    if (dayIndex < 10) {
                        let newDays = dayIndex;
                        let standardNewDays = '0' + dayIndex;
                        day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + standardNewDays);
                        day.find('.num-date').html(newDays);
                    } else {
                        day.find('.date-value').html(currentYear + '-' + thisMonth + '-' + (dayIndex));
                        day.find('.num-date').html((dayIndex));
                    }
                }
            }
            if (day.find('.num-date').html() === '1') {
                day.find('.num-date').addClass('first-day');
            } else {
                day.find('.num-date').removeClass('first-day');
            }
        })

    };

    //=================== Render Previous month days ==================//
    function renderPrevMonthDays() {
        MONTHS[1].days = Number($(document).find('#year').val()) % 4 == 0 ? 29 : 28
        let currentYear = $(document).find('#year').val();
        let prevMonth = Number($(document).find('#month').val());
        let startOfMonth = new Date($(document).find('#year').val(), $(document).find('#month').val(), 1).getDay();
        let monthDays = MONTHS[$(document).find('#month').val()].days;
        let prevMonthDays = $(document).find('#month').val() == 0 ? 31 : MONTHS[$(document).find('#month').val() - 1].days;
        let days = $(document).find('.days').children();
        let prevDays = _.range(1, prevMonthDays + 1).slice(-startOfMonth);
        _.range(0, startOfMonth).forEach(function (dayIndex) {
            let day = $(days[dayIndex]);
            if (startOfMonth > dayIndex) {
                day.find('.num').html(prevDays[dayIndex]);
                if (prevMonth == 0) {
                    prevMonth = 12;
                    currentYear = Number(currentYear) - 1;
                }
                if (prevMonth < 10) {
                    let newMonth = prevMonth;
                    let standardNewMonth = '0' + prevMonth;
                    day.find('.date-value').html(currentYear + '-' + standardNewMonth + '-' + (prevDays[dayIndex]));
                    day.find('.num-date').html((prevDays[dayIndex]));
                } else {
                    day.find('.date-value').html(currentYear + '-' + prevMonth + '-' + (prevDays[dayIndex]));
                    day.find('.num-date').html((prevDays[dayIndex]));
                }

                day.find('.num-date').parent().parent().addClass("dead_month_color");
                day.find('.num-container').parent().removeClass("day_background_color");
            }
        })
    }
    function scrollDay() {
        if ($('.num-box').hasClass('day_background_color') === true) {
            $('body, html').animate({ scrollTop: $('.day_background_color').offset().top - 150 }, 500);

            if ($(document).find('#todays-day').html($('.current-day').html()) < 10) {
                $(document).find('#todays-day').html('0' + $('.current-day').html())
            } else {
                $(document).find('#todays-day').html($('.current-day').html())
            }
        } else if ($('.num-date').hasClass('first-day') === true) {
            $('.first-day').parent().parent().addClass('selected-day');
            $('body, html').animate({ scrollTop: $('.first-day').offset().top - 150 }, 500);
            $('.first-day').parent().parent().addClass('clicked-day');
            $('.dead_month_color').removeClass('clicked-day');
        }
    }
    
    window.setTimeout(scrollDay, .5);
    renderMonth();
    renderPrevMonthDays();

})
$('.month-selector').change();

//============= Scroll Months functionality ==================//

//===== Go to previous month =======//
$('.prev').click(function () {
    $('.extra').hide()
  $('.add-item-form').removeClass('show-form');
  $('.num-box').removeClass('selected-day');
  $('.clicked-day').removeClass('double-click');
  $('.num-date').removeClass('first-day');
  $('.transaction-button').removeClass('show');
  if($(document).find('#year').val() <= (year - 5)){
    $(document).find('#year').val(year - 5).change()
    $(document).find('#month').val(0).change()
  } else {
    if($('#month').val() == null || $('#month').val() == 0){
      $(document).find('#month').val(11).change()
      $(document).find('#year').val(Number($(document).find('#year').val()) - 1).change()
    } else {
      $(document).find('#month').val(Number($(document).find('#month').val()) - 1).change();
    }
  }

  function scrollDay(){
      if ($('.num-box').hasClass('selected-day')){
          console.log('change');
          $('body, html').animate({scrollTop: $('.selected-day').offset().top - 150}, 500);
      }
  }
  window.setTimeout(scrollDay, 500);
});

//===== Go to today's date =======//
$('.current').click(function () {
    $('.extra').hide()
  $('.add-item-form').removeClass('show-form');
  $('.num-box').removeClass('selected-day');
  $('.clicked-day').removeClass('double-click');
  $('.num-date').removeClass('first-day');
  $('.transaction-button').removeClass('show');
  $(document).find('#month').val(month).change()
  $(document).find('#year').val(year).change()
  $('body, html').animate({scrollTop: $('.day_background_color').offset().top - 150}, 500);
});

//===== Go to next month =======//
$('.next').click(function(){
    $('.extra').hide()
    $('.add-item-form').removeClass('show-form');
    $('.num-box').removeClass('selected-day');
    $('.clicked-day').removeClass('double-click');
    $('.num-date').removeClass('first-day');
    $('.transaction-button').removeClass('show');
    if ($(document).find('#year').val() >= (year + 5) && $(document).find('#month').val() == 11) {
        $(document).find('#year').val(year + 5).change()
        $(document).find('#month').val(11).change()
    } else {
        if ($(document).find('#month').val() == null || $(document).find('#month').val() == 11) {
            $(document).find('#month').val(0).change()
            $(document).find('#year').val(Number($(document).find('#year').val()) + 1).change()
        } else {
            $(document).find('#month').val(Number($(document).find('#month').val()) + 1).change();
        }
    }

    function scrollDay() {
        if ($('.num-box').hasClass('selected-day')) {
            console.log('change');
            $('body, html').animate({ scrollTop: $('.selected-day').offset().top - 150 }, 500);
        }
    }
    window.setTimeout(scrollDay, 500);
});


// Click day functionality
$('.num-box').click(function(e) {
    if (e.target === $(this).children().get()[4]) {
        console.log('closing day');
        $('.clicked-day').removeClass('double-click');
        $('.extra').hide()
    } else {
        if ($(this).hasClass('dead_month_color')) {
            $('.dead_month_color').click(false);
        } else {
            $('.num-box').removeClass('clicked-day');
            $('.add-item-form').removeClass('show-form');
            $('.extra').hide()
            $(this).addClass('clicked-day');
        }

        if ($(this).hasClass('clicked-day')) {
            $('.clicked-day').dblclick(function () {
                console.log('opening day');
                $('.clicked-day').addClass('double-click');
                $('.extra').show()
            })
        } else {

        }

        // Changes behavior to single click in mobile
        if ($(window).width() <= 500) {
            $('.clicked-day').addClass('double-click');
            $('.extra').show()
        } else {

        }
    }

    function scrollDay() {
        $('body, html').animate({ scrollTop: $('.clicked-day').offset().top - 250 }, 500);
    }

    window.setTimeout(scrollDay, 300);

});

//Open form to add items to the calendar
$('.add-item-button').click(function() {
    $('.select-item label').removeClass('selected');
    $('.checkbox label').removeClass('selected');
    let month = (clock.getMonth() + 1);
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = clock.getFullYear() + '-' + month + '-' + day;
    $('.date-input').val(today);
    $('.add-item-form').addClass('show-form');
    $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').addClass('show-input');

    if ($(window).width() <= 800) {

    } else {
        $('.clicked-day').removeClass('double-click');
    }

    $('.select-item label.item_1').addClass('selected');
    $('.checkbox label.frequency_1').addClass('selected');
})

$('.close-form').click(function () {
    $('.add-item-form').removeClass('show-form');
})

//======== Only select one checkbox at a time ========//
$('.frequency').on('change', function () {
    $('.frequency').not(this).prop('checked', false);
});
$('.checkbox').on('change', function () {
    $('.checkbox').not(this).prop('checked', false);
});

//Select type in form
$('.select-item label').click(function () {

    $('.select-item label').removeClass('selected');

    switch ($(this).hasClass('item_1')) {
        case $(this).hasClass('item_1'):
            console.log("Event")
            $(this).addClass('selected');
            break;
        case $(this).hasClass('item_2'):
            console.log("Reminder")
            $(this).addClass('selected');
            break;
        case $(this).hasClass('item_3'):
            console.log("Task")
            $(this).addClass('selected');
            break;
        case $(this).hasClass('item_4'):
            console.log("Budget")
            $(this).addClass('selected');
            break;
        case $(this).hasClass('item_5'):
            console.log("Food")
            $(this).addClass('selected');
            break;
    }

});

//Event type click
$('.item_1').click(function () {
    $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').addClass('show-input');
    $('.amount-input, .amount-label').removeClass('show-input');
})
$('.item_2').click(function(){
    $('.time-input, .time-label').addClass('show-input');
    $('.event-description, .description-label, .location-input, .location-label').removeClass('show-input');
    $('.amount-input, .amount-label').removeClass('show-input');
})
$('.item_3').click(function () {
    $('.event-description, .description-label, .time-input, .time-label').addClass('show-input');
    $('.amount-input, .amount-label, .location-input, .location-label').removeClass('show-input');
})
$('.item_4').click(function () {
    $('.event-description, .description-label, .location-input, .location-label, .time-input, .time-label').removeClass('show-input');
    $('.amount-input, .amount-label').addClass('show-input');
})
$('.item_5').click(function () {
    $('.event-description, .description-label').addClass('show-input');
    $('.amount-input, .amount-label, .location-input, .location-label, .time-input, .time-label').removeClass('show-input');
})

//Select frequency in form
$('.checkbox label').click(function () {

    $('.checkbox label').removeClass('selected');

    switch ($(this).hasClass('frequency_1')) {
        case $(this).hasClass('frequency_1'):
            console.log("Item 1")
            $(this).addClass('selected')
            break;
        case $(this).hasClass('frequency_2'):
            console.log("Item 2")
            $(this).addClass('selected')
            break;
        case $(this).hasClass('frequency_3'):
            console.log("Item 3")
            $(this).addClass('selected')
            break;
        case $(this).hasClass('frequency_4'):
            console.log("Item 4")
            $(this).addClass('selected')
            break;
        case $(this).hasClass('frequency_5'):
            console.log("Item 5")
            $(this).addClass('selected')
            break;
        case $(this).hasClass('frequency_6'):
            console.log("Item 5")
            $(this).addClass('selected')
            break;
        case $(this).hasClass('frequency_7'):
            console.log("Item 5")
            $(this).addClass('selected')
            break;
    }

});


