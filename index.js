//declaring an array to store the complete information of the post and author detail to make it easy in html
let dataArray = [];

//function to fetch data from json API

async function fetchData() {
  try {
    //await fetch
    const authorResponse = await fetch(
      "https://raw.githubusercontent.com/sarojpunde/json/master/authors.json"
    );
    const authorData = await authorResponse.json();

    const postResponse = await fetch(
      " https://raw.githubusercontent.com/sarojpunde/json/master/posts.json"
    );
    const postData = await postResponse.json();

    postData.map((post, index) => {
      authorData.map((author) => {
        if (post.author_id === author.id) {
          dataArray.push({
            id: index + 1,
            author_image: author.avatar_url,
            img: post.image_url,
            name: author.name,
            title: post.title,
            body: post.body,
            date: convertISODateToCustomFormat(post.created_at),
          });
        }
      });
    });
    // Sort the array of dates
    dataArray.sort(compareDatesDescending);
    handleBar();
  } catch (error) {
    console.error("Error fetching authorData:", error);
  }

  changeBgColor();
}
function handleBar() {
  //get time zone
  var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("timeZone").innerHTML =
    "Your current time zone is: " + timeZone;

  var source = document.getElementById("template").innerHTML;
  //using handlebar compiler
  var template = Handlebars.compile(source);
  var filled = template(dataArray);
  document.getElementById("output").innerHTML = filled;
}
//flexbox background color changing
function changeBgColor() {
  let initial = 1;
  dataArray.map((data) => {
    var id = data.id + initial;
    var styleFlexBox = document.getElementById(id);
    initial += 1;
    try {
      styleFlexBox.style.backgroundColor = "rgba(0, 193, 255, 0.2)";
    } catch (error) {
      console.log(error);
    }
  });
}

// Function to compare dates in descending order
function compareDatesDescending(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);

  // Compare in reverse order for descending sort
  return dateB - dateA;
}
//convert iso date
function convertISODateToCustomFormat(isoDateString) {
  const date = new Date(isoDateString);

  // Get day, month, year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-based
  const year = date.getUTCFullYear();

  // Get time
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  // Format the result
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}
