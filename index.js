// Daily game control variables
let currentListMember = 0
let endOfDaily = false
let globalMemberList = []

// Control variables to adjust daily game flow
const MEMBER_TURN_TIME_SECONDS = 120

// Main html entrypoints to start the Daily game
function saveNewMember() {
    let newMemberInput = document.getElementById("newMemberName").value
    globalMemberList.push(newMemberInput)
    document.getElementById("newMemberName").value = ""
    
    renderSquadMembers()
    renderCurrentMember()
}

function startDaily() {
    disableInitialButtons()

    globalMemberList.reverse()
    let firstMember = globalMemberList.pop()
    alertNewMember(firstMember)
    renderSquadMembers()

    setInterval(runMembersDailyTurn, 1000);
}

// Support Functions
function alertNewMember(memberName) {
    document.getElementById("alert-space").innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert" id="new-turn-alert">
        <p id="new-turn-member">It is ${memberName} 's turn</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

function disableInitialButtons() {
    let addMemberButton = document.getElementById("add-member")
    let startDailyButton = document.getElementById("startDaily")
    addMemberButton.setAttribute("disabled", "")
    startDailyButton.setAttribute("disabled", "")
}

function endMembersTurn() {
    document.getElementById("timer").innerText = "0"
    let newCurrentMember = globalMemberList.pop()
    renderSquadMembers()

    let currentMemberElem = document.getElementById("currentMember")
    if (newCurrentMember !== undefined) {
        alertNewMember(newCurrentMember)
        currentMemberElem.innerHTML = newCurrentMember
        
        return;
    }
    
    currentMemberElem.innerHTML = "Fim da Lista"
    endOfDaily = true
}

function renderCurrentMember() {
    let currentMemberElem = document.getElementById("currentMember")
    currentMemberElem.innerHTML = globalMemberList[currentListMember]
}

function renderSquadMembers() {
    let squadMembersElem = document.getElementById("squad-members")
    squadMembersElem.innerHTML = ""
    
    globalMemberList.forEach(element => {
        const member = document.createElement("li");
        member.setAttribute("class", "list-group-item")
        member.textContent = element

        squadMembersElem.appendChild(member)
    });
}

function runMembersDailyTurn() {
    if (endOfDaily) {
        return;
    }

    let timer = Number(document.getElementById("timer").innerText)
    timer = timer + 1
    document.getElementById("timer").innerText = timer.toString()

    if (timer === MEMBER_TURN_TIME_SECONDS) {
        endMembersTurn()   
    }
}