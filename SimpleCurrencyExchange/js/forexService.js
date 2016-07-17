// SERVICE
forexApp.service('forexService', ['$resource', function($resource) {
   
    this.baseCurrency = 'USD';
    
    this.forexAPI = $resource("http://api.fixer.io/latest", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    this.addDays = function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    this.getFormattedDate = function(date) {
        if (angular.isDate(date)) {
            var dd = date.getDate();
            var mm = date.getMonth()+1; //January is 0!

            var yyyy = date.getFullYear();
            if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
            var formattedDate = yyyy + '-' + mm + '-' + dd;
            return Date.UTC(yyyy,mm,dd);
        }
        return null;
    };
    
}]);