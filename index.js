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
            date: post.created_at,
          });
        }
      });
    });
    ///calling sortFunction inside sort method
    dataArray.sort(sortFunction);
    //to print the data
    console.log(dataArray);

    //get time zone
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("timeZone").innerHTML =
      "Your current time zone is: " + timeZone;

    var source = document.getElementById("template").innerHTML;
    //using handlebar compiler
    var template = Handlebars.compile(source);
    var filled = template(dataArray);
    document.getElementById("output").innerHTML = filled;
  } catch (error) {
    console.error("Error fetching authorData:", error);
  }
  bgBox();
}
//flexbox cild background color changing
function bgBox() {
  let initial = 1;
  dataArray.map((data) => {
    var id = data.id + initial;
    var styleFlexBox = document.getElementById(id);
    initial += 1;
    console.log(styleFlexBox);
    styleFlexBox.style.backgroundColor = "rgba(0, 193, 255, 0.2)";
  });
}

//sorting the array by date in descending order
function sortFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA < dateB ? 1 : -1;
}
