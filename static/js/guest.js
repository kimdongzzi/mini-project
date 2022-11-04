function save_guest(){
    let guest_name = $('#guest-name').val()
    let guest_comment = $('#guest-comment').val()
    let guest = $('.guest_mem').attr('id')

    $.ajax({
        type: "POST",
        url: "/guests",
        data: {guest_name_give: guest_name, guest_comment_give: guest_comment, guest_give: guest},
        success: function(response){
            alert(response['msg'])
            window.location.reload()
        }
    })
}


function remove_guest(num){
    $.ajax({
        type: "POST",
        url: "guests/remove",
        data: {num_give: num},
        success: function (response){
            alert(response["msg"])
            window.location.reload()
        }
    })
}

function change_guest(num){
    $.ajax({
        type: "POST",
        url: "guests/change",
        data: {num_give: num},
        success: function (response){
            alert(response["msg"])
            window.location.reload()
        }
    })
}
function change_guest_done(num){
    let change_guest_comment = $('#change_guest_comment').val()

    $.ajax({
        type: "POST",
        url: "guests/change_done",
        data: {num_give: num, change_guest_comment_give: change_guest_comment},
        success: function (response){
            alert(response["msg"])
            window.location.reload()
        }
    })
}

function show_guest(a) {
    $.ajax({
        type: "GET",
        url: "/guests",
        data: {},
        success: function (response) {
            let guest_rows = response["guests"]
            for (let i = 0; i < guest_rows.length; i++) {
                let guest_name = guest_rows[i]['name']
                let guest_comment = guest_rows[i]['comment']
                let num = guest_rows[i]['num']
                let change = guest_rows[i]['change']
                let guest = guest_rows[i]['guest']

                let temp_html = ``

                if (change == 0 || change == 1) {
                    temp_html = `<li class="${guest}">
                            <div class="guest-name">${guest_name}</div>
                            <div class="guest-comment">${guest_comment}</div>
                            <div class="guest-btn-wrap">
                                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-outline-dark" onclick="change_guest(${num})">수정</button>
                                    <button type="button" onclick="remove_guest(${num})" class="btn btn-outline-dark">삭제</button>
                                </div>
                            </div>
                        </li>`
                } else {
                    temp_html = `<li class="${guest}">
                            <div class="guest-name">${guest_name}</div>
                            <div class="guest-comment"><input type="text" id="change_guest_comment" value="${guest_comment}"></div>
                            <div class="guest-btn-wrap">
                                <button type="button" class="btn btn-outline-dark" onclick="change_guest_done(${num})">완료</button>
                            </div>
                        </li>`
                }

                if (guest == a) {
                    $('#guest-list').append(temp_html)
                }
            }
        }
    })
}