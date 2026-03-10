function generate_item_bro(issue){
      // border color: success if open, purple-500 if closed
     
    const borderClass = issue.status === "closed" ? "border-purple-500" : "border-success";
    let img_url = '';
    if( issue.status === "closed" ){
        img_url = './assets/Closed-Status.png'
    }
    else{
        img_url = './assets/Open-Status.png';
    }
    // priority badge color
    let priorityClass = "badge-error"; // default high
    if (issue.priority === "medium") priorityClass = "badge-warning";
    if (issue.priority === "low") priorityClass = "badge-neutral";

    // build labels
    const labelsHtml = issue.labels.map(label => {
      let labelClass = "badge-outline badge-soft ";
      if (label === "bug") labelClass += "badge-error";
      else if (label === "help wanted") labelClass += "badge-warning";
      else if (label === "enhancement") labelClass += "badge-success";
      else if (label === "documentation") labelClass += "badge-info";
      else if (label === "good first issue") labelClass += "badge-primary";

      return `<div class="badge ${labelClass} rounded-xl">${label.toUpperCase()}</div>`;
    }).join("");

    // format date
    const createdDate = new Date(issue.createdAt).toLocaleDateString();
      const card = document.createElement("div");
         card.setAttribute('data-id', issue.id);
    card.setAttribute('data-type', issue.status);
    // card HTML
    card.className = `issue-item cursor-pointer bg-white rounded-md shadow-xl pt-5 pb-5 border-t-4 ${borderClass} flex flex-col h-full`;
 
    card.innerHTML = `
    
        <div class="flex justify-between items-center px-4">
          <img height="24" width="24" src="${ img_url}" />
          <div class="badge badge-soft ${priorityClass} px-6 rounded-xl">${issue.priority}</div>
        </div>
        <h3 class="text-md text-black font-semibold mt-3 px-4">${issue.title}</h3>
        <p class="text-sm text-slate-500 mt-3 px-4 flex-grow">${issue.description}</p>
        <div class="flex items-center mt-3 gap-2 px-4 flex-wrap">
          ${labelsHtml}
        </div>
        <div class="divider mt-3 mb-3"></div>
        <p class="text-sm text-slate-500 mt-3 px-4">#${issue.id} by ${issue.author}</p>
        <p class="text-sm text-slate-500 mt-3 px-4">${createdDate}</p>
     
    `;

    //console.log(card);
    card.addEventListener('click', function(){
        console.log(this);
        let id = this.getAttribute('data-id');
        console.log(id);
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/"+id)
        .then(res => res.json())
        .then(json => {
            const issue = json.data;
            const modalBody = document.getElementById("modal-content-cpr");
            modalBody.innerHTML = modalContentGenerate(issue);
             my_modal_5.showModal();
        });
       
    })
    return card;
}
function modalContentGenerate(issue) {
  // status badge
  let statusBadgeClass = "badge-success";
  if (issue.status === "closed") statusBadgeClass = "badge-error";

  // priority badge
  let priorityClass = "badge-error"; // high = red
  if (issue.priority === "medium") priorityClass = "badge-warning";
  if (issue.priority === "low") priorityClass = "badge-info";

  // labels badges
  const labelsHtml = issue.labels.map(label => {
    let labelClass = "badge-soft badge-outline rounded-xl ";
    if (label === "bug") labelClass += "badge-error";
    else if (label === "help wanted") labelClass += "badge-warning";
    else if (label === "enhancement") labelClass += "badge-success";
    else if (label === "documentation") labelClass += "badge-info";
    else if (label === "good first issue") labelClass += "badge-primary";

    return `<div class="badge ${labelClass}">${label.toUpperCase()}</div>`;
  }).join(" ");

  // format date
  const createdDate = new Date(issue.createdAt).toLocaleDateString();

  // build modal content
  return `
    <h2 class="text-2xl font-bold">${issue.title}</h2>
    <div class="flex items-center flex-wrap gap-2 my-5">
      <div class="badge badge-md text-white px-4 ${statusBadgeClass}">${issue.status}</div>
      <p class="text-slate-500">• Opened by ${issue.author}</p>
      <p class="text-slate-500">• ${createdDate}</p>
    </div>
    ${labelsHtml}
    <p class="text-md text-slate-500 my-5">${issue.description}</p>

    <div class="foot bg-gray-100 flex flex-wrap p-4 gap-10 my-5 rounded shadow">
      <div>
        <p class="text-slate-500">Assignee:</p>
        <h2 class="text-lg font-bold">${issue.assignee || "Unassigned"}</h2>
      </div>
      <div>
        <p class="text-slate-500">Priority:</p>
        <div class="badge ${priorityClass} rounded-xl"><span class="text-white">${issue.priority}</span></div>
      </div>
    </div>
  `;
}
function show_loader(){
    const loader = document.getElementById('loader_icon');
    loader.classList.remove('hidden');
}
function hide_loader(){
    const loader = document.getElementById('loader_icon');
    loader.classList.add('hidden');
}