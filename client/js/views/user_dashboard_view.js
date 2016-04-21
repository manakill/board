/**
 * @fileOverview This file has functions related to user dashboard view. This view calling from application view.
 * Available Object:
 *	App.boards						: this object contain all boards(Based on logged in user)
 *	this.model						: user model.
 */
if (typeof App === 'undefined') {
    App = {};
}
/**
 * UserDashboard View
 * @class UserDashboardView
 * @constructor
 * @extends Backbone.View
 */
App.UserDashboardView = Backbone.View.extend({
    /**
     * Constructor
     * initialize default values and actions
     */
    initialize: function() {
        this.render();
    },
    template: JST['templates/user_dashboard'],
    /**
     * render()
     * populate the html to the dom
     * @param NULL
     * @return object
     *
     */
    render: function() {
		var dashboard_data = {};
		var profile_picture_path ='';
        if (!_.isEmpty(authuser.user.profile_picture_path)) {
            var hash = calcMD5(SecuritySalt + 'User' + authuser.user.id + 'png' + 'medium_thumb');
            profile_picture_path = window.location.pathname + 'img/medium_thumb/User/' + authuser.user.id + '.' + hash + '.png';
        }
		dashboard_data.user_profile_picture = profile_picture_path;
		dashboard_data.user = authuser.user;
		dashboard_data.organizations = auth_user_organizations.models;
		dashboard_data.dashboard = this.model;
		this.$el.html(this.template({
			data: dashboard_data,
		}));
        this.showTooltip();
        return this;
    }
});
