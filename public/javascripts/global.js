// Userlist data array for filling in info box - @TODO make this private
var userListData = [];
var courseListData = [];

// Functions =============================================================

//@TODO - create course addition/update/delet functions. Will probably split these out

// Fill users table with data
function populatePlayers() {

    var tableContent = '';

    $.getJSON( '/players/playerlist', function( data ) {

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

        $('#userList table tbody').html(tableContent);

    });
};

//Fll courses table with data
function populateCourses() {
    var tableContent = '';

    $.getJSON('/courses/courselist', function( data ) {

        courseListData = data;

        tableContent += '<tr>';
        tableContent += '<td><a href="#" class="linkshowcourse" rel="' + this.coursename + '">' + this.coursename + '</a></td>';
        tableContent += '<td></td>';
        tableContent += '<td></td>';
        tableContent += '<td><a href="#" class="linkupdateuser" rel="' + this._id + '">Update</a></td>';
        tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';

    });
};

function showUserInfo(event) {

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
function savePlayer(event) {

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    //@TODO - Improve validation
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'firstName': $('#addUser fieldset input#inputUserFirstName').val(),
            'lastName': $('#addUser fieldset input#inputUserLastName').val(),
            'nationalHandicap': $('#addUser fieldset input#inputUserHandicap').val()
        }

        var userTask = false;
        $('#addUser').attr('userid') !== undefined ? userTask = '/players/updateplayer/' + $('#addUser').attr('userid') : userTask = '/players/saveplayer';

        // Use AJAX to post the object to our addplayer service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: userTask,
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                // Clear the form inputs
                $('#addUser').removeAttr('userid');
                $('#addUser fieldset input').val('');

                // Update the player table
                populatePlayers();
            }
            else {
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

//Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'POST',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populatePlayers();
        });

    }
    else {
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

    //populate player form
    $('#addUser').attr('userid', userId);
    $('#addUser fieldset input#inputUserName').val(results[0].username);
    $('#addUser fieldset input#inputUserEmail').val(results[0].email);
    $('#addUser fieldset input#inputUserFirstName').val(results[0].firstName);
    $('#addUser fieldset input#inputUserLastName').val(results[0].lastName);
    $('#addUser fieldset input#inputUserHandicap').val(results[0].nationalHandicap);

};

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user and course tables on initial page load
    populatePlayers();
    populateCourses();

    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
    $('#userList table tbody').on('click', 'td a.linkupdateuser', updateUser);

    // Add User button click
    $('#btnAddUser').on('click', savePlayer);

});
