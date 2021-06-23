const api_url = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

async function getapi(url){
    
    const response = await fetch(url)

    let data = await response.json();
    let transc = data.transactions;

    const sortData = sortTransc(data);
    const groupData = groupTransc(sortData);

    display_output(groupData);
}

getapi(api_url);


function sortTransc(data){
    const sorted_Transc = data.transactions.sort((a,b)=> {
        let first_transc = new Date(a.startDate);
        let second_transc = new Date(b.startDate);

        return first_transc - second_transc;
    });

    return sorted_Transc;
}

// Transactions are gouped on the basis of Date(key)
function groupTransc(sortData = []){

    const get_Date = (date)=>{ 
       return date.split("T")[0];
    };

    const grouped_dict = {};

    sortData.forEach((el) => {
        let key = get_Date(el.startDate);
        if(!grouped_dict[key])
        {
            grouped_dict[key] = [];
            grouped_dict[key].push(el);
        }
        else{grouped_dict[key].push(el);}
    });

    return grouped_dict;
}


function display_output(groupData){
    for(let date_key in groupData)
    {
        document.getElementById("box").innerHTML += `<div class="line_wrap"><div class="date_of_transaction">
        <div class="date_lapping">
        <p>${new Date(date_key).toDateString()}</p>
        </div>
        </div></div>`;

            for(var i = 0; i< groupData[date_key].length; i++)
            {
                let tranc_type = groupData[date_key][i].type;
                let tranc_direction = groupData[date_key][i].direction;


                    if(tranc_type === 1 && tranc_direction === 1)
                    {
                        document.getElementById("box")
                        .innerHTML += `<div class="alignment-right"><div class="card">
                        <p class="ammount">
                        &#8377 ${groupData[date_key][i].amount}</p>
                        <p class="message"> <span id="checkmark">You paid</span></p>
                        <div class="transaction-id">
                        <p>Transaction ID</p>
                        <p>${groupData[date_key][i].id}</p>
                        </div>
                        </div>
                        </div>
                        <div class="date_time_align_right">
                        <p>${new Date(groupData[date_key][i].startDate).toDateString()},${
                        new Date(groupData[date_key][i].startDate).toLocaleTimeString()}</p>
                        </div>`;
                    }    
                    else if(tranc_type === 1 && tranc_direction === 2)
                    {
                        document.getElementById("box")
                        .innerHTML += `<div class="alignment-left"><div class="card">
                        <p class="ammount">
                        &#8377 ${groupData[date_key][i].amount}</p>
                        <p class="message"> <span id="checkmark">You received</span></p>
                        <div class="transaction-id">
                        <p>Transaction ID</p>
                        <p>${groupData[date_key][i].id}</p>
                        </div>
                        </div>
                        </div>
                        <div class="date_time_align_left">
                        <p>${new Date(
                            groupData[date_key][i].startDate
                            ).toDateString()},${
                        new Date(groupData[date_key][i].startDate).toLocaleTimeString()}</p>
                        </div>`;
                    }
                    else if (tranc_type === 2 && tranc_direction === 1) {
                        document.getElementById(
                          "box"
                        ).innerHTML += `<div class="alignment-right"><div class="card">
                              <p class="ammount">
                               &#8377; ${groupData[date_key][i].amount}
                             </p>
                             <p class="message"> <span id="wait_s">You requested</span></p>
                             <div class="transaction-id">
                              <button>Cancel</button>
                             </div>
                             </div>
                             </div>
                             <div class="date_time_align_right">
                             <p>${new Date(
                                groupData[date_key][i].startDate
                             ).toDateString()}, ${new Date(
                                groupData[date_key][i].startDate
                        ).toLocaleTimeString()}</p>
                           </div>`;
                      }
                      else if (tranc_type === 2 && tranc_direction === 2) {
                        //    Pay and Decline Button and Align BOX Left
                        document.getElementById(
                          "box"
                        ).innerHTML += `<div class="alignment-left"><div class="card">
                              <p class="ammount">
                               &#8377; ${groupData[date_key][i].amount}
                             </p>
                             <p class="received"><span id="wait_s">Request received</span></p>
                              <button>Pay</button>
                              <button>Decline</button>
                             </div>
                             </div>
                             <div class="date_time_align_left">
                              <p>${new Date(
                                groupData[date_key][i].startDate
                              ).toDateString()}, ${new Date(
                                groupData[date_key][i].startDate
                        ).toLocaleTimeString()}</p>
                            </div>`;
                      }
            }
}
}

