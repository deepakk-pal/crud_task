function Change() {
    document.getElementById('fetch-container').style.display = 'none';
    document.getElementById('forms').style.display = 'block';
}

function fetchlist() {
    $.ajax({
        type: "POST",
        data: { dboperation: "fetch" },
        dataType: "JSON",
        url: "crud.php",

        success: function (response) {
            if (response["status"] == "true") {
                var result = response["message"];
                // console.log(result);
                if (result.length > 0) {

                    $.each(result, function (index, value) {
                        var datatable = "<tr>";
                        datatable += "<td>" + value.user_id + "</td>";
                        datatable += "<td>" + value.user_name + "</td>";
                        datatable += "<td>" + value.user_email + "</td>";
                        datatable += "<td>" + value.user_mobile + "</td>";
                        datatable += "<td>" + value.user_gender + "</td>";
                        datatable += "<td>" + value.user_state + "</td>";
                        datatable += '<td id="updatecell"><button id="updatebutton"  onclick= "updatefunction(' + value.user_id + ')">EDIT</button></td>';
                        datatable += '<td id="deletecell"><button id="deletebutton"  onclick= "deletefunction(' + value.user_id + ')">DELETE</i></button></td>';
                        datatable += "</tr>";
                        $('#records').append(datatable);
                    }
                    )
                }
                else {
                    document.write("table has no record")
                }
            }
        }
    })
    $(document).ready(function (e) {
        $('#submit').on('click', function (e) {
            var name = $('#fname').val();
            var Email = $('#email').val();
            var Phone = $('#mobile').val();
            var Gender = $('#gender').val();
            var state = $('#stateDropdown').val();

            var check_efname = /^[aA-zZ. ]{2,}$/;
            var check_email = /^[aA-zZ0-9]{3,}@[aA-zZ]{3,}.[aA-zZ]{2,3}/;
            var check_mobile = /^[0-9]{10}/;

            if (name == '') {
                $('#fname_error').html("Name can not be empty");
                return false;
            }
            else if (name.length < 2) {
                $('#fname_error').html("Name should have at least 2 characters")
                return false;
            }
            else if (check_efname.test(name)) {
                $('#fname_error').html()
            }
            else {
                $('#fname_error').html("Name can only contain character.")
                return false;
            }

            if (Email == '') {
                $('#email_error').html("Enter email address.")
                return false;
            }
            else if (!check_email.test(Email)) {
                $('#email_error').html("Enter valid email address.")
                return false;
            }
            else {
                $('#email_error').html()
            }

            if (Phone == '') {
                $('#mobile_error').html("phone number can not be empty")
                return false;
            }
            else if (Phone.length < 10) {
                $('#mobile_error').html("phone number must have minimum 10 digits")
                return false;
            }
            else if (!check_mobile.test(Phone)) {
                $('#mobile_error').html("phone number can not have digits.")
                return false;
            }
            else {
                $('#mobile_error').html();
            }

            $.ajax({
                type: "POST",
                url: "crud.php",
                dataType: "JSON",
                data: { name: name, Email: Email, Phone: Phone, Gender: Gender, state: state, dboperation: 'insert' },
                success: function (response) {
                    if (response['status'] == "true") {
                        alert(response['message']);
                        setTimeout((e) => { window.location.href = "crud.html", "2000" });
                    }
                    else {
                        alert(response['message']);
                    }
                }
            });
        })
    })

}

function deletefunction(user_id) {
    $.ajax({
        type: "POST",
        url: "crud.php",
        dataType: "JSON",
        data: { dboperation: 'delete', user_id: user_id },

        success: function (response) {
            if (response['status'] == "true") {
                alert(response['message']);
                setTimeout((e) => { window.location.href = "crud.html" });
            }
            else {
                alert(response['message']);
            }
        }
    })
}

function updatefunction(user_id) {

    document.getElementById('fetch-container').style.display = 'none';
    document.getElementById('uform').style.display = 'block';
    // alert("callimg ajax")
    $.ajax({
        type: "POST",
        url: "crud.php",
        dataType: "json",
        data: { dboperation: 'update', user_id: user_id },
        success: function (response) {
            // alert("I am here")
            if (response["status"] == "true") {
                var result = response["message"];
                console.log(result)
                if (result.length > 0) {
                    $.each(result, function (index, value) {
                        $('#update_name').val(value.user_name);
                        $('#update_email').val(value.user_email);
                        $('#update_mobile').val(value.user_mobile);
                        $('#update_gender').val(value.user_gender);
                        $('#update_stateDropdown').val(value.user_state);
                    }
                    )
                }
            }
            else {
                alert("error")
            }
        }

    })

    $('#update').on('click', function (e) {
        var updated_user_name = $('#update_name').val()
        var updated_email = $('#update_email').val();
        var updated_mobile = $('#update_mobile').val();
        var updated_gender = $('#update_gender').val();
        var updated_state = $('#update_stateDropdown').val();

        var check_name = /^[aA-zZ. ]{2,}$/;
        var check_email = /^[aA-zZ0-9]{3,}@[aA-zZ]{3,}.[aA-zZ]{2,3}/;
        var check_mobile = /^[0-9]{10}/;

        if (updated_user_name == '') {
            $('#updated_name_error').html("Name can not be empty");
            return false;
        }
        else if (updated_user_name.length < 2) {
            $('#updated_name_error').html("Name should have at least 2 characters")
            return false;
        }
        else if (check_name.test(updated_user_name)) {
            $('#updated_name_error').html()
        }
        else {
            $('#updated_name_error').html("Name can only contain character.")
            return false;
        }


        if (updated_email == '') {
            $('#updated_email_error').html("Enter email address.")
            return false;
        }
        else if (!check_email.test(updated_email)) {
            $('#updated_email_error').html("Enter valid email address.")
            return false;
        }
        else {
            $('#updated_email_error').html()
        }

        if (updated_mobile == '') {
            $('#updated_mobile_error').html("phone number can not be empty")
            return false;
        }
        else if (updated_mobile.length < 10) {
            $('#updated_mobile_error').html("phone number must have minimum 10 digits")
            return false;
        }
        else if (!check_mobile.test(updated_mobile)) {
            $('#updated_mobile_error').html("phone number can not have letters.")
            return false;
        }
        else {
            $('#updated_mobile_error').html();
        }

        $.ajax({
            type: "POST",
            url: "crud.php",
            dataType: "JSON",
            data: { dboperation: 'updateRecord', updated_user_name: updated_user_name, updated_email: updated_email, updated_mobile: updated_mobile, updated_gender: updated_gender, updated_state: updated_state, user_id: user_id },
            success: function (response) {
                if (response['status'] == "true") {
                    alert(response['message']);
                    setTimeout((e) => { window.location.href = "crud.html", "2000" });
                }
                else {
                    alert(response['message']);
                }
            }
        });
    })
}

