Array.prototype.remove = function(index){  
    var value=this.slice(0,index).concat(this.slice(index+1));  
    return value;  
}


var people = [];
    
var data = [];
    
for (var i = 0; i < localStorage.length; i++) {
    data.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
}
    
if (data[0] == undefined) {
    localStorage.setItem('PortWatcher', '{"name":"PortWatcher","phone":"www.pwhack.me","address":"hangzhou","show":"hide","active":"inactive"}');
    data[0] = {"name":"PortWatcher","phone":"www.pwhack.me","address":"hangzhou","show":"hide","active":"inactive"};
}
    
//update contact data
if (data.length >= people.length) {
    people = data;
}

var newPeople = {
    name: null,
    phone: null,
    address: null,
    reset: function () {
        this.name = null;
        this.phone = null;
        this.address = null;
    }
};

var addForm = {
    inputName: { state: '', ok: false },
    inputPhone: { state: '', ok: false },
    inputAdress: { state: '', ok: false },
    show: 'hide',
    reset: function () {
        this.inputName.state = '';
        this.inputName.ok = false;
        this.inputPhone.state = '';
        this.inputPhone.ok = false;
        this.inputAdress.state = '';
        this.inputAdress.ok = false;
    }
};

var editForm = {
    show: 'hide'
};

var peopleToShow = [];

var contactCtrl = function ($scope) {
    $scope.addForm = addForm;
    
    $scope.editForm = editForm;
    
    $scope.people = people;
    
    $scope.newPeople = newPeople;
    
    $scope.add = function () {
        //add form validation
        if ($scope.newPeople.name == null) {
            $scope.addForm.inputName.state = 'has-error';
        } else {
            $scope.addForm.inputName.state = 'has-success';
            $scope.addForm.inputName.ok = true;
        }

        if ($scope.newPeople.phone == null || isNaN($scope.newPeople.phone)) {
            $scope.addForm.inputPhone.state = 'has-error';
        } else {
            $scope.addForm.inputPhone.state = 'has-success';
            $scope.addForm.inputPhone.ok = true;
        }

        if ($scope.newPeople.address == null) {
            $scope.addForm.inputAdress.state = 'has-error';
        } else {
            $scope.addForm.inputAdress.state = 'has-success';
            $scope.addForm.inputAdress.ok = true;
        }

        if ($scope.addForm.inputName.ok && $scope.addForm.inputPhone.ok && $scope.addForm.inputAdress.ok) {
            var newPeople = { "name": $scope.newPeople.name, "phone": $scope.newPeople.phone, "address": $scope.newPeople.address, "show": 'hide', "active": 'inacitve' };
            
            $scope.people.push(newPeople);
            localStorage.setItem($scope.newPeople.name, JSON.stringify(newPeople));
            
            $scope.addForm.reset();
            $scope.newPeople.reset();
        }
    };
    
    $scope.showEditForm = function (index) {
        $scope.people[$scope.detail.last].show = 'hide';
        $scope.indexToEdit = index;
        $scope.editForm.show = 'show';
    };
    
    $scope.remove = function (index) {
        localStorage.removeItem($scope.people[index].name);
        $scope.people = $scope.people.remove(index);
    };
    
    $scope.find = function (query) {
        var pattern = eval('/[\w]*' + query + '[\w]*/i');
        var result = [];
        //console.dir(pattern);
        for (var i = 0; i < people.length; i++) {
           if (pattern.test(people[i].name)) {
               result.push(people[i]);
           }
        }
        $scope.refreshSelection();
        if (result[0] != undefined) {
            $scope.people = result;
            console.dir($scope.people);
            $scope.people[0].show = 'show';
        }
    };
    
    $scope.detail = function (index) {
        $scope.addForm.show = 'hide';
        $scope.editForm.show = 'hide';
        $scope.refreshSelection();
        $scope.people[index].show = 'show';
        $scope.people[index].active = 'active';
        $scope.detail.last = index;
    };
    
    $scope.showAddForm = function () {
        $scope.editForm.show = 'hide';
        if (!isNaN($scope.detail.last)) {
            people[$scope.detail.last].show = 'hide';
        }
        $scope.addForm.show = 'show';
    };
    
    $scope.refreshSelection = function () {
        if (!isNaN($scope.detail.last)) {
            $scope.people[$scope.detail.last].show = 'hide';
            $scope.people[$scope.detail.last].active = 'inactive';
        }
    };
    
    //initialize
    $scope.people[0].show = 'show';
    $scope.people[0].active = 'active';
    $scope.detail.last = 0;
    $scope.indexToEdit = 0;
};