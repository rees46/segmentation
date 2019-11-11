"use strict";
((segmentsCount, gaSegmentName = "dimension1", whiteLabel = "rees46", days = 0) => {
    if (typeof segmentsCount != "number" || segmentsCount < 2 || segmentsCount > 26) {
        console.log("The value of segments count must be a number and range from 2 to 26 inclusive");
        return;
    }

    window[`${whiteLabel}_segments`] = window[`${whiteLabel}_segments`] || {};
    window[`${whiteLabel}_segments`].core = {
        segmentCookieName: `${whiteLabel}VisitorSegment`,
        segmentCookieDays: days,

        GetAlphabet(count) {
            let start = 9;
            return Array.apply(null, Array(count)).map(x => (++start).toString(36).toUpperCase());
        },
        
        GetMainDomain() {
            let host = document.location.hostname;
            let hostParts = host.split('.');
            if (hostParts.length > 1) 
                return hostParts.slice(-2).join('.');
            else
                return host;
        },

        CreateCookie(name, value, days) {
            let expires = '';
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "expires=" + date.toGMTString();
            }

            let domain = "domain=." + this.GetMainDomain();
            document.cookie = `${encodeURI(name)}=${encodeURI(value)}; ${expires}; ${domain}; path=/`;
        },



        ReadCookie(name) {
            let nameEQ = encodeURI(name) + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(nameEQ) === 0) return decodeURI(c.substring(nameEQ.length, c.length));
            }
            return null;
        },

        CreateSegment(segmentsCount) {
            let date = new Date();
            let segment = this.GetAlphabet(segmentsCount)[parseInt(date.getMilliseconds().toString(segmentsCount).slice(-1), segmentsCount)];
            this.CreateCookie(this.segmentCookieName, segment, this.segmentCookieDays);
            return segment;
        },

        SetGoogleAnalytics(name, segment) {
            if (typeof ga != "undefined" && name.length > 0) ga("set", name, segment);
        },

        GetSegment(segmentsCount) {
            let segment = this.ReadCookie(this.segmentCookieName);
            if (!segment || !(this.GetAlphabet(segmentsCount).indexOf(segment) + 1)) {
                segment = this.CreateSegment(segmentsCount);
            }
            window[`${whiteLabel}_segments`]["segment"] = segment;
            this.SetGoogleAnalytics(gaSegmentName, segment);
        }
    }
    window[`${whiteLabel}_segments`].core.GetSegment(segmentsCount);
})(3, "dimension1", "rees46");
