if (Meteor.isClient) {

    function usernameAlreadyExists(existingUsers, username) {
        var usersWithSameName = existingUsers.filter(function (user) {
            return user.name === username;
        });

        return usersWithSameName.length !== 0;
    }

    Template.userManager.events({
        'click .clickable-row': function (event) {
            Router.go(event.currentTarget.dataset.href);
        },
        'submit .add-user': function (event) {
            event.preventDefault();

            var nameInputValue = event.target.name.value;

            if (usernameAlreadyExists(this.users.fetch(), nameInputValue)) {
                alert('Name already exists!');
            } else {
                Meteor.call('addUser', nameInputValue);
                event.target.reset();
            }
        }
    });
}

Meteor.methods({
    addUser: function (userName) {
        var newUser = {
            name: userName
        };

        Users.insert(newUser);
    }
});