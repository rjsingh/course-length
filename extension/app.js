// get course lists.
var courseList = document.getElementsByClassName("course-item-list-section-list")

var headerList = document.getElementsByClassName("course-item-list-header")

var overallClassTime = 0

var speeds = [1,1.5,2]

for (var i = 0; i < courseList.length; i++) {
    //get individual class lecture links for this current week.
    var classLinks = courseList[i].getElementsByClassName("lecture-link")

    //totoal time for this weeks class.
    var totalTime = 0
    for (var j = 0; j < classLinks.length; j++) {
        var txt = classLinks[j].text
        var courseTime = 0

        if (hasTime(txt)) {
            totalTime += getTimeFromText(txt)
        }
    }

    //inject this total class time for this week into header.
    var header = headerList[i]

    var newHtml = "Total Time: "
    for (var s in speeds) {
        newHtml += speeds[s]+"x - " + secondsToTime(totalTime / speeds[s])
        newHtml += " "
    }

    header.innerHTML += newHtml
    overallClassTime += totalTime
}

//write total class time to console.
console.log(secondsToTime(overallClassTime))

function secondsToTime(totalSec) {
    var hours = parseInt( totalSec / 3600 );
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = parseInt(totalSec % 60);

    var result = (hours < 10 ? "0" + hours : hours) + "-" + (minutes < 10 ? "0" + minutes : minutes) + "-" + (seconds  < 10 ? "0" + seconds : seconds);
    return result
}

function hasTime(txt) {
    return (txt.match(/(\d+):(\d+)/) != null) || (txt.match(/(\d+) min/) != null)
}

function getTimeFromText(txt) {
    var t = txt.match(/(\d+):(\d+)/) != null ? txt.match(/(\d+):(\d+)/) : txt.match(/(\d+) min/)
    console.log(t)
    var min = t[1]
    var sec = isNaN(t[2]) ? '0' : t[2]

    //convert to seconds.
    return parseInt(min) * 60 + parseInt(sec)
}
