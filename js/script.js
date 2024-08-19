$(document).ready(function () {
  function smoothScrolling() {
    // Add smooth scrolling to all links
    $("a").on("click", function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          800,
          function () {
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          }
        );
      } // End if
    });
  }

  // Generate Calendar
  function generateCalendar(day, month, year) {
    var monthNames = [
      "THÁNG 1", "THÁNG 2", "THÁNG 3", "THÁNG 4", "THÁNG 5", "THÁNG 6", "THÁNG 7", "THÁNG 8", "THÁNG 9", "THÁNG 10", "THÁNG 11", "THÁNG 12"
    ];

    var dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    var firstDay = new Date(year, month - 1, 1).getDay();
    var daysInMonth = new Date(year, month, 0).getDate();

    var $table = $('<table></table>');
    var $caption = $('<caption></caption>').text(monthNames[month - 1] + ' / ' + year);
    var $thead = $('<thead></thead>');
    var $headerRow = $('<tr></tr>');

    // Add day of the week headers
    dayNames.forEach(function (dayName) {
      $headerRow.append($('<th></th>').text(dayName));
    });

    $thead.append($headerRow);
    var $tbody = $('<tbody></tbody>');
    var $currentRow = $('<tr></tr>');
    var dayOfWeek = 0;

    // Fill in the days of the month
    for (var i = 0; i < firstDay; i++) {
      $currentRow.append($('<td></td>'));
      dayOfWeek++;
    }

    for (var date = 1; date <= daysInMonth; date++) {
      if (dayOfWeek == 7) {
        $tbody.append($currentRow);
        $currentRow = $('<tr></tr>');
        dayOfWeek = 0;
      }

      var $cell;

      if (date == day) {
        $cell = $('<td></td>').addClass('highlight');
        $cell.append($('<div></div>').text(date));
      } else {
        $cell = $('<td></td>').text(date);
      }

      $currentRow.append($cell);
      dayOfWeek++;
    }

    // Fill the remaining cells of the last week with empty cells
    while (dayOfWeek < 7) {
      $currentRow.append($('<td></td>'));
      dayOfWeek++;
    }

    $tbody.append($currentRow);

    $table.append($caption).append($thead).append($tbody);
    return $table;
  }

  // Show/Hide Location options based on Attendance Confirmation
  $('input[name="confirm"]').on('change', function () {
    if ($(this).val() === 'yes') {
      $('#location-group').removeClass('d-none'); // Show location options
    } else {
      $('#location-group').addClass('d-none'); // Hide location options
    }
  });

  // Form validate and submit
  $('form').on('submit', function (event) {
    event.preventDefault(); // Always prevent the default form submission

    var isValid = true;
    var $validMessage = $('#valid-message');
    var $submitButton = $('button[type="submit"]');

    // Clear previous valid message
    $validMessage.text('');

    // Validate Name (First Input)
    var $name = $('#name');
    if ($name.val().trim() === '') {
      isValid = false;
      $name.addClass('is-invalid'); // Bootstrap class for invalid input
    } else {
      $name.removeClass('is-invalid');
    }

    // Validate Wish (Second Input)
    var $wish = $('#wish');
    if ($wish.val().trim() === '') {
      isValid = false;
      $wish.addClass('is-invalid');
    } else {
      $wish.removeClass('is-invalid');
    }

    // Validate Attendance Confirmation (Third Input)
    var $confirm = $('input[name="confirm"]:checked');
    if ($confirm.length === 0) {
      isValid = false;
      $('input[name="confirm"]').siblings('label').addClass('border-danger'); // Highlight radio options with danger border
    } else {
      $('input[name="confirm"]').siblings('label').removeClass('border-danger');
    }

    // Validate Location (Fourth Input)
    if ($confirm.val() === 'yes') { // Only validate if 'yes' is selected
      var $location = $('input[name="location"]:checked');
      if ($location.length === 0) {
        isValid = false;
        $('#location-group').addClass('border-danger'); // Highlight location group
      } else {
        $('#location-group').removeClass('border-danger');
      }
    }

    // Display valid message if the form is valid
    if (isValid) {
      // Construct the pre-filled URL
      var preFilledUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf9K8Oackb7sLRayI7L7pcEHNT7WyZiHPDQ2dBucOuOTOVOyA/formResponse' +
        '?entry.559352220=' + encodeURIComponent($name.val()) +
        '&entry.443565211=' + encodeURIComponent($wish.val()) +
        '&entry.877086558=' + encodeURIComponent($confirm.val()) +
        '&entry.1372595499=' + encodeURIComponent($('input[name="location"]:checked').val() || '');

      // Open the pre-filled URL in a new tab
      window.open(preFilledUrl, '_blank');

      // Handle success
      $validMessage.text("Gửi lời chúc thành công!").removeClass('text-danger').addClass('text-success');

      // Clear all form inputs
      $('form')[0].reset();

      // Hide location group since it's linked to a radio button selection
      $('#location-group').addClass('d-none');
    } else {
      $validMessage.text('Xin hãy điền đầy đủ nội dụng!').removeClass('text-success').addClass('text-danger');
    }
  });

  // Fancybox
  Fancybox.bind("[data-fancybox]", {
    Images: {
      protected: true
    },
    Toolbar: {
      display: {
        left: [],
        middle: ["infobar"],
        right: ["close"],
      },
    }
  });

  smoothScrolling();
  $('#calendar').append(generateCalendar(15, 9, 2024));
});
