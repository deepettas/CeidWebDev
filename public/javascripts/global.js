/**
 * Created by fortysixntwo on 30/04/2017.
 */
// Userlist data array for filling in info box
var THempListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // Username link click
    //$('#TransitHubEmpList table tbody').on('click', 'td a.linkshowTHemp', showTHempInfo); TODO: not that imp but...
    // Add User button click action
    $('#btnAddTHemp').on('click', addTHemp);
    // Delete User link click
    $('#TransitHubEmpList table tbody').on('click', 'td a.linkdeleteTHemp', deleteTHemp);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/panel/addTHemp', function( data ) {
        // Stick our emp data array into a emplist variable in the global object
        THempListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowTHemp" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteTHemp" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#TransitHubEmpList table tbody').html(tableContent);
    });
};

// Show User Info
function showTHempInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisTHempName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = THempListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisTHempName);

    // Get our User Object
    var thisTHempObject = THempListData[arrayPosition];

    //Populate Info Box
    $('#THEMPusername').text(thisTHempObject.fullname);
    // $('#userInfoAge').text(thisUserObject.age);
    // $('#userInfoGender').text(thisUserObject.gender);
    // $('#userInfoLocation').text(thisUserObject.location);

};


// Add User
function addTHemp(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newTHemp = {
            'username': $('#TransitHubEmpAdd fieldset input#inputTHEMPusername').val(),
            'password': $('#TransitHubEmpAdd fieldset input#inputTHEMPpassword').val()
        };

        // Use AJAX to post the object to our addTHemp service
        $.ajax({
            type: 'POST',
            data: newTHemp,
            url: '/panel/addTHemp',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#TransitHubEmpAdd fieldset input').val('');

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
function deleteTHemp(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/panel/deleteTHemp/' + $(this).attr('rel')
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