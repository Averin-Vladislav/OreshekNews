app.service('isIEService', function() {
    return {
        detect: (browser = navigator.userAgent) => {
                    if (/MSIE 10/i.test(browser) || 
                        /MSIE 9/i.test(browser) || 
                        /rv:11.0/i.test(browser) ||
                        /Edge\/\d./i.test(browser)) {
                        return true;
                    }     
                    return false;
                }
    };
});