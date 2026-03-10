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

    // card HTML
    const card = `
      <div data-id="${issue.id}" data-type="${issue.status}" class="issue-item bg-white rounded-md shadow-xl pt-5 pb-5 border-t-4 ${borderClass} flex flex-col h-full">
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
      </div>
    `;
    return card;
}