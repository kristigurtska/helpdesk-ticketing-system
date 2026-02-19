let tickets = JSON.parse(localStorage.getItem("tickets"))|| [];

function saveTickets (){
    localStorage.setItem ("tickets", JSON.stringify(tickets));
}


function addTicket(){
    const title = document.getElementById("title").value;

    const description = document.getElementById ("description").value;

    const priority = document.getElementById("priority").value;

    if (!title || !description) return


    const ticket = {
        id: Date.now(),
        title,
        description,
        priority,
        status:"open"
    };


    tickets.push (ticket);
    saveTickets();
    renderTickets ();
}

function deleteTicket (id) {
    tickets = tickets.filter (t=> t.id !== id);

    saveTickets();
    renderTickets();
}


function changeStatus(id) {
    const ticket = tickets.find(t => t.id === id);

    if (ticket.status === "open") {
        ticket.status = "in progress";
    } else if (ticket.status === "in progress") {
        ticket.status = "resolved";
    } else {
        ticket.status = "open";
    }

    saveTickets();
    renderTickets();
}

function renderTickets (){
    const list = document.getElementById ("ticketList");
    list.innerHTML = "";



     tickets.forEach(ticket => {
    list.innerHTML += `
      <div class="ticket">
        <h3>${ticket.title}</h3>
        <p>${ticket.description}</p>
        <p>Priority: ${ticket.priority}</p>
        <p>Status: ${ticket.status}</p>
        <button onclick="changeStatus(${ticket.id})">
          Change Status
        </button>
        <button onclick="deleteTicket(${ticket.id})">
          Delete
        </button>
      </div>
    `;
  });
}

document.getElementById("createTicketBtn").addEventListener("click",addTicket)

renderTickets();