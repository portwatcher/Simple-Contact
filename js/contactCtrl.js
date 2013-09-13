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
    inputAddress: { state: '', ok: false },
    show: 'hide',
    reset: function () {
        this.inputName.state = '';
        this.inputName.ok = false;
        this.inputPhone.state = '';
        this.inputPhone.ok = false;
        this.inputAddress.state = '';
        this.inputAddress.ok = false;
    }
};

var editForm = {
    inputName: { state: '', ok: false },
    inputPhone: { state: '', ok: false },
    inputAddress: { state: '', ok: false },
    show: 'hide',
    reset: function () {
        this.inputName.state = '';
        this.inputName.ok = false;
        this.inputPhone.state = '';
        this.inputPhone.ok = false;
        this.inputAddress.state = '';
        this.inputAddress.ok = false;
    }
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
            $scope.addForm.inputAddress.state = 'has-error';
        } else {
            $scope.addForm.inputAddress.state = 'has-success';
            $scope.addForm.inputAddress.ok = true;
        }

        if ($scope.addForm.inputName.ok && $scope.addForm.inputPhone.ok && $scope.addForm.inputAddress.ok) {
            var newPeople = { "name": $scope.newPeople.name, "phone": $scope.newPeople.phone, "address": $scope.newPeople.address, "show": 'hide', "active": 'inacitve' };
            
            $scope.people.push(newPeople);
            localStorage.setItem($scope.newPeople.name, JSON.stringify(newPeople));
            
            $scope.addForm.reset();
            $scope.newPeople.reset();
        }
    };
    
    $scope.editFormChange = function () {
        //edit form validation
        if ($scope.people[$scope.indexToEdit].name == null) {
            $scope.editForm.inputName.state = 'has-error';
        } else {
            $scope.editForm.inputName.state = 'has-success';
            $scope.editForm.inputName.ok = true;
        }

        if ($scope.people[$scope.indexToEdit].phone == null || isNaN($scope.people[$scope.indexToEdit].phone)) {
            $scope.editForm.inputPhone.state = 'has-error';
        } else {
            $scope.editForm.inputPhone.state = 'has-success';
            $scope.editForm.inputPhone.ok = true;
        }

        if ($scope.people[$scope.indexToEdit].address == null) {
            $scope.editForm.inputAddress.state = 'has-error';
        } else {
            $scope.editForm.inputAddress.state = 'has-success';
            $scope.editForm.inputAddress.ok = true;
        }
        
        if ($scope.editForm.inputName.ok && $scope.editForm.inputPhone.ok && $scope.editForm.inputAddress.ok) {
            var peopleToSave = {"name": $scope.people[$scope.indexToEdit].name, "phone": $scope.people[$scope.indexToEdit].phone, "address": $scope.people[$scope.indexToEdit].address, "show": 'hide', "active": 'inactive'};
            localStorage.setItem($scope.people[$scope.indexToEdit].name, JSON.stringify(peopleToSave));
            $scope.editForm.reset();
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
            $scope.detail.last = 0;
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