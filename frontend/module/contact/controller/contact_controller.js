arcadeshop.controller('contact_controller', function($scope, toastr, services_contact) {

    $scope.emailContact = function () {
        var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (this.emailContactval===null || this.emailContactval==="" || this.emailContactval===undefined) {
            $scope.emailContactError="";
            $scope.validateEmailContact=true;
        }else if (!emailre.test(this.emailContactval)) {
            $scope.emailContactError="Introduce un email válido";
            $scope.validateEmailContact=false;
        }else {
            $scope.validateEmailContact=true;
            $scope.emailContactError="";
        }
    };

    $scope.msgContact = function () {
        if (this.msgContactval == null) {
            $scope.msgContactError="El mensaje tiene que tener más de 8 carácteres";
            $scope.validateMsgContact=false;
        }else if (this.msgContactval.length <= 8) {
            $scope.msgContactError="El mensaje tiene que tener más de 8 carácteres";
            $scope.validateMsgContact=false;
        }else {
            $scope.validateMsgContact=true;
            $scope.msgContactError="";
        }
    };

    $scope.validateContact = function () {
        $scope.emailContact();
        $scope.msgContact();
        if ($scope.validateEmailContact==true && $scope.validateMsgContact==true) {
            validate=true;
        }else {
            validate=false;
        }
        return validate;
    };

    $scope.contact = function () {
        if ($scope.validateContact()==true) {
            data={'email':$scope.emailContactval, 'message':$scope.msgContactval};
            services_contact.contact(data).then(() => {
                toastr.info("Mensaje enviado");
            });
        }
    };
});
