window.onload =()=>{
    let content= "";
    let FebNumberOfDays = "";
    let count = 1;
    let dateNow = new Date();
    let month = dateNow.getMonth();
    let nextMonth = month + 1; 
    let day = dateNow.getDate();
    let year = dateNow.getFullYear();
    if (month == 1) {
        if ((year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0)) {
            FebNumberOfDays = 29;
        } else {
            FebNumberOfDays = 28;
        }
    }
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    let dayPerMonth = ["31", "" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]
    let nextDate = new Date(nextMonth + ' 1 ,' + year);
    let weekdays = nextDate.getDay();
    let weekdays2 = weekdays
    let numOfDays = dayPerMonth[month];
    while (weekdays > 0) {
        content+= "<td></td>";
        weekdays--;
    }
    while (count <= numOfDays) {
        if (weekdays2 > 6) {
            weekdays2 = 0;
            content+= "</tr><tr>";
        }
        if (count == day) {
            content+= "<td>" + count + "</td>";
        } else {
            content+= "<td >" + count + "</td>";

        }
        weekdays2++;
        count++;
    }
    var calendarBody = "<table > <tr ><th colspan='8'>"+ monthNames[month] + " " + year + "</th></tr>";
    calendarBody += "<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>" +
                     "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
    calendarBody += "<tr>";
    calendarBody += content;
    calendarBody += "</tr></table>";
    document.getElementById("calendar").innerHTML = calendarBody;

}
