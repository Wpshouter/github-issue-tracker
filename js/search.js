  document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchbro");
  const searchInput = document.getElementById("searchinput");
    const container = document.getElementById("item_holder")

  // attach click event
  searchBtn.addEventListener("click", function(){
       container.innerHTML = '';
      show_loader();
      //return;
         const query = searchInput.value.trim();
    if (!query) return;


    /*  const res = fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(query)}`);
   
        console.log(res.data);
      // clear old results
      container.innerHTML = "";

      if (json.total === 0) {
        container.innerHTML = `<p class="text-slate-500">No issues found for "${query}".</p>`;
        return;
      } */

    


       fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(query)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Issues data:", data);
      // You can now work with the JSON object
      // For example, display the first issue title:
      let alldata = data.data;
      let count = alldata.length;
      console.log(count);
   
      document.getElementById("issue_ctm").innerHTML = count;
      alldata.forEach((issue) => {
        card = generate_item_bro(issue);

        container.appendChild(card);
      });

      //console.log(items);
      if (data && data.length > 0) {
        document.body.innerHTML += `<p>First issue: ${data[0].title}</p>`;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
    hide_loader();

  });
   });