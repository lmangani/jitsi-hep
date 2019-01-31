/* global hep */

(function(ctx) {

    function Analytics(options) {
        /* eslint-disable */
        
         /**
         * HEP Analytics
         */
          
        const hep = function(type,event,subset,data){
            console.log('HEP-REQ',type,event,data);
            // SHIP TO LOCAL/REMOTE COLLECTOR
             fetch('https://"+window.location.hostname||'hep.hepic.tel'+":9069', { // Your POST endpoint
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data) // This is your file object
              }).catch(
                error => console.log(error) // Handle the error response object
              );      
        }
        window.hep = hep;
        
        /* eslint-enable */
    }

    /**
     * Extracts the integer to use for an event's value field
     * from a lib-jitsi-meet analytics event.
     * @param {Object} event - The lib-jitsi-meet analytics event.
     * @returns {Object} - The integer to use for the 'value' of a Google
     * Analytics event.
     * @private
     */
    Analytics.prototype._extractAction = function(event) {
        // Page events have a single 'name' field.
        if (event.type === 'page') {
            return event.name;
        }

        // All other events have action, actionSubject, and source fields. All
        // three fields are required, and the often jitsi-meet and
        // lib-jitsi-meet use the same value when separate values are not
        // necessary (i.e. event.action == event.actionSubject).
        // Here we concatenate these three fields, but avoid adding the same
        // value twice, because it would only make the GA event's action harder
        // to read.
        let action = event.action;

        if (event.actionSubject && event.actionSubject !== event.action) {
            // Intentionally use string concatenation as analytics needs to
            // work on IE but this file does not go through babel. For some
            // reason disabling this globally for the file does not have an
            // effect.
            // eslint-disable-next-line prefer-template
            action = event.actionSubject + '.' + action;
        }
        if (event.source && event.source !== event.action
                && event.source !== event.action) {
            // eslint-disable-next-line prefer-template
            action = event.source + '.' + action;
        }

        return action;
    };

    /**
     * Extracts the integer to use for an event's value field
     * from a lib-jitsi-meet analytics event.
     * @param {Object} event - The lib-jitsi-meet analytics event.
     * @returns {Object} - The integer to use for the 'value' of a Google
     * Analytics event, or NaN if the lib-jitsi-meet event doesn't contain a
     * suitable value.
     * @private
     */
    Analytics.prototype._extractValue = function(event) {
        let value = event && event.attributes && event.attributes.value;

        // Try to extract an integer from the "value" attribute.
        value = Math.round(parseFloat(value));

        return value;
    };

    /**
     * Extracts the string to use for an event's label field
     * from a lib-jitsi-meet analytics event.
     * @param {Object} event - The lib-jitsi-meet analytics event.
     * @returns {string} - The string to use for the 'label' of a Google
     * Analytics event.
     * @private
     */
    Analytics.prototype._extractLabel = function(event) {
        let label = '';

        // The label field is limited to 500B. We will concatenate all
        // attributes of the event, except the user agent because it may be
        // lengthy and is probably included from elsewhere.
        for (const property in event.attributes) {
            if (property !== 'permanent_user_agent'
                && property !== 'permanent_callstats_name'
                && event.attributes.hasOwnProperty(property)) {
                // eslint-disable-next-line prefer-template
                label += property + '=' + event.attributes[property] + '&';
            }
        }

        if (label.length > 0) {
            label = label.slice(0, -1);
        }

        return label;
    };

    /**
     * This is the entry point of the API. The function sends an event to
     * google analytics. The format of the event is described in
     * AnalyticsAdapter in lib-jitsi-meet.
     * @param {Object} event - the event in the format specified by
     * lib-jitsi-meet.
     */
    Analytics.prototype.sendEvent = function(event) {
        if (!event || !hep) {
            return;
        }

        // Filter out any undesired statistics
        if (event.action === 'e2e_rtt' || event.action === 'rtp.stats'
            || event.action === 'rtt.by.region') {
            return;
        }

        const gaEvent = {
            'eventCategory': 'jitsi-meet',
            'eventAction': this._extractAction(event),
            'eventLabel': this._extractLabel(event)
        };
        const value = this._extractValue(event);

        if (!isNaN(value)) {
            gaEvent.eventValue = value;
        }

        hep('send', 'event', gaEvent, event);
    };

    if (typeof ctx.JitsiMeetJS === 'undefined') {
        ctx.JitsiMeetJS = {};
    }
    if (typeof ctx.JitsiMeetJS.app === 'undefined') {
        ctx.JitsiMeetJS.app = {};
    }
    if (typeof ctx.JitsiMeetJS.app.analyticsHandlers === 'undefined') {
        ctx.JitsiMeetJS.app.analyticsHandlers = [];
    }
    ctx.JitsiMeetJS.app.analyticsHandlers.push(Analytics);
})(window);
/* eslint-enable prefer-template */
