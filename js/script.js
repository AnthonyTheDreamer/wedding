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
