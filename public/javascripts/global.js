// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
    $('#userList table tbody').on('click', 'td a.linkupdateuser', updateUser);

         // Add User button click
    $('#btnAddUser').on('click', saveUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){

            userListData = data;

            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.firstName + ', ' + this.lastName + '</a></td>';
            tableContent += '<td>' + this.nationalHandicap + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkupdateuser" rel="' + this._id + '">Update</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });

};

function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoFirstName').text(thisUserObject.firstName);
    $('#userInfoLastName').text(thisUserObject.lastName);
    $('#userInfoHandicap').text(thisUserObject.nationalHandicap);

};


// Add User
function saveUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'firstName': $('#addUser fieldset input#inputUserFirstName').val(),
            'lastName': $('#addUser fieldset input#inputUserLastName').val(),
            'nationalHandicap': $('#addUser fieldset input#inputUserHandicap').val()
        }

        var userTask = false;

        $('#addUser').attr('userid') !== undefined ? userTask = '/users/updateuser/' + $('#addUser').attr('userid') : userTask = '/users/saveuser';

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: userTask,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser').removeAttr('userid');
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'POST',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

function updateUser(event) {

    event.preventDefault();

    //get users details
    var userId = $(this).attr('rel');
    var results = [];

    for(var i=0; i<userListData.length; i++) {
        for(key in userListData[i]) {
            if(userListData[i][key] === userId) {
                results.push(userListData[i]);
            }
        }
    }

    //populate user form
    $('#addUser').attr('userid', userId);
    $('#addUser fieldset input#inputUserName').val(results[0].username);
    $('#addUser fieldset input#inputUserEmail').val(results[0].email);
    $('#addUser fieldset input#inputUserFirstName').val(results[0].firstName);
    $('#addUser fieldset input#inputUserLastName').val(results[0].lastName);
    $('#addUser fieldset input#inputUserHandicap').val(results[0].nationalHandicap);

};