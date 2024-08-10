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

  function generateCalendar(day, month, year) {
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var firstDay = new Date(year, month - 1, 1).getDay();
    var daysInMonth = new Date(year, month, 0).getDate();

    var $table = $('<table></table>');
    var $caption = $('<caption></caption>').text(monthNames[month - 1] + ' ' + year);
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

      var $cell = $('<td></td>').text(date);
      if (date == day) {
        $cell.addClass('highlight');
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

  smoothScrolling();
  $('#calendar').append(generateCalendar(15, 9, 2024));
});
