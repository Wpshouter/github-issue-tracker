document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("item_holder");
  //let items = null;
  show_loader();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
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
  const allBtn = document.getElementById("all_btn");
  const openBtn = document.getElementById("opn_btn");
  const closedBtn = document.getElementById("cls_btn");
  const issueCount = document.getElementById("issue_ctm");
  //console.log('asdsad');
  //console.log(items);
  function setActive(btn) {
    [allBtn, openBtn, closedBtn].forEach((b) => {
      b.classList.remove("btn-active", "btn-primary", "text-white");
      b.classList.add("text-slate-500");
    });
    btn.classList.add("btn-active", "btn-primary", "text-white");
    btn.classList.remove("text-slate-500");
  }

  function filterItems(type) {
    items = document.querySelectorAll("div.issue-item");
    let count = 0;
    items.forEach((item) => {
      if (type === "all") {
        item.style.display = "block";
        count++;
      } else if (item.dataset.type === type) {
        item.style.display = "block";
        count++;
      } else {
        item.style.display = "none";
      }
    });
    console.log(count);
    issueCount.textContent = count; // update open issue count
  }

  // Default: show all
  filterItems("all");

  allBtn.addEventListener("click", () => {
      show_loader();
    setActive(allBtn);
    filterItems("all");
    hide_loader();
  });

  openBtn.addEventListener("click", () => {
     show_loader();
    setActive(openBtn);
    filterItems("open");
    hide_loader();
  });

  closedBtn.addEventListener("click", () => {
    show_loader();
    setActive(closedBtn);
    filterItems("closed");
    hide_loader();
  });
});
